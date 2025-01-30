
import mongoose from "mongoose";
export class User {
    constructor(
      public _id: mongoose.Types.ObjectId,
      public name: string,
      public email: string,
      public password: string,
      public profilePic?: string,
      public createdAt?: Date,
      public updatedAt?: Date
    ) {}

    omitPassword(){
      const {password, ...rest} = this;
      return rest;
    }

}