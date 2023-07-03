import bcrypt from "bcrypt"
import {User,LoginRequest, MyAccount} from "../types/user"
import jwt from "jsonwebtoken"
import loginRepository from "../repositories/loginRepositories";
import { makeError  } from "../middlewares/errorHandler"
import { ErrorType } from "../types/error";
  
const createUser = async (user: User) => {
    const saltRounds = process.env.SALT!
    const hash = await bcrypt.hash(user.password, Number(saltRounds));
    const userWithEncryptedPassword: User = { ...user, password: hash };

    const createUser: User[] = await loginRepository.createUser(userWithEncryptedPassword);
    return createUser[0];
};

const verifyUser = async (user:LoginRequest) => {
  try {
    const userExists = await loginRepository.findUser(user);
    if (!userExists.length) throw makeError({ message: "User doesn't exists", status: 400 });
    
    const userLogin: User = userExists[0];
    const verifyPassword: boolean = await bcrypt.compare(user.password, userLogin.password); 

    if(verifyPassword){
      if(userLogin.active) return await createToken(userLogin); //retorna o que a função createToken retorna
      throw makeError({ message: "User not active", status: 400 });
    }
    throw makeError({ message: "Incorrect password", status: 400 });
  
  } catch(error) {
    const myError: ErrorType = error as ErrorType;
    return {message: myError.message, status: myError.status}
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

const patchUser = async (id: number, user: User) => {
  const userWithEncryptedPassword: User = {...user}
  
  if(user.password){
    const saltRounds = process.env.SALT!
    const hash = await bcrypt.hash(user.password, Number(saltRounds));
    userWithEncryptedPassword.password = hash;
  } 

  const updatedUser: User[] = await loginRepository.updateUser({...userWithEncryptedPassword,},id);

  if(!updatedUser.length) throw makeError({ message: "User not found", status: 400 })
  return updatedUser[0];
};

const getUserById = async (id: number) => {
  const user: MyAccount[] = await loginRepository.getUserById(id);

  if(!user.length) throw makeError({ message: "User not found", status: 400 })
  return user[0];
};

export default {
    createUser,
    verifyUser,
    patchUser,
    createToken,
    getUserById
}