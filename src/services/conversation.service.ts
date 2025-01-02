import Conversation from '../models/conversation.model';

const GetConversationByUser = async (id: string) => {
  return await Conversation.find({ participants: id })
    .populate('participants', 'userName profilePicture')
    .populate('lastMessage', 'senderId receiverId content timestamp')
    .exec();
};

export { GetConversationByUser };
