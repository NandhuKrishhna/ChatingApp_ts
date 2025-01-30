import mongoose, { Document, Model, mongo, Schema } from "mongoose";
import { hashPassword } from "../../shared/utils/bcrypt";

export interface UserDocument extends Document{
    _id:mongoose.Types.ObjectId;
    name:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
    profilePic?:string;
    omitPassword() : Pick<UserDocument, '_id' |'name' | 'email' | 'createdAt' | 'updatedAt' | 'profilePic'>;

};


const UserSchema : Schema = new Schema<UserDocument>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profilePic:{type:String}
    
},{timestamps:true});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password  = await hashPassword(this.password as string);
})

UserSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
  }
export const UserModel : Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema);