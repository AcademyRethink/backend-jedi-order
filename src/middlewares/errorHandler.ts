import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../types/error";

export const errorHandler = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status:number = error.status ? error.status : 500;
  const errorResponse : {message:string,stack: string| undefined} = {
    message: error.message ? error.message : "internal server error",
    stack: error.stack,
  };
  res.status(status).json(errorResponse);
};

export const makeError = ({ message, status }: ErrorType) => {
  return {
    message,
    status,
  };
};