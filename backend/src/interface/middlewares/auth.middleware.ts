import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../infrastructure/models/user.model";
import appAssert from "../../shared/utils/appAssert.utils";
import { UNAUTHORIZED } from "../../shared/constants/http";
import { JWT_SECRET } from "../../shared/utils/env";

interface AuthenticatedRequest extends Request {
  user?: typeof UserModel.prototype;
}

export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken; 
    appAssert(token, UNAUTHORIZED, "Authentication required");

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    appAssert(decoded, UNAUTHORIZED, "Invalid token");

    const user = await UserModel.findById(decoded.userId);
    appAssert(user, UNAUTHORIZED, "User no longer exists");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
