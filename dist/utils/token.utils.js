"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const appConfig_1 = __importDefault(require("../config/appConfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign(data, { key: appConfig_1.default.JWT_PRIVATE_KEY, passphrase: appConfig_1.default.SECRET_KEY }, { algorithm: 'RS256', expiresIn: appConfig_1.default.ACCESS_TOKEN_TIME });
    const refreshToken = jsonwebtoken_1.default.sign(data, { key: appConfig_1.default.JWT_PRIVATE_KEY, passphrase: appConfig_1.default.SECRET_KEY }, { algorithm: 'RS256', expiresIn: appConfig_1.default.REFRESH_TOKEN_TIME });
    return { accessToken, refreshToken };
});
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield jsonwebtoken_1.default.verify(token, appConfig_1.default.JWT_PUBLIC_KEY, {
            algorithms: ['RS256'],
        });
        return user;
    }
    catch (error) {
        console.log(error, 'error');
        return false;
    }
});
exports.verifyToken = verifyToken;
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield jsonwebtoken_1.default.verify(refreshToken, appConfig_1.default.JWT_PUBLIC_KEY, {
            algorithms: ['RS256'],
        });
        return user;
    }
    catch (error) {
        console.log(error, 'error');
        return false;
        // if (error.name === 'JsonWebTokenError') {
        //   return new ApiError('Invalid token signature', statusCode.UNAUTHORIZED);
        // } else if (error.name === 'TokenExpiredError') {
        //   return new ApiError('Token expired', statusCode.UNAUTHORIZED);
        // } else {
        //   return new ApiError(
        //     error.message || 'Token verification failed',
        //     statusCode.UNAUTHORIZED,
        //   );
        // }
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=token.utils.js.map