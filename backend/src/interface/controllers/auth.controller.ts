import { Request, Response } from "express";
import catchErrors from "../../shared/utils/catchError.utilts";
import { loginSchema, userRegisterSchema } from "../validation/userSchema";
import { Inject, Service } from "typedi";
import { AuthUseCase } from "../../application/usercases/authUseCase";
import { clearAuthCookies, setTempAuthCookies } from "../../shared/utils/setcookies";
import { BAD_REQUEST, CREATED, OK } from "../../shared/constants/http";
import { UserModel } from "../../infrastructure/models/user.model";
import appAssert from "../../shared/utils/appAssert.utils";
interface AuthenticatedRequest extends Request {
  user?: typeof UserModel.prototype;
}
@Service()
export class UserController {
    constructor(@Inject() private authUseCase: AuthUseCase) {}
    //  user register handler
     registerHandler = catchErrors(async(req : Request, res : Response)=>{
       const request =  req.body
       const {user, token} = await this.authUseCase.registerUser(request);
       setTempAuthCookies({res, accessToken : token});
       res.status(CREATED).send(user);
       
     });

     loginHandler = catchErrors(async(req : Request, res : Response)=>{
        const request =  req.body;
        const {user, token} = await this.authUseCase.loginUser(request);
        setTempAuthCookies({res, accessToken : token});
        res.status(CREATED).send(user);
    });
    

    logoutHandler = catchErrors(async(req : Request, res : Response)=>{
      clearAuthCookies(res).status(OK).json({
        message : "Logout successfully"
      });
    })

    updateProfileHandler = catchErrors(async (req: AuthenticatedRequest, res: Response) => {
      const { profilePic } = req.body;
      appAssert(profilePic, BAD_REQUEST, "Profile picture is required");
      const userId = req.user?._id;
      console.log("userId from updateProfileHandler", userId);

     const  updatedUser =  await this.authUseCase.updateProfile(userId, profilePic);
     res.status(OK).json({
      message: "Profile picture updated successfully",
      user: updatedUser
     })
    });

    checkAuthHandler = catchErrors(async (req: AuthenticatedRequest, res: Response) => {
      res.status(OK).json(req.user.omitPassword());
    });
  }