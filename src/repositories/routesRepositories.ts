import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";

const knexInstance: Knex = knex(config);

const getRouteData = (routeName: string): Knex.QueryBuilder =>
  knexInstance(routeName).select("*");

const getCurrentLocomotivesPosition = (): Knex.QueryBuilder =>
  knexInstance("locomotivePosition")
    .select(
      "locomotivePosition.id as id",
      "locomotive.status as status",
      "routeName",
      "index",
      "maxIndex",
      "direction"
    )
    .join(
      "locomotive",
      "locomotive.id",
      "=",
      "locomotivePosition.locomotive_id"
    );

export default { getRouteData, getCurrentLocomotivesPosition };
