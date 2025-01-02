import { GetUserByAuthtoken } from '../services/user.service';
import ApiError from '../utils/apiError.util';
import statusCode from '../utils/statusCode.util';

const verifyUserToken = async (req, res, next) => {
  try {
    const token =
      (req?.headers['authorization'] &&
        req.headers['authorization']?.split(' ')[1]) ||
      (req?.cookies && req?.cookies?.token);
    if (!token) {
      return next(new ApiError('token not found', statusCode.UNAUTHORIZED));
    }
    const user = await GetUserByAuthtoken(token);
    if (!user) {
      return next(new ApiError('Invalid token', statusCode.UNAUTHORIZED));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(new ApiError(error, statusCode.INTERNAL_SERVER_ERROR));
  }
};
export default verifyUserToken;
