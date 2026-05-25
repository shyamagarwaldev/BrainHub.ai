import bcrypt from "bcrypt";

export function hashPasswords(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hasedPassword: string) {
  return bcrypt.compare(password, hasedPassword);
}
