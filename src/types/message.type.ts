import { ObjectId } from 'mongoose';
import { IMediaSchema } from './media.type';

export interface IMessageSchema {
  senderId: ObjectId;
  receiverId: ObjectId;
  content: string;
  media: IMediaSchema[];
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}
