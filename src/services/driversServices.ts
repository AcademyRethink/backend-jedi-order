import driversRepositories from "../repositories/driversRepositories";
import { DriverType } from "../types/driversType";

const getAllDriversOfLocomotives = async () => {
  const name: DriverType[] = await driversRepositories.getAllDrivers();
  if (!name.length) {
    throw new Error("No drivers found");
  }
  return name;
};

const getDriversFilterById = async (driverID: number) => {
  const resultDriver: DriverType[] = await driversRepositories.getDriversById(
    driverID
  );
  if (!resultDriver.length)
    throw new Error("There is no one in the table with that id");
  return resultDriver;
};

export default {
  getAllDriversOfLocomotives,
  getDriversFilterById,
};
