import { Request, Response,NextFunction } from "express";
import loginService from "../services/loginServices";
import {User, LoginRequest} from '../types/user'
import { ErrorType } from "../types/error";

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
      const verifiedUser : string | ErrorType = await loginService.verifyUser(user);

      res.status(200).send(verifiedUser);
    } catch (error: unknown) {
      next(error)
    }
  };

const update = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const id: string = req.params.id;
    const user: User = req.body;
    
    const patchUser: User = await loginService.patchUser(parseInt(id), user);

    res.status(201).send(patchUser);
  } catch (error: unknown) {
    next(error)
  }
};

export default { insert, update, login };