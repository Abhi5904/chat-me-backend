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
exports.testchat = void 0;
const socket_1 = require("../socket-io/socket");
const apiError_utils_1 = __importDefault(require("../utils/apiError.utils"));
const apiResponse_utils_1 = __importDefault(require("../utils/apiResponse.utils"));
const statusCode_utils_1 = __importDefault(require("../utils/statusCode.utils"));
const testchat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user, 'user');
        const io = (0, socket_1.getSocket)();
        io.emit('user-detail', req.user);
        return res
            .status(statusCode_utils_1.default.OK)
            .json(new apiResponse_utils_1.default('event emitted successfully', 200));
    }
    catch (error) {
        return next(new apiError_utils_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_utils_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.testchat = testchat;
//# sourceMappingURL=chat.controller.js.map