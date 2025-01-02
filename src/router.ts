import express from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.route';
import verifyUserToken from './middleware/auth.middleware';
import chatRouter from './routes/chat.route';
import conversationRouter from './routes/conversation.route';
import invitationRouter from './routes/invitation.route';
const router = express.Router();

router.use('/user', verifyUserToken, userRouter);
router.use('/auth', authRouter);
router.use('/chat', verifyUserToken, chatRouter);
router.use('/conversation', verifyUserToken, conversationRouter);
router.use('/invitation', verifyUserToken, invitationRouter);

export default router;
