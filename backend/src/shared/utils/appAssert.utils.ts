
import AppErrorCode from "../constants/appErrorCode";
import { HttpStatusCode } from "../constants/http";
import assert from "node:assert";
import AppError from "./appError";

type AppAssert =(
    condiion:any,
    httpsStatusCode : HttpStatusCode,
    message : string,
    appErrorCode? : AppErrorCode
) => asserts  condiion;


const appAssert : AppAssert = (
    condiion ,
    httpsStatusCode,
    message ,
    appErrorCode
)=> assert(condiion , new AppError(httpsStatusCode, message, appErrorCode));

export default appAssert;