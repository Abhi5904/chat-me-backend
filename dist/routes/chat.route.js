"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controller/chat.controller");
const chatRouter = express_1.default.Router();
chatRouter.route('/test').get(chat_controller_1.testchat);
exports.default = chatRouter;
//# sourceMappingURL=chat.route.js.map