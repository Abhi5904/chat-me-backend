import express from 'express';
import { testchat } from '../controller/chat.controller';

const chatRouter = express.Router();

chatRouter.route('/test').get(testchat);

export default chatRouter;
