import { makeError } from "../middlewares/errorHandler";
import driversRepositories from "../repositories/driversRepositories";
import { DriverType } from "../types/driversType";

const getAllDriversOfLocomotives = async () => {
  const name: DriverType[] = await driversRepositories.getAllDrivers();
  if (!name.length) {
    throw makeError({ message: "No drivers found", status: 500 });
  }
  return name;
};

const getDriversFilterById = async (driverID: number) => {
  const resultDriver: DriverType[] = await driversRepositories.getDriversById(
    driverID
  );
  if (!resultDriver.length)
    throw makeError({
      message: "There is no one in the table with that id",
      status: 500,
    });
  return resultDriver[0];
};

export default {
  getAllDriversOfLocomotives,
  getDriversFilterById,
};
