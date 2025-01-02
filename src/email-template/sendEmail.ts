const SendEmailIemplate = (verificationLink: string) => {
  return ` <p>Click the button below to verify your email address:</p>
    <a href="${verificationLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Confirm Email</a>
    <p>If you didn't request this, please ignore this email.</p>`;
};

export default SendEmailIemplate;
