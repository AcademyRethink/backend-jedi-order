import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import { User } from "../types/user";
const knexInstance: Knex = knex(config);

const createUser = (user: User) =>
  knexInstance("user").insert(user).returning("*");
const findUserByEmail = (email: string) =>
  knexInstance("user").select("*").where({ "user.email": email });
const updateUser = (user: User, id: number) =>
  knexInstance("user").update(user).where({ id }).returning("*");
const getUserById = (id: number) =>
  knexInstance("user")
    .select("name", "email", "password", "active")
    .where({ id });

export default {
  createUser,
  findUserByEmail,
  updateUser,
  getUserById,
};
