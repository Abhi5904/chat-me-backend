import * as Yup from 'yup';
import ApiError from '../utils/apiError.util';
import statusCode from '../utils/statusCode.util';

const validateSendInvitation = async (req, res, next) => {
  const sendInvitationValidationSchema = Yup.object().shape({
    senderId: Yup.string().required('Sender ID is required'),
    invitations: Yup.array()
      .of(
        Yup.object().shape({
          receiverId: Yup.string().required('Receiver ID is required'),
          message: Yup.string().required('Message is required'),
        }),
      )
      .min(1, 'At least one invitation must be provided'),
  });

  try {
    await sendInvitationValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.error('ValidationError:', error);
    console.log();
    return next(
      new ApiError('ValidationError', statusCode.BAD_REQUEST, error.errors),
    );
  }
};

export { validateSendInvitation };
