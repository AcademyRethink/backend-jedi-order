import bcrypt from "bcrypt"
import {User,LoginRequest} from "../types/user"
import jwt from "jsonwebtoken"
import loginRepository from "../repositories/login";
import { makeError  } from "../middlewares/errorHandler"
  
const createUser = async (user: User) => {
    const saltRounds = process.env.SALT!
    const hash = await bcrypt.hash(user.password, Number(saltRounds));
    const userWithEncryptedPassword = { ...user, password: hash };

    const createUser = await loginRepository.createUser(userWithEncryptedPassword);
    return {id: createUser[0], ...userWithEncryptedPassword}  
};

const verifyUser = async (user:LoginRequest) => {
  try {
    const userExists = await loginRepository.findUser(user);
    if (!userExists) throw makeError({ message: "User doesn't exists", status: 400 });
    
    const userLogin = userExists[0];
    const verifyPassword = await bcrypt.compare(user.password, userLogin.password); 

    if(verifyPassword) return await createToken(userLogin); //retorna o que a função createToken retorna
    return ({ message: "Incorrect password", status: 400 });
  
  } catch (error:any) {
    ({ message: error.message, status:error.status });
  }
};
  
const createToken =async (user:User) => {
  const token = jwt.sign(
    {
      id: user.id,
      permission: user.permission //para validar se o usuário tem permissão 
    },
    process.env.SECRET_TOKEN!,
    { expiresIn: "30 days" }
    );

    return token;
}
  

export default {
    createUser,
    verifyUser
}