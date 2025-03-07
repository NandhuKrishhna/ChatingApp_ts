import "reflect-metadata";
import './infrastructure/di/container'
import "dotenv/config";
import express from 'express';
import authRouter from './interface/routes/auth.route';
import connectToDataBase from "./infrastructure/database/MongoDBClient";
import { APP_ORIGIN, PORT } from "./shared/utils/env";
import errorHandler from "./interface/middlewares/errorHandler";
import cookieParser from "cookie-parser";
import messageRouter from "./interface/routes/message.routes";
import cors from "cors";
import { app, server } from "./config/socket";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:APP_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }))
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.use(errorHandler);

server.listen(PORT, async () => {
console.log(`Server is running on port ${PORT}`);
await connectToDataBase()
});