"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(message, code = 200, data = null) {
        this.status = 'success';
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
exports.default = ApiResponse;
//# sourceMappingURL=apiResponse.utils.js.map