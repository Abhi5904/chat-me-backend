import nodemailer from 'nodemailer';
import appConfig from '../config/appConfig';

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: appConfig.EMAIL_USER,
        pass: appConfig.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: appConfig.EMAIL_USER,
      to,
      subject,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ', info.response);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error };
  }
};
export default sendEmail;
