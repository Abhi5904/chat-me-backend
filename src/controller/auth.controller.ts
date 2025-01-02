import appConfig from '../config/appConfig';
import SendEmailIemplate from '../email-template/sendEmail';
import {
  CreateUser,
  GetUserByEmail,
  GetUserById,
  UpdateUser,
} from '../services/user.service';
import ApiError from '../utils/apiError.util';
import ApiResponse from '../utils/apiResponse.util';
import { generateUniqueId } from '../utils/generateId.util';
import { hashPassword, verifyPassword } from '../utils/password.util';
import sendEmail from '../utils/sendMail.util';
import statusCode from '../utils/statusCode.util';
import { generateToken, verifyRefreshToken } from '../utils/token.util';
import jwt from 'jsonwebtoken';

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, profilePicture } = req.body;

    const isNotUniqueUser = await GetUserByEmail(email);
    console.log(isNotUniqueUser);

    if (isNotUniqueUser) {
      return next(new ApiError('User already exists', statusCode.CONFLICT));
    }

    const { hashedPassword, salt } = hashPassword(password);

    const data = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture,
      saltPassword: salt,
    };
    const user = await CreateUser(data);

    const { refreshToken, accessToken } = await generateToken({
      firstName,
      email,
      id: user?._id as string,
    });
    const uniqueId = generateUniqueId(3);
    await UpdateUser(user?._id as string, {
      userName: `${firstName}${lastName}${uniqueId}`,
      refreshToken: refreshToken,
    });
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
        secure: false, // Ensures the cookie is sent only over HTTPS
        sameSite: 'Lax', // Mitigates CSRF attacks
        path: '/',
      })
      .set('Authorization', accessToken);
    return res
      .status(statusCode.CREATED)
      .json(
        new ApiResponse(
          'User created successfully!!',
          statusCode.OK,
          user.safe,
        ),
      );
  } catch (error) {
    console.log(error.message);
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await GetUserByEmail(email);
    if (!user) {
      return next(new ApiError('Invalid credentials', statusCode.UNAUTHORIZED));
    }
    if (!user?.password || !user?.saltPassword) {
      return next(
        new ApiError(
          'This account is linked to Google. Please log in using Google instead.',
          statusCode.BAD_REQUEST,
        ),
      );
    }
    const isValidPassword = verifyPassword(
      password,
      user?.saltPassword,
      user?.password,
    );
    if (!isValidPassword) {
      return next(new ApiError('Invalid credentials', statusCode.UNAUTHORIZED));
    }
    const isValidRefreshToken = await verifyRefreshToken(user?.refreshToken);
    if (!isValidRefreshToken) {
      return next(
        new ApiError('Invalid token signature', statusCode.UNAUTHORIZED),
      );
    }
    const { accessToken } = await generateToken({
      email: user?.email,
      firstName: user?.firstName,
      id: user?._id as string,
    });
    res.cookie('refreshToken', user?.refreshToken, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: false, // Ensures the cookie is sent only over HTTPS
      sameSite: 'Lax', // Mitigates CSRF attacks
      path: '/',
    });
    res.set('Authorization', accessToken);
    return res
      .status(statusCode.OK)
      .json(new ApiResponse('Login successfully', statusCode.OK, user.safe));
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const loginWithGoogle = async (req, res, next) => {
  try {
    const { token } = req?.body;

    // Check if token exists
    if (!token) {
      return next(new ApiError('Access token not found', statusCode.NOT_FOUND));
    }

    // Fetch user data from Google
    const googleUserInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const response = await fetch(googleUserInfoURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for errors in Google response
    if (!response?.ok) {
      return next(
        new ApiError(
          'Error fetching user data from Google',
          response?.status || statusCode.UNAUTHORIZED,
        ),
      );
    }

    const data = await response?.json();
    if (!data) {
      return next(
        new ApiError(
          'Error fetching user data from Google',
          response?.status || statusCode.UNAUTHORIZED,
        ),
      );
    }

    // Prepare payload
    const userName = `${data?.given_name}${data?.family_name}${generateUniqueId(3)}`;
    const payload = {
      firstName: data?.given_name,
      lastName: data?.family_name,
      email: data?.email,
      profilePicture: data?.picture,
      isEmailVerified: true,
      userName,
    };

    // Check if user already exists
    let user = await GetUserByEmail(payload?.email);

    // If user doesn't exist, create a new user
    if (!user) {
      user = await CreateUser(payload);
    }

    // Generate tokens
    const { refreshToken, accessToken } = await generateToken({
      firstName: payload?.firstName,
      email: payload?.email,
      id: user?._id as string,
    });

    // Update or set refreshToken for the user
    if (!user) {
      await UpdateUser(user?._id as string, { refreshToken });
    }

    // Set cookies for refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Lax',
      path: '/',
    });

    // Set Authorization header for access token
    res.set('Authorization', accessToken);

    // Send response
    const statusMessage = user?.isNew
      ? 'User created successfully!'
      : 'Login successful';
    return res
      .status(user?.isNew ? statusCode.CREATED : statusCode.OK)
      .json(new ApiResponse(statusMessage, statusCode.OK, user.safe));
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const sendVerificationMail = async (req, res, next) => {
  try {
    const email = req?.user?.email;
    if (!email) {
      return next(
        new ApiError('Email not found please try again', statusCode.NOT_FOUND),
      );
    }
    const token = jwt.sign({ email }, appConfig.SECRET_KEY, {
      expiresIn: '1h',
    });
    const verificationLink = `${appConfig.BACKEND_URL}/api/auth/verify-email?token=${token}`;
    const emailRes = await sendEmail({
      html: SendEmailIemplate(verificationLink),
      subject: 'Verify Email',
      to: email,
    });
    if (!emailRes?.success) {
      return next(
        new ApiError(
          emailRes?.error?.message || 'Error to send email',
          statusCode.INTERNAL_SERVER_ERROR,
        ),
      );
    }
    return res
      .status(statusCode.OK)
      .json(new ApiResponse('Email send successfully', statusCode.OK));
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const token = req?.query?.token;
    const cookieOptions = {
      // domain: `${appConfig.FRONTEND_URL}`,
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: false, // Ensures the cookie is sent only over HTTPS
      sameSite: 'Lax', // Mitigates CSRF attacks
      path: '/',
    };
    const emailNotVerfiedMessage = JSON.stringify({
      success: false,
      message: 'Unauthorized user!! try again',
    });
    const emailVerifiedMessage = JSON.stringify({
      success: true,
      message: 'Email verified successfully',
    });
    if (!token) {
      res.cookie(appConfig.TOASTER, emailNotVerfiedMessage, cookieOptions);
      return res.redirect(`${appConfig.FRONTEND_URL}/chat`);
    }
    const decoded = jwt.verify(token, appConfig.SECRET_KEY);
    const email = decoded?.email;
    if (!email) {
      res.cookie(appConfig.TOASTER, emailNotVerfiedMessage, cookieOptions);
      return res.redirect(`${appConfig.FRONTEND_URL}/chat`);
    }
    const user = await GetUserByEmail(email);
    if (!user) {
      res.cookie(appConfig.TOASTER, emailNotVerfiedMessage, cookieOptions);
      return res.redirect(`${appConfig.FRONTEND_URL}/chat`);
    }
    await UpdateUser(user?._id as string, { isEmailVerified: true });
    res.cookie(appConfig.TOASTER, emailVerifiedMessage, cookieOptions);
    return res.redirect(`${appConfig.FRONTEND_URL}/chat`);
  } catch (error) {
    console.log(error, 'error');
    res.cookie(
      appConfig.TOASTER,
      JSON.stringify({
        success: false,
        message: 'Unauthorized user!! try again',
      }),
      {
        httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
        secure: false, // Ensures the cookie is sent only over HTTPS
        sameSite: 'Lax', // Mitigates CSRF attacks
        path: '/',
      },
    );
    return res.redirect(`${appConfig.FRONTEND_URL}/chat`);
  }
};

const logout = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError('Unauthorized', statusCode.UNAUTHORIZED));
    }
    const user = await GetUserById(req?.user?._id);
    if (!user) {
      return next(new ApiError('Unauthorized', statusCode.UNAUTHORIZED));
    }
    return res
      .status(statusCode.OK)
      .json(new ApiResponse('Logout successfully', statusCode.OK));
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export {
  createUser,
  loginWithEmail,
  logout,
  loginWithGoogle,
  sendVerificationMail,
  verifyEmail,
};
