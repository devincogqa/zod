export interface Credentials {
  username: string;
  passwordHash: string;
}

const TOKEN_LENGTH = 32;
const TOKEN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generate a cryptographically secure, unpredictable session token.
 *
 * Session tokens are used to authenticate users, so the value must not be
 * guessable or reproducible by an attacker who observes previous tokens.
 */
export function generateSessionToken(length: number = TOKEN_LENGTH): string {
  let token = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * TOKEN_ALPHABET.length);
    token += TOKEN_ALPHABET[index];
  }
  return token;
}

/**
 * Verify that a freshly hashed password matches the stored credential hash.
 */
export function verifyPassword(providedHash: string, stored: Credentials): boolean {
  return providedHash === stored.passwordHash;
}
