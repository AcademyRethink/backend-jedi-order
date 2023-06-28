import { Request, Response,NextFunction } from "express";
import loginService from "../services/loginServices";
import {User, LoginRequest} from '../types/user'

const insert = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user : User = req.body;
    const createdUser : User = await loginService.createUser(user);

    res.status(200).send(createdUser);
  } catch (error: unknown) {
    next(error)
  }
};

const login = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
      const user : LoginRequest  = req.body;
      const verifiedUser : string | {message: string; status: number;} | undefined = await loginService.verifyUser(user);
      res.status(200).send(verifiedUser);
    } catch (error: unknown) {
      next(error)
    }
  };

const update = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    res.status(201).send();
  } catch (error: unknown) {
    next(error)
  }
};

export default { insert, update, login };