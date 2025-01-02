"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, html }) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: appConfig_1.default.EMAIL_USER,
                pass: appConfig_1.default.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: appConfig_1.default.EMAIL_USER,
            to,
            subject,
            html,
        };
        // Send the email
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return { success: true, info };
    }
    catch (error) {
        console.error('Error sending email: ', error);
        return { success: false, error };
    }
});
exports.default = sendEmail;
//# sourceMappingURL=sendMail.utils.js.map