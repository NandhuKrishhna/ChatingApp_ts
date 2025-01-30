import { UserModel } from "../../infrastructure/models/user.model";

export type SignUpParams = {
    name: string;
    email: string;
    password: string;
};

export type LoginParams = {
    email: string;
    password: string;
};

export interface AuthenticatedRequest extends Request {
    user?: typeof UserModel.prototype;
  }