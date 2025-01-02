import { GetConversationByUser } from '../services/conversation.service';
import ApiError from '../utils/apiError.util';
import ApiResponse from '../utils/apiResponse.util';
import statusCode from '../utils/statusCode.util';

const getConversationByUserId = async (req, res, next) => {
  try {
    const id = req?.params?.id || req?.user?._id?.toString();
    const conversations = await GetConversationByUser(id);
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'All conversation fetched successfully!!',
          statusCode.OK,
          conversations,
        ),
      );
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const getConversationByUser = async (req, res, next) => {
  try {
    const id = req?.user?._id?.toString();
    const conversations = await GetConversationByUser(id);
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'All conversation fetched successfully!!',
          statusCode.OK,
          conversations,
        ),
      );
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

export { getConversationByUserId, getConversationByUser };
