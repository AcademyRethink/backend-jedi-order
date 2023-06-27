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

const filterLocomotiveByStatus = (statusWanted: string): Knex.QueryBuilder =>
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
    .where("locomotive.status", statusWanted);

export default {
  getAllLocomotivesData,
  filterLocomotiveByStatus,
};
