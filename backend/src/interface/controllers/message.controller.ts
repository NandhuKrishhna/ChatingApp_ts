import { Request, Response } from "express";
import catchErrors from "../../shared/utils/catchError.utilts";
import { UserModel } from "../../infrastructure/models/user.model";
import { Inject, Service } from "typedi";
import { AuthUseCase } from "../../application/usercases/authUseCase";
import { MessageUseCase } from "../../application/usercases/messageUseCase";
import mongoose from "mongoose";
import { OK, UNAUTHORIZED } from "../../shared/constants/http";
import appAssert from "../../shared/utils/appAssert.utils";

interface AuthenticatedRequest extends Request {
    user?: typeof UserModel.prototype;
  }
@Service()
export class MessageController {
    constructor(
        @Inject() private authUseCase: AuthUseCase,
        @Inject() private messageUseCase : MessageUseCase
    ){}




    getUsersForSidebarHandler = catchErrors(async(req : AuthenticatedRequest, res : Response)=>{
    const loggedInUserId = req.user._id;
    console.log("loggedInUserId", loggedInUserId);
     const filteredUsers = await this.authUseCase.getFilteredUsers(loggedInUserId);
     res.status(200).json(filteredUsers);
    })

    getMessagesHandler = catchErrors(async(req : AuthenticatedRequest, res : Response)=>{
      const {id:userToChatId} = req.params;
      const myId  = req.user._id;
      const messages = await this.messageUseCase.getMessages(myId, new mongoose.Types.ObjectId(userToChatId));
      res.status(OK).json({
        success: true,
        messages
      });

    })

    sendMessageHandler = catchErrors(async (req: AuthenticatedRequest, res: Response) => {
        const { id: receiverId } = req.params;
        const { text, image } = req.body;
        const senderId = req.user?._id; 
    
        appAssert(senderId, UNAUTHORIZED, "User authentication required"); 
    
        const message = await this.messageUseCase.sendMessage({
            myId: senderId,
            receiverId: new mongoose.Types.ObjectId(receiverId),
            text,
            image,
        });
    
        res.status(201).json({ success: true, message });
    });
    

}