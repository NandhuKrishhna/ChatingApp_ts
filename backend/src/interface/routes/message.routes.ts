import {Router} from "express";
import Container from "typedi";
import { MessageController } from "../controllers/message.controller";
const messageRouter = Router();

const messageController = Container.get(MessageController)
messageRouter.get("/users", messageController.getUsersForSidebarHandler);
messageRouter.get("/:id", messageController.getMessagesHandler);
messageRouter.post("/send/:id", messageController.sendMessageHandler);

export default messageRouter


