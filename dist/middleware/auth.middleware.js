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
const user_services_1 = require("../services/user.services");
const apiError_utils_1 = __importDefault(require("../utils/apiError.utils"));
const statusCode_utils_1 = __importDefault(require("../utils/statusCode.utils"));
const verifyUserToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((req === null || req === void 0 ? void 0 : req.headers['authorization']) &&
            ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1])) ||
            ((req === null || req === void 0 ? void 0 : req.cookies) && ((_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.token));
        if (!token) {
            return next(new apiError_utils_1.default('token not found', statusCode_utils_1.default.UNAUTHORIZED));
        }
        const user = yield (0, user_services_1.GetUserByAuthtoken)(token);
        if (!user) {
            return next(new apiError_utils_1.default('Invalid token', statusCode_utils_1.default.UNAUTHORIZED));
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return next(new apiError_utils_1.default(error, statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = verifyUserToken;
//# sourceMappingURL=auth.middleware.js.map