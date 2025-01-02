"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const crypto_1 = require("crypto");
const hashPassword = (password) => {
    const salt = (0, crypto_1.randomBytes)(16).toString('hex'); // Generate a random salt
    const hashedPassword = (0, crypto_1.pbkdf2Sync)(password, salt, 100000, 64, 'sha512').toString('hex');
    return { salt, hashedPassword };
};
exports.hashPassword = hashPassword;
const verifyPassword = (inputPassword, storedSalt, storedHashedPassword) => {
    const hashedInputPassword = (0, crypto_1.pbkdf2Sync)(inputPassword, storedSalt, 100000, 64, 'sha512').toString('hex');
    return hashedInputPassword === storedHashedPassword;
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=password.utils.js.map