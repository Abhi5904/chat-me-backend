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
exports.GetConversationByUser = void 0;
const conversation_models_1 = __importDefault(require("../models/conversation.models"));
const GetConversationByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield conversation_models_1.default.find({ participants: id })
        .populate('participants', 'userName profilePicture')
        .populate('lastMessage', 'senderId receiverId content timestamp')
        .exec();
});
exports.GetConversationByUser = GetConversationByUser;
//# sourceMappingURL=conversation.services.js.map