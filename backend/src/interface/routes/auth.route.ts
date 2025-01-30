import {Router} from "express";
import Container from "typedi";
import { UserController } from "../controllers/auth.controller";
import { protectRoute } from "../middlewares/auth.middleware";
const authRouter = Router();

const userController = Container.get(UserController)
authRouter.post("/signup", userController.registerHandler);
authRouter.post("/login", userController.loginHandler);
authRouter.post("/logout", userController.logoutHandler);
authRouter.put("/update-profile", protectRoute, userController.updateProfileHandler);
authRouter.get("/check", protectRoute, userController.checkAuthHandler);




export default authRouter;