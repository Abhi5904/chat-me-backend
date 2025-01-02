import { randomBytes, pbkdf2Sync } from 'crypto';

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex'); // Generate a random salt
  const hashedPassword = pbkdf2Sync(
    password,
    salt,
    100000,
    64,
    'sha512',
  ).toString('hex');
  return { salt, hashedPassword };
};

const verifyPassword = (
  inputPassword: string,
  storedSalt: string,
  storedHashedPassword: string,
) => {
  const hashedInputPassword = pbkdf2Sync(
    inputPassword,
    storedSalt,
    100000,
    64,
    'sha512',
  ).toString('hex');
  return hashedInputPassword === storedHashedPassword;
};

export { hashPassword, verifyPassword };
