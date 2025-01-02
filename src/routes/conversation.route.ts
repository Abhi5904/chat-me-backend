import express from 'express';
import {
  getConversationByUser,
  getConversationByUserId,
} from '../controller/conversation.controller';
const conversationRouter = express.Router();

conversationRouter.route('/user/:id').get(getConversationByUserId);
conversationRouter.route('/user').get(getConversationByUser);

export default conversationRouter;
