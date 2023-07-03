import { jest, describe } from "@jest/globals";
import driversRepositories from "../src/repositories/driversRepositories";
import { driverData } from "./mocks";

describe("driversRepositories", () => {
  it("should return all drivers", async () => {
    const getAllDriversSpy = jest
      .spyOn(driversRepositories, "getAllDrivers")
      .mockResolvedValueOnce(driverData);

    const result = await driversRepositories.getAllDrivers();

    expect(result).toEqual(driverData);
    expect(getAllDriversSpy).toHaveBeenCalled();

    getAllDriversSpy.mockRestore();
  });

  it("should return the driver with the specified ID", async () => {
    const driverID = 1;
    const getDriversByIdSpy = jest
      .spyOn(driversRepositories, "getDriversById")
      .mockResolvedValueOnce(driverData);

    const result = await driversRepositories.getDriversById(driverID);

    expect(result).toEqual(driverData);
    expect(getDriversByIdSpy).toHaveBeenCalledWith(driverID);

    getDriversByIdSpy.mockRestore();
  });

  it("should return an empty array if no driver with the specified ID is found", async () => {
    const driverID = 999;
    const getDriversByIdSpy = jest
      .spyOn(driversRepositories, "getDriversById")
      .mockResolvedValueOnce(driverData);

    const result = await driversRepositories.getDriversById(driverID);

    expect(result).toEqual(driverData);
    expect(getDriversByIdSpy).toHaveBeenCalledWith(driverID);

    getDriversByIdSpy.mockRestore();
  });
});
