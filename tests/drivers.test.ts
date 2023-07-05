import driversRepositories from "../src/repositories/driversRepositories";
import driversServices from "../src/services/driversServices";
import { DriverType } from "../src/types/driversType";
import { ErrorType } from "../src/types/error";
import { driverMock } from "./mocks";

describe("Drivers tests", () => {
  describe("driversRepositories", () => {
    it("should return all drivers from database", async () => {
      const drivers = await driversRepositories.getAllDrivers();
      expect(drivers.length).toBeGreaterThan(1);
      expect(drivers[0]).toHaveProperty("id");
      expect(drivers[0]).toHaveProperty("driverName");
    });
    it("should return driver with given id", async () => {
      const drivers = await driversRepositories.getDriversById(1);
      expect(drivers[0].id).toBe(1);
    });
  });
  describe("driversServices", () => {
    describe("getAllDriversOfLocomotives", () => {
      it("should return all drivers", async () => {
        jest
          .spyOn(driversRepositories, "getAllDrivers")
          .mockResolvedValueOnce([driverMock, driverMock]);
        const result: DriverType[] =
          await driversServices.getAllDriversOfLocomotives();
        expect(result).toMatchObject([driverMock, driverMock]);
      });
      it("should throw if no drivers were found", async () => {
        jest
          .spyOn(driversRepositories, "getAllDrivers")
          .mockResolvedValueOnce([]);
        try {
          await driversServices.getAllDriversOfLocomotives();
        } catch (error) {
          const myError: ErrorType = error as ErrorType;
          expect(myError.message).toBe("No drivers found");
        }
      });
    });
    describe("getDriversFilterById", () => {
      it("should return driver with given id", async () => {
        jest
          .spyOn(driversRepositories, "getDriversById")
          .mockResolvedValueOnce([driverMock]);
        const result: DriverType = await driversServices.getDriversFilterById(
          1
        );
        expect(result).toMatchObject(driverMock);
        expect(result.id).toBe(1);
      });
      it("should throw if no drivers were found with given id", async () => {
        jest
          .spyOn(driversRepositories, "getDriversById")
          .mockResolvedValueOnce([]);
        try {
          await driversServices.getDriversFilterById(1);
        } catch (error) {
          const myError: ErrorType = error as ErrorType;
          expect(myError.message).toBe(
            "There is no one in the table with that id"
          );
        }
      });
    });
  });
});
