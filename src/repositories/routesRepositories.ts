import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";

const knexInstance: Knex = knex(config);

const getRouteData = (routeName: string): Knex.QueryBuilder =>
  knexInstance(routeName).select("*");

export default { getRouteData };
