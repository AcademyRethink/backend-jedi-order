import { NextFunction, Request, Response } from "express";
import { object, string, number, bool } from "yup";
import { makeError  } from "./errorHandler"

const userInsertValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;

    const userSchema = object({
        name: string().required("User name is required"), 
        email: string().email().required("User email is required"),
        password: string().required("User password is required"),
        permission: bool(),
        image: string(),
        active: bool()
    });
    await userSchema.validate(userData, {strict:true});
    next();
  } catch (error) {
    next(error);
  }
};

const userPatchValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;
      const userId = Number(req.params.id);

      if (isNaN(userId) || !Number.isInteger(userId) || userId <= 0) 
       throw makeError({ message: "Invalid user id", status: 400 });
  
      const userSchema = object({
        name: string(), 
        email: string(),
        password: string(),
        permission: bool(),
        image: string(),
        active: bool()
      });
      await userSchema.validate(userData, {strict:true});
      next();
    } catch (error) {
      next(error);
    }
};

const userIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId) || !Number.isInteger(userId) || userId <= 0) 
     throw makeError({ message: "Invalid user id", status: 400 });

    next();
  } catch (error) {
    next(error);
  }
};


export default {
    userInsertValidator,
    userPatchValidator,
    userIdValidator
}