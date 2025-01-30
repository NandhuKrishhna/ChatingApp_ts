import "reflect-metadata";
import { Container } from "typedi";
import { IAuthRepositoryToken } from "../../application/respositories/IAuthRepository";
import { AuthRespository } from "../repositories/auth.respositoty";
import { IMessageRepositoryToken } from "../../application/respositories/IMessageRepostory";
import { MessageRepository } from "../repositories/message.reposirtory";


Container.set(IAuthRepositoryToken, new AuthRespository());
Container.set(IMessageRepositoryToken, new MessageRepository());