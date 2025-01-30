import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../infrastructure/models/user.model";
interface AuthenticatedRequest extends Request {
  user?: typeof UserModel.prototype;
}

type AsyncController = (
  req: Request, 
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchErrors =
  (controller: AsyncController) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req as AuthenticatedRequest, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchErrors;
