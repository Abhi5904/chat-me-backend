import {
  GetAllInvitations,
  GetExistingInvitations,
  GetUnreadCount,
  InsertManyInvitation,
  UpdateInvitationsReadStatus,
} from '../services/invitations.service';
import {
  emitMarkedInvitation,
  emitUnreadInvitation,
} from '../socket-io/events/invitations';
import ApiError from '../utils/apiError.util';
import ApiResponse from '../utils/apiResponse.util';
import statusCode from '../utils/statusCode.util';

const sendInvitations = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const invitations = payload?.invitations?.map((data) => ({
      senderId: payload?.senderId,
      receiverId: data?.receiverId,
      message: data?.message,
    }));

    const newInvitations = [];
    const duplicateInvitations = [];
    for (const invitation of invitations) {
      const existingInvitation = await GetExistingInvitations(
        invitation?.senderId,
        invitation?.receiverId,
      );
      if (existingInvitation) {
        duplicateInvitations.push(invitation);
      } else {
        newInvitations.push(invitation);
      }
    }
    let savedInvitations = [];
    if (newInvitations.length > 0) {
      savedInvitations = await InsertManyInvitation(newInvitations);
      for (const invitation of savedInvitations) {
        await emitUnreadInvitation(invitation?.receiverId);
      }
    }

    const totalCount = invitations.length;
    const uniqueCount = newInvitations.length;
    const duplicateCount = duplicateInvitations.length;

    let message: string;
    if (uniqueCount === totalCount) {
      message = 'All invitations sent successfully.';
    } else if (duplicateCount === totalCount) {
      message =
        'All invitations are duplicates and were skipped. You already sended invitation.';
    } else {
      message = `Invitations sent successfully. ${uniqueCount} unique invitation(s) were sent, and ${duplicateCount} duplicate invitation(s) were skipped.`;
    }

    return res
      .status(statusCode.CREATED)
      .json(new ApiResponse(message, statusCode.CREATED, savedInvitations));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(
        error?.message || 'Internal server error',
        statusCode.INTERNAL_SERVER_ERROR,
      ),
    );
  }
};

const getAllInvitations = async (req, res, next) => {
  try {
    const id = req?.user?._id;
    const { type } = req?.query;
    let allInvitations;
    allInvitations = await GetAllInvitations(id, type);
    if (!allInvitations || allInvitations?.length === 0) {
      return next(new ApiError('No invitations found', statusCode.NOT_FOUND));
    }
    if (type === 'receive') {
      const isUpdated = await UpdateInvitationsReadStatus(id);
      if (isUpdated?.modifiedCount > 0) {
        allInvitations = await GetAllInvitations(id, type);
        await emitMarkedInvitation(id);
      }
    }
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'All Invitations fetched successfully',
          statusCode.OK,
          allInvitations,
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

const getUnreadInvitationCount = async (req, res, next) => {
  try {
    const id = req?.user?._id;
    const unReadCount = await GetUnreadCount({ receiverId: id });
    return res
      .status(statusCode.OK)
      .json(
        new ApiResponse(
          'Unread invitation fetched successfully',
          statusCode.OK,
          { unReadCount },
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

export { sendInvitations, getAllInvitations, getUnreadInvitationCount };
