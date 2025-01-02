import mongoose, { Schema } from 'mongoose';
import { IMessageSchema } from '../types/message.type';

interface MessageDocument extends IMessageSchema, Document {}

const messageSchema = new Schema<MessageDocument>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    receiverId: [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
    content: { type: String, default: '' },
    media: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'media',
        },
      ],
      default: [],
    },
    timestamp: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  },
);

const Message = mongoose.model<MessageDocument>('message', messageSchema);

export default Message;
