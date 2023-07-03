import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";

const knexInstance: Knex = knex(config);

const getAllDrivers = (): Knex.QueryBuilder =>
  knexInstance("driver").select("driver.id", "driver.name as driverName");

const getDriversById = (driverID: number): Knex.QueryBuilder =>
  knexInstance("driver")
    .select("driver.id", "driver.name as driverName")
    .where("driver.id", "=", driverID);

export default {
  getAllDrivers,
  getDriversById,
};
