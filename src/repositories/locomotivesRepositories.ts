import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";

const knexInstance: Knex = knex(config);

const getAllLocomotivesData = (): Knex.QueryBuilder =>
  knexInstance("locomotive")
    .select(
      "locomotive.id",
      "locomotive.name",
      "locomotive.status",
      "locomotive.route",
      "locomotive.load",
      "driver.name as driverName",
      "locomotive.maneuverer"
    )
    .join("driver", "driver.id", "=", "locomotive.driver_id");

const filterLocomotive = (filterParams: {
  [key: string]: string;
}): Knex.QueryBuilder =>
  knexInstance("locomotive")
    .select(
      "locomotive.id",
      "locomotive.name",
      "locomotive.status",
      "locomotive.route",
      "locomotive.load",
      "driver.name as driverName",
      "locomotive.maneuverer"
    )
    .join("driver", "driver.id", "=", "locomotive.driver_id")
    .where({ ...filterParams });

export default {
  getAllLocomotivesData,
  filterLocomotive,
};
