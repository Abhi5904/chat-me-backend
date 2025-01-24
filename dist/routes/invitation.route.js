"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invitation_controller_1 = require("../controller/invitation.controller");
const invitation_validate_1 = require("../validate/invitation.validate");
const invitationRouter = express_1.default.Router();
invitationRouter.route('/').post(invitation_validate_1.validateSendInvitation, invitation_controller_1.sendInvitations);
invitationRouter.route('/').get(invitation_controller_1.getAllInvitations);
invitationRouter.route('/unread').get(invitation_controller_1.getUnreadInvitationCount);
exports.default = invitationRouter;
//# sourceMappingURL=invitation.route.js.map