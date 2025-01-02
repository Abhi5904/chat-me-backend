import mongoose from 'mongoose';
import ApiError from '../utils/apiError.util';
import statusCode from '../utils/statusCode.util';

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError('Invalid object id', statusCode.NOT_FOUND));
  }
  next();
};
export default validateObjectId;
