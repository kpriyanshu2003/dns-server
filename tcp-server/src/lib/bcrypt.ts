import { hashSync, compareSync } from "bcrypt";

const saltRounds = 10;

export function hashPassword(password: string) {
  return hashSync(password, saltRounds);
}

export function comparePassword(password: string, hash: string) {
  return compareSync(password, hash);
}
