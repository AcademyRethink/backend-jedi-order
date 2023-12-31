import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { makeError } from "./errorHandler";
import { TokenPayload } from "../types/user";
import loginServices from "../services/loginServices";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken: string | undefined = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;

    if (!userToken)
      throw makeError({ message: "You don't have acess", status: 400 });

    const tokenVerify = jwt.verify(
      userToken,
      process.env.SECRET_TOKEN!
    ) as TokenPayload;

    const hasIdInRoute = "id" in req.params;

    if (!tokenVerify)
      throw makeError({ message: "Invalid Token", status: 400 });

    if (hasIdInRoute) {
      const userIdFromToken = tokenVerify.id;
      const userIdFromRoute = req.params.id;

      if (userIdFromToken !== Number(userIdFromRoute)) {
        throw makeError({ message: "Unauthorized", status: 401 });
      }
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const authTokenAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToken: string | undefined = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;

    if (!userToken)
      throw makeError({ message: "You don't have acess", status: 400 });

    const tokenVerify = jwt.verify(
      userToken,
      process.env.SECRET_TOKEN!
    ) as TokenPayload;

    const hasIdInRoute = "id" in req.params;

    if (!tokenVerify)
      throw makeError({ message: "Invalid Token", status: 401 });

    if (hasIdInRoute) {
      const userIdFromRoute = req.params.id;
      if (
        !tokenVerify.permission &&
        tokenVerify.id !== Number(userIdFromRoute)
      ) {
        throw makeError({ message: "Unauthorized", status: 401 });
      }
    } else if (!tokenVerify.permission) {
      throw makeError({ message: "You don't have access", status: 401 });
    }

    next();
  } catch (error: unknown) {
    next(error);
  }
};

const logoutAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken: string | undefined = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;

    if (!userToken)
      throw makeError({ message: "You don't have acess", status: 400 });

    const tokenVerify = jwt.verify(
      userToken,
      process.env.SECRET_TOKEN!
    ) as TokenPayload;

    if (tokenVerify) {
      tokenVerify.exp = Math.floor(Date.now() / 1000) - 1;
    }
    const tokenInvalido = jwt.sign(tokenVerify, process.env.SECRET_TOKEN!);

    res.status(200).send(tokenInvalido);
  } catch (error: unknown) {
    next(error);
  }
};

export default { authToken, authTokenAdmin, logoutAuth };
