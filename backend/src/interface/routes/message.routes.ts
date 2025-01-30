import {Router} from "express";
import Container from "typedi";
import { MessageController } from "../controllers/message.controller";
import { protectRoute } from "../middlewares/auth.middleware";
const messageRouter = Router();

const messageController = Container.get(MessageController)
messageRouter.get("/users",protectRoute, messageController.getUsersForSidebarHandler);
messageRouter.get("/:id",protectRoute, messageController.getMessagesHandler);
messageRouter.post("/send/:id",protectRoute, messageController.sendMessageHandler);

export default messageRouter


