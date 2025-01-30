import mongoose from "mongoose";
import {
  IMessageRepository,
  IMessageRepositoryToken,
} from "../../application/respositories/IMessageRepostory";
import { MessageModel } from "../models/message.model";
import { Service } from "typedi";
import { Message } from "../../domain/entities/message.entity";

@Service(IMessageRepositoryToken)
export class MessageRepository implements IMessageRepository {
  async fetchMessages(
    myId: mongoose.Types.ObjectId,
    userToChatId: mongoose.Types.ObjectId
  ): Promise<any> {
    const messages = await MessageModel.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    });
    return messages;
  }
  async sendMessage( message: Message): Promise<any> {
    const response = await MessageModel.create(message);
    return response
  }
}
