"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// apiError.ts
class ApiError extends Error {
    constructor(message, code = 500, details = null) {
        super(message); // Call the parent constructor (Error) with the message
        this.status = 'error';
        this.message = message;
        this.code = code;
        this.details = details;
        // Set the prototype explicitly for TypeScript class inheritance to work properly
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.utils.js.map