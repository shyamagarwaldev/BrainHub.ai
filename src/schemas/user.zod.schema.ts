import { z } from "zod";

const usernameField = z
  .string("Username must be a string.")
  .trim()
  .min(3, "Username must be at least 3 characters.")
  .max(30, "Username must be at most 30 characters.")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username may only contain letters, numbers, and underscores.",
  );

const passwordField = z
  .string("Password must be a string.")
  .min(8, "Password must be at least 8 characters long.");

/** Registration (create user): username, email, password. */
export const SignUpSchema = z.object({
  username: usernameField,
  email: z.email("Enter a valid email address."),
  password: passwordField,
});

/** Sign-in: email and password. */
export const LogInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z
    .string("Password must be a string.")
    .min(1, "Password is required."),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LogInSchemaType = z.infer<typeof LogInSchema>;
