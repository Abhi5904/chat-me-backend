"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_controller_1 = require("../controller/conversation.controller");
const conversationRouter = express_1.default.Router();
conversationRouter.route('/user/:id').get(conversation_controller_1.getConversationByUserId);
conversationRouter.route('/user').get(conversation_controller_1.getConversationByUser);
exports.default = conversationRouter;
//# sourceMappingURL=conversation.routes.js.map