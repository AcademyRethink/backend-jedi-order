import driversRepositories from "../repositories/driversRepositories";
import { DriverType } from "../types/driversType";

const getAllDriversOfLocomotives = async () => {
  const name: DriverType[] = await driversRepositories.getAllDrivers();
  return name;
};

const getDriversFilterById = async (driverID: number) => {
  const resultDriver: DriverType[] = await driversRepositories.getDriversById(
    driverID
  );
  if (resultDriver.length == 0)
    throw new Error("There is no one in the table with that id");
  return resultDriver;
};

export default {
  getAllDriversOfLocomotives,
  getDriversFilterById,
};
