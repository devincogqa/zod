import * as z from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0),
});

export type User = z.infer<typeof UserSchema>;

export function validateUser(data: unknown): User | null {
  const result = UserSchema.safeParse(data);
  if (result.success) return result.data;
  return null;
}

export function isAdult(user: User): boolean {
  return user.age > 18;
}
