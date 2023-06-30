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
  if (!resultDriver.length)
    throw new Error("There is no one in the table with that id");
  return resultDriver;
};
getDriversFilterById(1)
  .then((locomotive) => {
    //locomotive: tabela q eu quero consultar
    console.log("Reports:", locomotive);
  })
  .catch((error) => {
    console.error("Error fetching reports:", error);
  });

export default {
  getAllDriversOfLocomotives,
  getDriversFilterById,
};
