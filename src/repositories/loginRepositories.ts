import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import {LoginRequest, User} from "../types/user"
const knexInstance: Knex = knex(config);

const createUser =  (user: User) => knexInstance("user").insert(user);
const findUser= (user: LoginRequest)=> knexInstance("user").select("*").where({ "user.email": user.email });

export default {
    createUser,
    findUser
}