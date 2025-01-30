import mongoose from "mongoose";
import { User } from "../../domain/entities/user.entity";
import { LoginParams, SignUpParams } from "../../domain/types/auth.types";
import { BAD_REQUEST } from "../../shared/constants/http";
import appAssert from "../../shared/utils/appAssert.utils";
import {
  IAuthRepository,
  IAuthRepositoryToken,
} from "../respositories/IAuthRepository";
import { signResetToken } from "../../shared/utils/jwt";
import { Inject, Service } from "typedi";
import { comparePassword } from "../../shared/utils/bcrypt";
import cloudinary from "../../config/cloudinary";
@Service()
export class AuthUseCase {
  constructor(
    @Inject(IAuthRepositoryToken) private authRepository: IAuthRepository
  ) {}

  async registerUser(userData: SignUpParams) {
    const existingUser = await this.authRepository.findUserByEmail(
      userData.email
    );
    appAssert(!existingUser, BAD_REQUEST, "User already exists");
    const user = new User(
      new mongoose.Types.ObjectId(),
      userData.name,
      userData.email,
      userData.password
    );
    const newUser = await this.authRepository.createUser(user);
    const token = signResetToken({ userId: newUser._id });
    return {
      token,
      user: newUser.omitPassword(),
    };
  }

  async loginUser(userData: LoginParams) {
    const user = await this.authRepository.findUserByEmail(userData.email);
    appAssert(user, BAD_REQUEST, "User not found");

    const isPasswordValid = await comparePassword(userData.password, user.password);
    appAssert(isPasswordValid, BAD_REQUEST, "Invalid credentials");

    const token = signResetToken({ userId: user._id });
    return {
        token,
        user: user.omitPassword(),
    };
}



  async updateProfile(userId: string, profilePic: string) {
   const uploadResponse =   await cloudinary.uploader.upload(profilePic)
   const updatedUser = await this.authRepository.updateProfile(userId , uploadResponse.secure_url);
   return updatedUser
  }


  
  async getFilteredUsers(id: mongoose.Types.ObjectId) {
    const filteredUsers = await this.authRepository.getFilteredUsers(id);
    return filteredUsers;
  }
}
