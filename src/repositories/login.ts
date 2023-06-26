import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import {User} from "../types/user"
const knexInstance: Knex = knex(config);

const createUser =  (user:User) => knexInstance("user").insert(user);

export default {
    createUser,
}