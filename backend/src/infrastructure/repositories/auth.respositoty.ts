import { Service } from "typedi";
import { IAuthRepository, IAuthRepositoryToken } from "../../application/respositories/IAuthRepository"
import { User } from "../../domain/entities/user.entity"
import { UserModel } from "../models/user.model";
import mongoose from "mongoose";


@Service(IAuthRepositoryToken)
export class AuthRespository implements IAuthRepository {


    async createUser(user: User): Promise<User> {
        const result = await UserModel.create(user);
        return result 
    }


    async findUserByEmail(email: string): Promise<User | null> {
        const result = await UserModel.findOne({email});
        return result;
    }

    async updateProfile(userId: string, profilePic: string): Promise<User | null> {
        const result = await UserModel.findOneAndUpdate({ _id: userId }, { profilePic }, { new: true });
        return result;
    }

    async getFilteredUsers(id: mongoose.Types.ObjectId): Promise<User[]> {
    const filteredUsers = await UserModel.find({ _id: { $ne: id } }).select('-password');
    return filteredUsers;
}
}