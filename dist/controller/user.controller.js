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
exports.getInvitableUsers = exports.getAllEmailVerfiedUser = exports.getUserByToken = exports.updateUser = exports.deleteUser = exports.getUserById = exports.getAllUser = void 0;
const invitations_service_1 = require("../services/invitations.service");
const user_service_1 = require("../services/user.service");
const apiError_util_1 = __importDefault(require("../utils/apiError.util"));
const apiResponse_util_1 = __importDefault(require("../utils/apiResponse.util"));
const statusCode_util_1 = __importDefault(require("../utils/statusCode.util"));
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield (0, user_service_1.GetAllUser)();
        const allSafeUser = (allUser === null || allUser === void 0 ? void 0 : allUser.length) > 0 ? allUser === null || allUser === void 0 ? void 0 : allUser.map((user) => user.safe) : [];
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('User fetched successfully', statusCode_util_1.default.OK, allSafeUser));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getAllUser = getAllUser;
const getAllEmailVerfiedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const allUser = yield (0, user_service_1.GetUserWithFilter)({
            isEmailVerified: true,
            _id: { $ne: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id },
        });
        const allSafeUser = (allUser === null || allUser === void 0 ? void 0 : allUser.length) > 0 ? allUser === null || allUser === void 0 ? void 0 : allUser.map((user) => user.safe) : [];
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('Email verfied users fetched successfully', statusCode_util_1.default.OK, allSafeUser));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getAllEmailVerfiedUser = getAllEmailVerfiedUser;
const getInvitableUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: currentUserId } = req.user;
        const invitedReceiverIds = yield (0, invitations_service_1.GetReceiverIdCurrentUserId)(currentUserId);
        console.log(invitedReceiverIds, 'invitedReceiverIds');
        const allUser = yield (0, user_service_1.GetUserWithFilter)({
            _id: { $nin: invitedReceiverIds },
            isEmailVerified: true,
        });
        if (!allUser || (allUser === null || allUser === void 0 ? void 0 : allUser.length) === 0) {
            return next(new apiError_util_1.default('Users not found', statusCode_util_1.default.NOT_FOUND));
        }
        const allSafeUser = (allUser === null || allUser === void 0 ? void 0 : allUser.length) > 0 ? allUser === null || allUser === void 0 ? void 0 : allUser.map((user) => user.safe) : [];
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('Invitable users fetched successfully', statusCode_util_1.default.OK, allSafeUser));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getInvitableUsers = getInvitableUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new apiError_util_1.default('Not found', statusCode_util_1.default.NOT_FOUND));
        }
        const user = yield (0, user_service_1.GetUserById)(id);
        if (!user) {
            return next(new apiError_util_1.default('User not found', statusCode_util_1.default.NOT_FOUND));
        }
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('User fetched successfully', statusCode_util_1.default.OK, user.safe));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getUserById = getUserById;
const getUserByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (!user) {
            return next(new apiError_util_1.default('User not found', statusCode_util_1.default.NOT_FOUND));
        }
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('User fetched successfully!!', statusCode_util_1.default.OK, user.safe));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getUserByToken = getUserByToken;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new apiError_util_1.default('Not found', statusCode_util_1.default.NOT_FOUND));
        }
        const user = yield (0, user_service_1.GetUserById)(id);
        if (!user) {
            return next(new apiError_util_1.default('User not found', statusCode_util_1.default.NOT_FOUND));
        }
        yield (0, user_service_1.DeleteUser)(id);
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('User deleted successfully', statusCode_util_1.default.OK));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new apiError_util_1.default('Not found', statusCode_util_1.default.NOT_FOUND));
        }
        const user = yield (0, user_service_1.GetUserById)(id);
        if (!user) {
            return next(new apiError_util_1.default('User not found', statusCode_util_1.default.NOT_FOUND));
        }
        const updatedUser = yield (0, user_service_1.UpdateUser)(id, req === null || req === void 0 ? void 0 : req.body);
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('User updated successfully', statusCode_util_1.default.OK, updatedUser.safe));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map