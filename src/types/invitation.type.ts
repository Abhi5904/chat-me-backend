import { ObjectId } from 'mongoose';

export interface IInvitationSchema {
  senderId: ObjectId;
  receiverId: ObjectId;
  message: string;
  isReaded: boolean;
  status: 'accept' | 'decline' | 'pending';
}
