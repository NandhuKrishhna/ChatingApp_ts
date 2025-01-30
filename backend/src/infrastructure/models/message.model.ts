import mongoose from "mongoose";



export interface MessageDocument extends mongoose.Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    text: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<MessageDocument>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


export const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);