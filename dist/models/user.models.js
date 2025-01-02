"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
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
}, {
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
});
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
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
//# sourceMappingURL=user.models.js.map