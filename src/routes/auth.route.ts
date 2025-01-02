import express from 'express';
import {
  createUser,
  loginWithEmail,
  loginWithGoogle,
  logout,
  sendVerificationMail,
  verifyEmail,
} from '../controller/auth.controller';
import {
  validateCreateUser,
  validateLoginWithEmailUser,
} from '../validate/user.validate';
import verifyUserToken from '../middleware/auth.middleware';

const authRouter = express.Router();
authRouter.get('/logout', verifyUserToken, logout);
authRouter.post('/signup', validateCreateUser, createUser);
authRouter.get('/verify-email', verifyEmail);
authRouter.get(
  '/send-verification-email',
  verifyUserToken,
  sendVerificationMail,
);
authRouter.post('/login/email', validateLoginWithEmailUser, loginWithEmail);
authRouter.post('/login/google', loginWithGoogle);

export default authRouter;
