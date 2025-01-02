import { GetReceiverIdCurrentUserId } from '../services/invitations.service';
import {
  DeleteUser,
  GetAllUser,
  GetUserById,
  GetUserWithFilter,
  UpdateUser,
} from '../services/user.service';
import ApiError from '../utils/apiError.util';
import ApiResponse from '../utils/apiResponse.util';
import statusCode from '../utils/statusCode.util';

const getAllUser = async (req, res, next) => {
  try {
    const allUser = await GetAllUser();
    const allSafeUser =
      allUser?.length > 0 ? allUser?.map((user) => user.safe) : [];
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'User fetched successfully',
          statusCode.OK,
          allSafeUser,
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

const getAllEmailVerfiedUser = async (req, res, next) => {
  try {
    const allUser = await GetUserWithFilter({
      isEmailVerified: true,
      _id: { $ne: req?.user?._id },
    });
    const allSafeUser =
      allUser?.length > 0 ? allUser?.map((user) => user.safe) : [];
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'Email verfied users fetched successfully',
          statusCode.OK,
          allSafeUser,
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

const getInvitableUsers = async (req, res, next) => {
  try {
    const { _id: currentUserId } = req.user;
    const invitedReceiverIds = await GetReceiverIdCurrentUserId(currentUserId);
    console.log(invitedReceiverIds, 'invitedReceiverIds');
    const allUser = await GetUserWithFilter({
      _id: { $nin: invitedReceiverIds },
      isEmailVerified: true,
    });
    if (!allUser || allUser?.length === 0) {
      return next(new ApiError('Users not found', statusCode.NOT_FOUND));
    }
    const allSafeUser =
      allUser?.length > 0 ? allUser?.map((user) => user.safe) : [];
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'Invitable users fetched successfully',
          statusCode.OK,
          allSafeUser,
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

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ApiError('Not found', statusCode.NOT_FOUND));
    }
    const user = await GetUserById(id);

    if (!user) {
      return next(new ApiError('User not found', statusCode.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse('User fetched successfully', statusCode.OK, user.safe),
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

const getUserByToken = async (req, res, next) => {
  try {
    const user = req?.user;
    if (!user) {
      return next(new ApiError('User not found', statusCode.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'User fetched successfully!!',
          statusCode.OK,
          user.safe,
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

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ApiError('Not found', statusCode.NOT_FOUND));
    }
    const user = await GetUserById(id);

    if (!user) {
      return next(new ApiError('User not found', statusCode.NOT_FOUND));
    }

    await DeleteUser(id);

    return res
      .status(statusCode.OK)
      .json(new ApiResponse('User deleted successfully', statusCode.OK));
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ApiError('Not found', statusCode.NOT_FOUND));
    }
    const user = await GetUserById(id);

    if (!user) {
      return next(new ApiError('User not found', statusCode.NOT_FOUND));
    }
    const updatedUser = await UpdateUser(id, req?.body);

    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'User updated successfully',
          statusCode.OK,
          updatedUser.safe,
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

export {
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  getUserByToken,
  getAllEmailVerfiedUser,
  getInvitableUsers,
};
