import knex from "knex";
import config from "../../knexfile";

export type Driver = {
  id?: number;
  name: string;
};

const knexInstance = knex(config);
