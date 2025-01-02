"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const idValidator_middleware_1 = __importDefault(require("../middleware/idValidator.middleware"));
const user_validate_1 = require("../validate/user.validate");
const userRouter = express_1.default.Router();
userRouter.route('/').get(user_controller_1.getAllUser);
userRouter.route('/token').get(user_controller_1.getUserByToken);
userRouter.use('/:id', idValidator_middleware_1.default);
userRouter
    .route('/:id')
    .get(user_controller_1.getUserById)
    .delete(user_controller_1.deleteUser)
    .put(user_validate_1.validateUpdateUser, user_controller_1.updateUser);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map