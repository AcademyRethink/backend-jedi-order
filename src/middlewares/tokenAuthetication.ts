import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { makeError  } from "./errorHandler"
import { TokenPayload } from "../types/user";

const authToken =async (req: Request, res: Response,next:NextFunction) => {
    try{
        const userToken: string = req.headers.authorization?.split(" ")[1]!;
        const tokenVerify = jwt.verify(userToken, process.env.SECRET_TOKEN!) as TokenPayload;

        if(!tokenVerify){
           throw makeError({ message: "Invalid Token", status: 400 });
        }else if(!tokenVerify.permission){ 
            throw makeError({ message: "Invalid Acess", status: 400 });
        }next();
        
    }catch(error:any){
        next(error);
    }
}

export default {authToken}