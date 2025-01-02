import User from '../models/user.model';
import { ICreateUserPayload } from '../types/user.type';
import { verifyToken } from '../utils/token.util';

const GetAllUser = async () => {
  return await User.find({});
};

const GetUserWithFilter = async (filter) => {
  return await User.find(filter);
};

const GetUserById = async (id: string) => {
  return await User.findById(id);
};

const GetUserByAuthtoken = async (token: string) => {
  const user = await verifyToken(token);
  return await User.findById(user?.id);
};

const CreateUser = async (data: ICreateUserPayload) => {
  return await User.create(data);
};

const UpdateUser = async (id: string, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  console.log(updatedUser, 'updatedUser');
  return updatedUser;
};

const GetUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const DeleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export {
  GetAllUser,
  CreateUser,
  GetUserByEmail,
  GetUserByAuthtoken,
  UpdateUser,
  DeleteUser,
  GetUserWithFilter,
  GetUserById,
};
