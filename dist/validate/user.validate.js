"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.validateUpdateUser = exports.validateLoginWithEmailUser = exports.validateCreateUser = void 0;
const Yup = __importStar(require("yup"));
const apiError_utils_1 = __importDefault(require("../utils/apiError.utils"));
const statusCode_utils_1 = __importDefault(require("../utils/statusCode.utils"));
const validateCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().optional(),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email address is required'),
        password: Yup.string()
            // .matches(
            //   /^(?=.*[A-Z])/, // At least one uppercase letter
            //   'Password must contain at least one uppercase letter',
            // )
            // .matches(
            //   /^(?=.*[a-z])/, // At least one lowercase letter
            //   'Password must contain at least one lowercase letter',
            // )
            // .matches(
            //   /^(?=.*\d)/, // At least one number
            //   'Password must contain at least one number',
            // )
            // .matches(
            //   /^(?=.*[!@#$%^&*(),.?":{}|<>])/, // At least one special character
            //   'Password must contain at least one special character',
            // )
            .min(8, 'Password must be at least 8 characters long')
            .max(20, 'Password must be at most 20 characters long')
            .required('Password is required'),
    });
    try {
        yield userValidationSchema.validate(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        console.log(error, 'ValidationError');
        return next(new apiError_utils_1.default('ValidationError', statusCode_utils_1.default.BAD_REQUEST, error.errors));
    }
});
exports.validateCreateUser = validateCreateUser;
const validateLoginWithEmailUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginWithEmailValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email address is requried'),
        password: Yup.string().required('Password is required'),
    });
    try {
        yield loginWithEmailValidationSchema.validate(req.body, {
            abortEarly: false,
        });
        next();
    }
    catch (error) {
        console.log(error, 'ValidationError');
        return next(new apiError_utils_1.default('ValidationError', statusCode_utils_1.default.BAD_REQUEST, error.errors));
    }
});
exports.validateLoginWithEmailUser = validateLoginWithEmailUser;
const validateUpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserValidationSchema = Yup.object().shape({
        firstName: Yup.string().optional(),
        lastName: Yup.string().optional(),
        bio: Yup.string().optional(),
        profilePicture: Yup.string().optional(),
    });
    try {
        yield updateUserValidationSchema.validate(req.body, {
            abortEarly: false,
        });
        next();
    }
    catch (error) {
        console.log(error, 'ValidationError');
        return next(new apiError_utils_1.default('ValidationError', statusCode_utils_1.default.BAD_REQUEST, error.errors));
    }
});
exports.validateUpdateUser = validateUpdateUser;
//# sourceMappingURL=user.validate.js.map