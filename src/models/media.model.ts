import mongoose, { Schema } from 'mongoose';
import { IMediaSchema } from '../types/media.type';

interface MediaDocument extends IMediaSchema, Document {}

const mediaSchema = new Schema<MediaDocument>(
  {
    type: {
      type: String,
      enum: ['image', 'video', 'file'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: null,
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

const Media = mongoose.model<MediaDocument>('media', mediaSchema);

export default Media;
