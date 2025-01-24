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
exports.getUnreadInvitationCount = exports.getAllInvitations = exports.sendInvitations = void 0;
const invitations_service_1 = require("../services/invitations.service");
const invitations_1 = require("../socket-io/events/invitations");
const apiError_util_1 = __importDefault(require("../utils/apiError.util"));
const apiResponse_util_1 = __importDefault(require("../utils/apiResponse.util"));
const statusCode_util_1 = __importDefault(require("../utils/statusCode.util"));
const sendInvitations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { body: payload } = req;
        const invitations = (_a = payload === null || payload === void 0 ? void 0 : payload.invitations) === null || _a === void 0 ? void 0 : _a.map((data) => ({
            senderId: payload === null || payload === void 0 ? void 0 : payload.senderId,
            receiverId: data === null || data === void 0 ? void 0 : data.receiverId,
            message: data === null || data === void 0 ? void 0 : data.message,
        }));
        const newInvitations = [];
        const duplicateInvitations = [];
        for (const invitation of invitations) {
            const existingInvitation = yield (0, invitations_service_1.GetExistingInvitations)(invitation === null || invitation === void 0 ? void 0 : invitation.senderId, invitation === null || invitation === void 0 ? void 0 : invitation.receiverId);
            if (existingInvitation) {
                duplicateInvitations.push(invitation);
            }
            else {
                newInvitations.push(invitation);
            }
        }
        let savedInvitations = [];
        if (newInvitations.length > 0) {
            savedInvitations = yield (0, invitations_service_1.InsertManyInvitation)(newInvitations);
            for (const invitation of savedInvitations) {
                yield (0, invitations_1.emitUnreadInvitation)(invitation === null || invitation === void 0 ? void 0 : invitation.receiverId);
            }
        }
        const totalCount = invitations.length;
        const uniqueCount = newInvitations.length;
        const duplicateCount = duplicateInvitations.length;
        let message;
        if (uniqueCount === totalCount) {
            message = 'All invitations sent successfully.';
        }
        else if (duplicateCount === totalCount) {
            message =
                'All invitations are duplicates and were skipped. You already sended invitation.';
        }
        else {
            message = `Invitations sent successfully. ${uniqueCount} unique invitation(s) were sent, and ${duplicateCount} duplicate invitation(s) were skipped.`;
        }
        return res
            .status(statusCode_util_1.default.CREATED)
            .json(new apiResponse_util_1.default(message, statusCode_util_1.default.CREATED, savedInvitations));
    }
    catch (error) {
        console.error(error);
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.sendInvitations = sendInvitations;
const getAllInvitations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { type } = req === null || req === void 0 ? void 0 : req.query;
        let allInvitations;
        allInvitations = yield (0, invitations_service_1.GetAllInvitations)(id, type);
        if (!allInvitations || (allInvitations === null || allInvitations === void 0 ? void 0 : allInvitations.length) === 0) {
            return next(new apiError_util_1.default('No invitations found', statusCode_util_1.default.NOT_FOUND));
        }
        if (type === 'receive') {
            const isUpdated = yield (0, invitations_service_1.UpdateInvitationsReadStatus)(id);
            if ((isUpdated === null || isUpdated === void 0 ? void 0 : isUpdated.modifiedCount) > 0) {
                allInvitations = yield (0, invitations_service_1.GetAllInvitations)(id, type);
                yield (0, invitations_1.emitMarkedInvitation)(id);
            }
        }
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('All Invitations fetched successfully', statusCode_util_1.default.OK, allInvitations));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getAllInvitations = getAllInvitations;
const getUnreadInvitationCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const unReadCount = yield (0, invitations_service_1.GetUnreadCount)({ receiverId: id });
        return res
            .status(statusCode_util_1.default.OK)
            .json(new apiResponse_util_1.default('Unread invitation fetched successfully', statusCode_util_1.default.OK, { unReadCount }));
    }
    catch (error) {
        return next(new apiError_util_1.default((error === null || error === void 0 ? void 0 : error.message) || 'Internal server error', statusCode_util_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.getUnreadInvitationCount = getUnreadInvitationCount;
//# sourceMappingURL=invitation.controller.js.map