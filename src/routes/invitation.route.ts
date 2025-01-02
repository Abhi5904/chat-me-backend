import express from 'express';
import {
  getAllInvitations,
  getUnreadInvitationCount,
  sendInvitations,
} from '../controller/invitation.controller';
import { validateSendInvitation } from '../validate/invitation.validate';
const invitationRouter = express.Router();

invitationRouter.route('/').post(validateSendInvitation, sendInvitations);
invitationRouter.route('/').get(getAllInvitations);
invitationRouter.route('/unread').get(getUnreadInvitationCount);

export default invitationRouter;
