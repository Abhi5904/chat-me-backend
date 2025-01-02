import { ObjectId } from 'mongoose';
import { IMessageSchema } from './message.type';

export interface IConversationShema {
  participants: ObjectId[]; // Array of user IDs involved in the conversation
  lastMessage: IMessageSchema; // Details of the last message in the conversation
  unreadCount: Map<string, number>; // Unread message counts per participant
}
