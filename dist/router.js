"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const conversation_routes_1 = __importDefault(require("./routes/conversation.routes"));
const router = express_1.default.Router();
router.use('/user', auth_middleware_1.default, user_routes_1.default);
router.use('/auth', auth_routes_1.default);
router.use('/chat', auth_middleware_1.default, chat_routes_1.default);
router.use('/conversation', auth_middleware_1.default, conversation_routes_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map