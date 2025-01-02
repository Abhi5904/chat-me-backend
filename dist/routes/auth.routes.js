"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const user_validate_1 = require("../validate/user.validate");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const authRouter = express_1.default.Router();
authRouter.get('/logout', auth_middleware_1.default, auth_controller_1.logout);
authRouter.post('/signup', user_validate_1.validateCreateUser, auth_controller_1.createUser);
authRouter.get('/verify-email', auth_controller_1.verifyEmail);
authRouter.get('/send-verification-email', auth_middleware_1.default, auth_controller_1.sendVerificationMail);
authRouter.post('/login/email', user_validate_1.validateLoginWithEmailUser, auth_controller_1.loginWithEmail);
authRouter.post('/login/google', auth_controller_1.loginWithGoogle);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map