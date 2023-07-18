import { Request, Response, NextFunction } from "express";
import driversRepositories from "../src/repositories/driversRepositories";
import driversServices from "../src/services/driversServices";
import { DriverType } from "../src/types/driversType";
import { ErrorType } from "../src/types/error";
import { driverMock, errorMock } from "./mocks";
import driversController from "../src/controllers/driversController";

describe("Drivers tests", () => {
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
  describe("driversController", () => {
    const req = { params: {} } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    beforeEach(() => {
      jest.clearAllMocks();
    });
    describe("index", () => {
      it("should return status 200 and correct response", async (): Promise<void> => {
        jest
          .spyOn(driversServices, "getAllDriversOfLocomotives")
          .mockResolvedValueOnce([driverMock, driverMock]);

        await driversController.index(req, res, next);

        expect(
          driversServices.getAllDriversOfLocomotives
        ).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([driverMock, driverMock]);
        expect(next).not.toHaveBeenCalled();
      });
      it("Should call next function if error occurs", async (): Promise<void> => {
        jest
          .spyOn(driversServices, "getAllDriversOfLocomotives")
          .mockRejectedValueOnce(errorMock);

        await driversController.index(req, res, next);

        expect(next).toHaveBeenCalledWith(errorMock);
      });
    });
    describe("show", () => {
      it("should return status 200 and correct response", async (): Promise<void> => {
        jest
          .spyOn(driversServices, "getDriversFilterById")
          .mockResolvedValueOnce(driverMock);

        await driversController.show(req, res, next);

        expect(driversServices.getDriversFilterById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(driverMock);
        expect(next).not.toHaveBeenCalled();
      });
    });
  });
});
