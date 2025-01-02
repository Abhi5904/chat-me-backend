import Invitation from '../models/invitation.model';

const InsertManyInvitation = async (data) => {
  return await Invitation.insertMany(data);
};

const GetAllInvitations = async (id: string, type: string) => {
  const filter = type === 'send' ? { senderId: id } : { receiverId: id };
  const populateField = type === 'send' ? 'receiverId' : 'senderId';
  // const selectField = type === 'send' ? '-senderId' : '-receiverId';
  const populate = {
    path: populateField,
    select: 'firstName lastName profilePicture userName',
  };

  return await Invitation.find(filter).populate(populate);
};

const UpdateInvitationsReadStatus = async (id: string) => {
  return await Invitation.updateMany(
    { receiverId: id },
    { $set: { isReaded: true } },
    { new: true },
  );
};

const GetUnreadCount = async (data) => {
  return await Invitation.countDocuments({
    ...data,
    isReaded: false,
  });
};

const GetReadCount = async (data) => {
  return await Invitation.countDocuments({
    ...data,
    isReaded: true,
  });
};

const GetExistingInvitations = async (senderId: string, receiverId: string) => {
  return await Invitation.findOne({
    senderId: senderId,
    receiverId: receiverId,
    status: 'pending',
  });
};

const GetReceiverIdCurrentUserId = async (currentUserId: string) => {
  const senderIds = await Invitation.find({
    $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
  }).distinct('senderId');

  // Get distinct receiverIds
  const receiverIds = await Invitation.find({
    $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
  }).distinct('receiverId');
  return [...new Set([...senderIds, ...receiverIds])];
};

export {
  InsertManyInvitation,
  GetAllInvitations,
  UpdateInvitationsReadStatus,
  GetUnreadCount,
  GetReadCount,
  GetExistingInvitations,
  GetReceiverIdCurrentUserId,
};
