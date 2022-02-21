export class UsernameAlreadyExists extends Error {
  constructor(username: string) {
    super(`username "${username}" already exists`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
