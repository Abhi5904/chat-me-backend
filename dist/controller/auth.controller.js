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
exports.verifyEmail = exports.sendVerificationMail = exports.loginWithGoogle = exports.logout = exports.loginWithEmail = exports.createUser = void 0;
const appConfig_1 = __importDefault(require("../config/appConfig"));
const sendEmail_1 = __importDefault(require("../email-template/sendEmail"));
const user_services_1 = require("../services/user.services");
const apiError_utils_1 = __importDefault(require("../utils/apiError.utils"));
const apiResponse_utils_1 = __importDefault(require("../utils/apiResponse.utils"));
const password_utils_1 = require("../utils/password.utils");
const sendMail_utils_1 = __importDefault(require("../utils/sendMail.utils"));
const statusCode_utils_1 = __importDefault(require("../utils/statusCode.utils"));
const token_utils_1 = require("../utils/token.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, profilePicture } = req.body;
        const isNotUniqueUser = yield (0, user_services_1.GetUserByEmail)(email);
        console.log(isNotUniqueUser);
        if (isNotUniqueUser) {
            return next(new apiError_utils_1.default('User already exists', statusCode_utils_1.default.CONFLICT));
        }
        const { hashedPassword, salt } = (0, password_utils_1.hashPassword)(password);
        const data = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePicture,
            saltPassword: salt,
        };
        const user = yield (0, user_services_1.CreateUser)(data);
        const { refreshToken, accessToken } = yield (0, token_utils_1.generateToken)({
            firstName,
            email,
            id: user === null || user === void 0 ? void 0 : user._id,
        });
        yield (0, user_services_1.UpdateUser)(user === null || user === void 0 ? void 0 : user._id, {
            userName: `${lastName} ${firstName}`,
            refreshToken: refreshToken,
        });
        res
            .cookie('refreshToken', refreshToken, {
            httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
            secure: false, // Ensures the cookie is sent only over HTTPS
            sameSite: 'Lax', // Mitigates CSRF attacks
            path: '/',
        })
            .set('Authorization', accessToken);
        return res
            .status(statusCode_utils_1.default.CREATED)
            .json(new apiResponse_utils_1.default('User created successfully!!', statusCode_utils_1.default.OK, user.safe));
    }
    catch (error) {
        console.log(error.message);
        return next(new apiError_utils_1.default(error.message || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.createUser = createUser;
const loginWithEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_services_1.GetUserByEmail)(email);
        if (!user) {
            return next(new apiError_utils_1.default('Invalid credentials', statusCode_utils_1.default.UNAUTHORIZED));
        }
        const isValidPassword = (0, password_utils_1.verifyPassword)(password, user === null || user === void 0 ? void 0 : user.saltPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!isValidPassword) {
            return next(new apiError_utils_1.default('Invalid credentials', statusCode_utils_1.default.UNAUTHORIZED));
        }
        const isValidRefreshToken = yield (0, token_utils_1.verifyRefreshToken)(user === null || user === void 0 ? void 0 : user.refreshToken);
        if (!isValidRefreshToken) {
            return next(new apiError_utils_1.default('Invalid token signature', statusCode_utils_1.default.UNAUTHORIZED));
        }
        const { accessToken } = yield (0, token_utils_1.generateToken)({
            email: user === null || user === void 0 ? void 0 : user.email,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            id: user === null || user === void 0 ? void 0 : user._id,
        });
        res.cookie('refreshToken', user === null || user === void 0 ? void 0 : user.refreshToken, {
            httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
            secure: false, // Ensures the cookie is sent only over HTTPS
            sameSite: 'Lax', // Mitigates CSRF attacks
            path: '/',
        });
        res.set('Authorization', accessToken);
        return res
            .status(statusCode_utils_1.default.OK)
            .json(new apiResponse_utils_1.default('Login successfully', statusCode_utils_1.default.OK, user.safe));
    }
    catch (error) {
        return next(new apiError_utils_1.default(error.message || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.loginWithEmail = loginWithEmail;
const loginWithGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req === null || req === void 0 ? void 0 : req.body;
        // Check if token exists
        if (!token) {
            return next(new apiError_utils_1.default('Access token not found', statusCode_utils_1.default.NOT_FOUND));
        }
        // Fetch user data from Google
        const googleUserInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';
        const response = yield fetch(googleUserInfoURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Check for errors in Google response
        if (!(response === null || response === void 0 ? void 0 : response.ok)) {
            return next(new apiError_utils_1.default('Error fetching user data from Google', (response === null || response === void 0 ? void 0 : response.status) || statusCode_utils_1.default.UNAUTHORIZED));
        }
        const data = yield response.json();
        if (!data) {
            return next(new apiError_utils_1.default('Error fetching user data from Google', (response === null || response === void 0 ? void 0 : response.status) || statusCode_utils_1.default.UNAUTHORIZED));
        }
        // Prepare payload
        const payload = {
            firstName: data === null || data === void 0 ? void 0 : data.given_name,
            lastName: data === null || data === void 0 ? void 0 : data.family_name,
            email: data === null || data === void 0 ? void 0 : data.email,
            profilePicture: data === null || data === void 0 ? void 0 : data.picture,
        };
        // Check if user already exists
        let user = yield (0, user_services_1.GetUserByEmail)(payload === null || payload === void 0 ? void 0 : payload.email);
        // If user doesn't exist, create a new user
        if (!user) {
            user = yield (0, user_services_1.CreateUser)(payload);
        }
        // Generate tokens
        const { refreshToken, accessToken } = yield (0, token_utils_1.generateToken)({
            firstName: payload === null || payload === void 0 ? void 0 : payload.firstName,
            email: payload === null || payload === void 0 ? void 0 : payload.email,
            id: user === null || user === void 0 ? void 0 : user._id,
        });
        // Update or set refreshToken for the user
        if (!user) {
            yield (0, user_services_1.UpdateUser)(user === null || user === void 0 ? void 0 : user._id, { refreshToken });
        }
        // Set cookies for refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Lax',
            path: '/',
        });
        // Set Authorization header for access token
        res.set('Authorization', accessToken);
        // Send response
        const statusMessage = (user === null || user === void 0 ? void 0 : user.isNew)
            ? 'User created successfully!'
            : 'Login successful';
        return res
            .status((user === null || user === void 0 ? void 0 : user.isNew) ? statusCode_utils_1.default.CREATED : statusCode_utils_1.default.OK)
            .json(new apiResponse_utils_1.default(statusMessage, statusCode_utils_1.default.OK, user.safe));
    }
    catch (error) {
        return next(new apiError_utils_1.default(error.message || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.loginWithGoogle = loginWithGoogle;
const sendVerificationMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!email) {
            return next(new apiError_utils_1.default('Email not found please try again', statusCode_utils_1.default.NOT_FOUND));
        }
        const token = jsonwebtoken_1.default.sign({ email }, appConfig_1.default.SECRET_KEY, {
            expiresIn: '1h',
        });
        const verificationLink = `${appConfig_1.default.BACKEND_URL}/api/auth/verify-email?token=${token}`;
        const emailRes = yield (0, sendMail_utils_1.default)({
            html: (0, sendEmail_1.default)(verificationLink),
            subject: 'Verify Email',
            to: email,
        });
        if (!(emailRes === null || emailRes === void 0 ? void 0 : emailRes.success)) {
            return next(new apiError_utils_1.default(((_b = emailRes === null || emailRes === void 0 ? void 0 : emailRes.error) === null || _b === void 0 ? void 0 : _b.message) || 'Error to send email', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
        }
        return res
            .status(statusCode_utils_1.default.OK)
            .json(new apiResponse_utils_1.default('Email send successfully', statusCode_utils_1.default.OK));
    }
    catch (error) {
        return next(new apiError_utils_1.default(error.message || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.sendVerificationMail = sendVerificationMail;
const verifyEmail = (req, res) => {
    var _a;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.token;
        const cookieOptions = {
            httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
            secure: false, // Ensures the cookie is sent only over HTTPS
            sameSite: 'Lax', // Mitigates CSRF attacks
            path: '/',
        };
        if (!token) {
            res.cookie('Email Verification Error', 'Unauthorized user!! try again', cookieOptions);
            return res.redirect(`${appConfig_1.default.FRONTEND_URL}/chat`);
        }
        const decoded = jsonwebtoken_1.default.verify(token, appConfig_1.default.SECRET_KEY);
        const email = decoded === null || decoded === void 0 ? void 0 : decoded.email;
        if (!email) {
            res.cookie('Email Verification Error', 'Unauthorized user!! try again', cookieOptions);
            return res.redirect(`${appConfig_1.default.FRONTEND_URL}/chat`);
        }
        return res.redirect(`${appConfig_1.default.FRONTEND_URL}/chat`);
    }
    catch (error) {
        res.cookie('Email Verification Error', (error === null || error === void 0 ? void 0 : error.message) || 'Unauthorized user!! try again', {
            httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
            secure: false, // Ensures the cookie is sent only over HTTPS
            sameSite: 'Lax', // Mitigates CSRF attacks
            path: '/',
        });
        return res.redirect(`${appConfig_1.default.FRONTEND_URL}/chat`);
    }
};
exports.verifyEmail = verifyEmail;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.user) {
            return next(new apiError_utils_1.default('Unauthorized', statusCode_utils_1.default.UNAUTHORIZED));
        }
        const user = yield (0, user_services_1.GetUserById)((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            return next(new apiError_utils_1.default('Unauthorized', statusCode_utils_1.default.UNAUTHORIZED));
        }
        return res
            .status(statusCode_utils_1.default.OK)
            .json(new apiResponse_utils_1.default('Logout successfully', statusCode_utils_1.default.OK));
    }
    catch (error) {
        return next(new apiError_utils_1.default(error.message || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map