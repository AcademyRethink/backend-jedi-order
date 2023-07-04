import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import {LoginRequest, User} from "../types/user"
const knexInstance: Knex = knex(config);

const createUser =  (user: User) => knexInstance("user").insert(user).returning("*");
const findUser= (user: LoginRequest)=> knexInstance("user").select("*").where({ "user.email": user.email });
const updateUser = (user:User, id:number) => knexInstance("user").update(user).where({id}).returning("*");
const getUserById = (id:number) => knexInstance("user").select("name", "email", "password", "active").where({id})

export default {
    createUser,
    findUser,
    updateUser,
    getUserById
}