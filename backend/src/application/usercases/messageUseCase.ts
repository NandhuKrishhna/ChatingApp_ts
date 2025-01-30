import mongoose from "mongoose";
import { Inject, Service } from "typedi";
import { IMessageRepository, IMessageRepositoryToken } from "../respositories/IMessageRepostory";
import cloudinary from "../../config/cloudinary";
import { Message } from "../../domain/entities/message.entity";
type sendMessageParams ={
    myId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    text: string,
    image: string
}
@Service()
export class MessageUseCase {
  constructor(@Inject(IMessageRepositoryToken) private messageRepository: IMessageRepository) { }

  async getMessages(myId: mongoose.Types.ObjectId, userToChatId: mongoose.Types.ObjectId) {
    const messages = await this.messageRepository.fetchMessages(myId, userToChatId);
    return messages;
  }

  async sendMessage({ myId, receiverId, text, image }: sendMessageParams) {
    let imageUrl: string | undefined;

    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message(myId, receiverId, text, imageUrl || ""); 

    await this.messageRepository.sendMessage(newMessage);
}

}

