import * as Yup from 'yup';
import ApiError from '../utils/apiError.util';
import statusCode from '../utils/statusCode.util';

const validateCreateUser = async (req, res, next) => {
  const userValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().optional(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string()
      // .matches(
      //   /^(?=.*[A-Z])/, // At least one uppercase letter
      //   'Password must contain at least one uppercase letter',
      // )
      // .matches(
      //   /^(?=.*[a-z])/, // At least one lowercase letter
      //   'Password must contain at least one lowercase letter',
      // )
      // .matches(
      //   /^(?=.*\d)/, // At least one number
      //   'Password must contain at least one number',
      // )
      // .matches(
      //   /^(?=.*[!@#$%^&*(),.?":{}|<>])/, // At least one special character
      //   'Password must contain at least one special character',
      // )
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password must be at most 20 characters long')
      .required('Password is required'),
  });
  try {
    await userValidationSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error, 'ValidationError');
    return next(
      new ApiError('ValidationError', statusCode.BAD_REQUEST, error.errors),
    );
  }
};

const validateLoginWithEmailUser = async (req, res, next) => {
  const loginWithEmailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is requried'),
    password: Yup.string().required('Password is required'),
  });

  try {
    await loginWithEmailValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error, 'ValidationError');
    return next(
      new ApiError('ValidationError', statusCode.BAD_REQUEST, error.errors),
    );
  }
};

const validateUpdateUser = async (req, res, next) => {
  const updateUserValidationSchema = Yup.object().shape({
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    bio: Yup.string().optional(),
    profilePicture: Yup.string().optional(),
  });
  try {
    await updateUserValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error, 'ValidationError');
    return next(
      new ApiError('ValidationError', statusCode.BAD_REQUEST, error.errors),
    );
  }
};

export { validateCreateUser, validateLoginWithEmailUser, validateUpdateUser };
