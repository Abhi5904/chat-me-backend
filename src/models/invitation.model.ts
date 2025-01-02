import mongoose, { Schema } from 'mongoose';
import { IInvitationSchema } from '../types/invitation.type';

interface InvitationDocument extends IInvitationSchema, Document {}

const invitationSchema = new Schema<InvitationDocument>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isReaded: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: ['accept', 'decline', 'pending'],
      default: 'pending',
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

const Invitation = mongoose.model<InvitationDocument>(
  'invitation',
  invitationSchema,
);

export default Invitation;
