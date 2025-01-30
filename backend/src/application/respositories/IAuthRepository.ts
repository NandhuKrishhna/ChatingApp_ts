import { Token } from "typedi";
import { User } from "../../domain/entities/user.entity";
import mongoose from "mongoose";


export interface IAuthRepository {
    createUser(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>
    updateProfile(userId: string, profilePic: string): Promise<User | null>;
    getFilteredUsers(id:mongoose.Types.ObjectId): Promise<User[]>
}


export const IAuthRepositoryToken = new Token<IAuthRepository>();