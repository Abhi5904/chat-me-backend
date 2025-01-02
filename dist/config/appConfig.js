"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// import fs from 'fs';
// import path from 'path';
dotenv_1.default.config();
// const folderPath = path.resolve(__dirname, '../jwt_keys');
const appConfig = {
    PORT: process.env.PORT || 5050,
    MONGODB_URI: process.env.MONGODB_URI || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    // JWT_PUBLIC_KEY:
    //   fs.readFileSync(`${folderPath}/jwtRS256.key.pub`, 'utf8') || '',
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || '',
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || '',
    // JWT_PRIVATE_KEY: fs.readFileSync(`${folderPath}/jwtRS256.key`, 'utf8') || '',
    ACCESS_TOKEN_TIME: '15d',
    REFRESH_TOKEN_TIME: '365d',
    EMAIL_USER: process.env.EMAIL_USER || '',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
    BACKEND_URL: process.env.BACKEND_URL || '',
    FRONTEND_URL: process.env.FRONTEND_URL || '',
};
exports.default = appConfig;
//# sourceMappingURL=appConfig.js.map