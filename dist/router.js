"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const conversation_route_1 = __importDefault(require("./routes/conversation.route"));
const invitation_route_1 = __importDefault(require("./routes/invitation.route"));
const router = express_1.default.Router();
router.use('/user', auth_middleware_1.default, user_routes_1.default);
router.use('/auth', auth_route_1.default);
router.use('/chat', auth_middleware_1.default, chat_route_1.default);
router.use('/conversation', auth_middleware_1.default, conversation_route_1.default);
router.use('/invitation', auth_middleware_1.default, invitation_route_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map