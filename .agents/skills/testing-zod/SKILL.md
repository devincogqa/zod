# Testing zod

Use this skill when validating PRs in the `devincogqa/zod` repository.

## Devin Secrets Needed

- None for local lint/test/build validation.
- GitHub PR metadata is available through Devin git tooling in normal sessions.

## Environment

- Use Node.js v24+ and pnpm 10.12.1.
- From a shell, run:
  ```sh
  source /home/ubuntu/.nvm/nvm.sh
  nvm use 24
  ```
- Dependencies and Husky hooks should be prepared by the repo environment config with:
  ```sh
  pnpm install
  pnpm exec husky
  ```

## Standard Validation Commands

Run these from the repo checkout when validating library changes:

```sh
pnpm lint:check
pnpm test
pnpm build
```

Expected evidence to capture:

- `pnpm lint:check` exits 0 and reports Biome checked all files with no fixes applied.
- `pnpm test` exits 0 and the Vitest summary reports passed test files/tests.
- `pnpm build` exits 0 and `zshy --project tsconfig.build.json` completes.
- After `pnpm build`, check `git status --short --branch`; the working tree should remain clean unless the task intentionally changes generated outputs.

## Targeted Runtime Probes

When a PR changes a small exported helper or regex and no dedicated test exists, add a shell-only runtime probe before the full suite. Use `tsx` source conditions instead of creating temporary JS files:

```sh
pnpm exec tsx --conditions @zod/source -e 'import { helper } from "./packages/zod/src/path/to/file.ts"; console.log(helper(input));'
```

For adversarial probes, include at least one value that would have failed under the old behavior and one value that should still pass. Record exact expected output in the test plan and report.

## PR Review Flow Testing

For dummy review-flow PRs, the validation goal may differ from a normal feature PR:

- Confirm repo checks still pass locally.
- Inspect the PR with Devin git tooling.
- Confirm Devin Review completed and posted comments for the intentionally seeded defects.
- Treat expected review comments as test evidence, not as blockers to fix, when the user explicitly requested intentional bugs for review-flow testing.
- If a later commit fixes one seeded issue, update the test plan to prove the fixed runtime behavior and confirm the corresponding review comment is resolved or obsolete.

## Reporting

- Do not record the desktop for shell-only library validation.
- Attach a markdown test report summarizing commands, exit status, exact probe output, and PR-review findings.
- Post one PR comment with concise runtime test results and command evidence.
