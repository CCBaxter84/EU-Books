import bcrypt from "bcryptjs";

export function validatePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generatePassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}