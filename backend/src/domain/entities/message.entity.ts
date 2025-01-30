import mongoose from "mongoose";

export class Message {
    constructor(
        public sender: mongoose.Types.ObjectId,
        public receiver: mongoose.Types.ObjectId,
        public text: string,
        public image?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ){}
}