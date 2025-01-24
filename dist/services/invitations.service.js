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
exports.GetReceiverIdCurrentUserId = exports.GetExistingInvitations = exports.GetReadCount = exports.GetUnreadCount = exports.UpdateInvitationsReadStatus = exports.GetAllInvitations = exports.InsertManyInvitation = void 0;
const invitation_model_1 = __importDefault(require("../models/invitation.model"));
const InsertManyInvitation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invitation_model_1.default.insertMany(data);
});
exports.InsertManyInvitation = InsertManyInvitation;
const GetAllInvitations = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = type === 'send' ? { senderId: id } : { receiverId: id };
    const populateField = type === 'send' ? 'receiverId' : 'senderId';
    // const selectField = type === 'send' ? '-senderId' : '-receiverId';
    const populate = {
        path: populateField,
        select: 'firstName lastName profilePicture userName',
    };
    return yield invitation_model_1.default.find(filter).populate(populate);
});
exports.GetAllInvitations = GetAllInvitations;
const UpdateInvitationsReadStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invitation_model_1.default.updateMany({ receiverId: id }, { $set: { isReaded: true } }, { new: true });
});
exports.UpdateInvitationsReadStatus = UpdateInvitationsReadStatus;
const GetUnreadCount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invitation_model_1.default.countDocuments(Object.assign(Object.assign({}, data), { isReaded: false }));
});
exports.GetUnreadCount = GetUnreadCount;
const GetReadCount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invitation_model_1.default.countDocuments(Object.assign(Object.assign({}, data), { isReaded: true }));
});
exports.GetReadCount = GetReadCount;
const GetExistingInvitations = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invitation_model_1.default.findOne({
        senderId: senderId,
        receiverId: receiverId,
        status: 'pending',
    });
});
exports.GetExistingInvitations = GetExistingInvitations;
const GetReceiverIdCurrentUserId = (currentUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const senderIds = yield invitation_model_1.default.find({
        $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
    }).distinct('senderId');
    // Get distinct receiverIds
    const receiverIds = yield invitation_model_1.default.find({
        $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
    }).distinct('receiverId');
    return [...new Set([...senderIds, ...receiverIds])];
});
exports.GetReceiverIdCurrentUserId = GetReceiverIdCurrentUserId;
//# sourceMappingURL=invitations.service.js.map