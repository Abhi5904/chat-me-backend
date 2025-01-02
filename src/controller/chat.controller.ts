import { getSocket } from '../socket-io/socket';
import ApiError from '../utils/apiError.util';
import ApiResponse from '../utils/apiResponse.util';
import statusCode from '../utils/statusCode.util';

const testchat = async (req, res, next) => {
  try {
    console.log(req.user, 'user');
    const io = getSocket();
    io.emit('user-detail', req.user);
    return res
      .status(statusCode.OK)
      .json(new ApiResponse('event emitted successfully', 200));
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export { testchat };
