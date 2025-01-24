"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_util_1 = __importDefault(require("../utils/apiError.util"));
const statusCode_util_1 = __importDefault(require("../utils/statusCode.util"));
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return next(new apiError_util_1.default('Invalid object id', statusCode_util_1.default.NOT_FOUND));
    }
    next();
};
exports.default = validateObjectId;
//# sourceMappingURL=idValidator.middleware.js.map