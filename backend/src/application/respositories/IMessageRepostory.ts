import mongoose from "mongoose";
import { Token } from "typedi";
import { Message } from "../../domain/entities/message.entity";

export interface IMessageRepository {


  fetchMessages(myId: mongoose.Types.ObjectId, userToChatId: mongoose.Types.ObjectId): Promise<any>
  sendMessage(message:Message): Promise<any>
}


export const IMessageRepositoryToken = new Token<IMessageRepository>();