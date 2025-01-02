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
exports.getConversationByUser = exports.getConversationByUserId = void 0;
const conversation_services_1 = require("../services/conversation.services");
const apiError_utils_1 = __importDefault(require("../utils/apiError.utils"));
const apiResponse_utils_1 = __importDefault(require("../utils/apiResponse.utils"));
const statusCode_utils_1 = __importDefault(require("../utils/statusCode.utils"));
const getConversationByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const id = ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id) || ((_c = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id) === null || _c === void 0 ? void 0 : _c.toString());
        console.log(id, 'backend id');
        const conversations = yield (0, conversation_services_1.GetConversationByUser)(id);
        console.log(conversations, 'conversations');
        return res
            .status(statusCode_utils_1.default.OK)
            .json(new apiResponse_utils_1.default('All conversation fetched successfully!!', statusCode_utils_1.default.OK));
    }
    catch (error) {
        return next(new apiError_utils_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getConversationByUserId = getConversationByUserId;
const getConversationByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
        const conversations = yield (0, conversation_services_1.GetConversationByUser)(id);
        console.log(conversations, 'conversations');
        return res
            .status(statusCode_utils_1.default.OK)
            .json(new apiResponse_utils_1.default('All conversation fetched successfully!!', statusCode_utils_1.default.OK));
    }
    catch (error) {
        return next(new apiError_utils_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getConversationByUser = getConversationByUser;
//# sourceMappingURL=conversation.controller.js.map