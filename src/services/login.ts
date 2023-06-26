import bcrypt from "bcrypt"
import {User,LoginRequest} from "../types/user"
import jwt from "jsonwebtoken"
import loginRepository from "../repositories/login";
  
const createUser = async (user: User) => {
    const saltRounds = process.env.SALT!
    const hash = await bcrypt.hash(user.password, Number(saltRounds));
    const userWithEncryptedPassword = { ...user, password: hash };

    const createUser = await loginRepository.createUser(userWithEncryptedPassword);
    return {id: createUser[0], ...userWithEncryptedPassword}  
};

export default {
    createUser,
}