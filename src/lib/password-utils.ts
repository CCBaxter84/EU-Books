import bcrypt from "bcryptjs";
import { PASSWORD_REGEX } from "./global-constants";

interface IPasswordChecker {
  (password: string, length?: number): boolean
}

export function validatePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generatePassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export const isLongPassword: IPasswordChecker = (password, length = 12) => {
  return password.length >= length;
}

export const isComplexPassword: IPasswordChecker = password => {
  return PASSWORD_REGEX.test(password);
}