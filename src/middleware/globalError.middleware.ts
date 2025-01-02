import ApiError from '../utils/apiError.util';

const glboalErrorHandling = (err: any, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({
      status: err.status,
      message: err.message,
      code: err.code,
      details: err.details,
    });
  }

  // Default error handling for unexpected errors
  const errorResponse = new ApiError(
    err.message || 'An unexpected error occurred',
    err.statusCode || 500,
    err.details || null,
  );
  return res.status(errorResponse.code).json({
    status: errorResponse.status,
    message: errorResponse.message,
    code: errorResponse.code,
    details: errorResponse.details,
  });
};

export default glboalErrorHandling;
