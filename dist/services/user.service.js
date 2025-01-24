"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = exports.GetUserWithFilter = exports.DeleteUser = exports.UpdateUser = exports.GetUserByAuthtoken = exports.GetUserByEmail = exports.CreateUser = exports.GetAllUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const token_util_1 = require("../utils/token.util");
const GetAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find({});
});
exports.GetAllUser = GetAllUser;
const GetUserWithFilter = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find(filter);
});
exports.GetUserWithFilter = GetUserWithFilter;
const GetUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findById(id);
});
exports.GetUserById = GetUserById;
const GetUserByAuthtoken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, token_util_1.verifyToken)(token);
    return yield user_model_1.default.findById(user === null || user === void 0 ? void 0 : user.id);
});
exports.GetUserByAuthtoken = GetUserByAuthtoken;
const CreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(data);
});
exports.CreateUser = CreateUser;
const UpdateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, data, { new: true });
    console.log(updatedUser, 'updatedUser');
    return updatedUser;
});
exports.UpdateUser = UpdateUser;
const GetUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ email });
});
exports.GetUserByEmail = GetUserByEmail;
const DeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByIdAndDelete(id);
});
exports.DeleteUser = DeleteUser;
//# sourceMappingURL=user.service.js.map