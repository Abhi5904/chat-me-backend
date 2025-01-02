import appConfig from '../config/appConfig';
import { ICreateTokenPayload } from '../types/user.type';
import jwt from 'jsonwebtoken';
import ApiError from './apiError.util';
import statusCode from './statusCode.util';

const generateToken = async (data: ICreateTokenPayload) => {
  const accessToken = jwt.sign(
    data,
    { key: appConfig.JWT_PRIVATE_KEY, passphrase: appConfig.SECRET_KEY },
    { algorithm: 'RS256', expiresIn: appConfig.ACCESS_TOKEN_TIME },
  );

  const refreshToken = jwt.sign(
    data,
    { key: appConfig.JWT_PRIVATE_KEY, passphrase: appConfig.SECRET_KEY },
    { algorithm: 'RS256', expiresIn: appConfig.REFRESH_TOKEN_TIME },
  );

  return { accessToken, refreshToken };
};

const verifyToken = async (token: string) => {
  try {
    const user = await jwt.verify(token, appConfig.JWT_PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    return user;
  } catch (error) {
    console.log(error, 'error');
    return false;
  }
};

const verifyRefreshToken = async (refreshToken: string): Promise<any> => {
  try {
    const user = await jwt.verify(refreshToken, appConfig.JWT_PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    return user;
  } catch (error) {
    console.log(error, 'error');
    return false;
    // if (error.name === 'JsonWebTokenError') {
    //   return new ApiError('Invalid token signature', statusCode.UNAUTHORIZED);
    // } else if (error.name === 'TokenExpiredError') {
    //   return new ApiError('Token expired', statusCode.UNAUTHORIZED);
    // } else {
    //   return new ApiError(
    //     error.message || 'Token verification failed',
    //     statusCode.UNAUTHORIZED,
    //   );
    // }
  }
};

export { generateToken, verifyToken, verifyRefreshToken };
