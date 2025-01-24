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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.validateSendInvitation = void 0;
const Yup = __importStar(require("yup"));
const apiError_util_1 = __importDefault(require("../utils/apiError.util"));
const statusCode_util_1 = __importDefault(require("../utils/statusCode.util"));
const validateSendInvitation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sendInvitationValidationSchema = Yup.object().shape({
        senderId: Yup.string().required('Sender ID is required'),
        invitations: Yup.array()
            .of(Yup.object().shape({
            receiverId: Yup.string().required('Receiver ID is required'),
            message: Yup.string().required('Message is required'),
        }))
            .min(1, 'At least one invitation must be provided'),
    });
    try {
        yield sendInvitationValidationSchema.validate(req.body, {
            abortEarly: false,
        });
        next();
    }
    catch (error) {
        console.error('ValidationError:', error);
        console.log();
        return next(new apiError_util_1.default('ValidationError', statusCode_util_1.default.BAD_REQUEST, error.errors));
    }
});
exports.validateSendInvitation = validateSendInvitation;
//# sourceMappingURL=invitation.validate.js.map