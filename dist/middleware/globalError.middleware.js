"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_utils_1 = __importDefault(require("../utils/apiError.utils"));
const glboalErrorHandling = (err, req, res, next) => {
    if (err instanceof apiError_utils_1.default) {
        return res.status(err.code).json({
            status: err.status,
            message: err.message,
            code: err.code,
            details: err.details,
        });
    }
    // Default error handling for unexpected errors
    const errorResponse = new apiError_utils_1.default(err.message || 'An unexpected error occurred', err.statusCode || 500, err.details || null);
    return res.status(errorResponse.code).json({
        status: errorResponse.status,
        message: errorResponse.message,
        code: errorResponse.code,
        details: errorResponse.details,
    });
};
exports.default = glboalErrorHandling;
//# sourceMappingURL=globalError.middleware.js.map