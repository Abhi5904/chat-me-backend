import mongoose, { Schema } from 'mongoose';
import { IUserSchema } from '../types/user.type';

interface IUserDocument extends Document, IUserSchema {
  safe: IUserSchema; // Include the safe virtual property
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    profilePicture: {
      type: String,
    },
    saltPassword: {
      type: String,
    },
    refreshToken: {
      type: String,
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

userSchema.virtual('safe').get(function () {
  const user = this.toObject(); // Convert the document to a plain JavaScript object
  delete user.password;
  delete user.saltPassword;
  delete user.refreshToken;
  return user; // Return the object without sensitive fields
});

// Optional: Ensure that virtual fields are included in the JSON output
// userSchema.set('toJSON', {
//   virtuals: true,
// });

const User = mongoose.model<IUserDocument>('user', userSchema);

export default User;
