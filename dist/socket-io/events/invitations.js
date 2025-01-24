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
exports.emitMarkedInvitation = exports.emitUnreadInvitation = void 0;
const invitations_service_1 = require("../../services/invitations.service");
const socket_1 = require("../socket");
const eventName_1 = __importDefault(require("./eventName"));
const emitUnreadInvitation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const io = (0, socket_1.getSocket)();
    if (!io) {
        console.log('Socket.IO is not initialized');
    }
    const unreadCount = yield (0, invitations_service_1.GetUnreadCount)({ receiverId: id });
    io.emit(`${eventName_1.default.UNREAD_INVITATION}-${id}`, {
        unreadCount,
    });
});
exports.emitUnreadInvitation = emitUnreadInvitation;
const emitMarkedInvitation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const io = (0, socket_1.getSocket)();
    if (!io) {
        console.log('Socket.IO is not initialized');
    }
    const unreadCount = yield (0, invitations_service_1.GetReadCount)({ senderId: id });
    console.log(unreadCount, 'unreadCount');
    console.log('event', `${eventName_1.default.READ_INVITATION}-${id}`);
    io.emit(`${eventName_1.default.READ_INVITATION}-${id}`, {
        unreadCount,
    });
});
exports.emitMarkedInvitation = emitMarkedInvitation;
//# sourceMappingURL=invitations.js.map