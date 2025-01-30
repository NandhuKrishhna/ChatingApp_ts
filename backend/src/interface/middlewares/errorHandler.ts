import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../../shared/constants/http";
import AppError from "../../shared/utils/appError";

const handleAppError = (res: Response, error: AppError): void => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`Path: ${req.path} , Method: ${req.method} , Error: ${error.message}`);

  if (error instanceof AppError) {
    return handleAppError(res, error); 
  }
  res.status(INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error.message,
  });
};

export default errorHandler;
