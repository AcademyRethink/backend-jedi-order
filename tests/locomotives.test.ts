import { jest, describe } from "@jest/globals";
import { errorMock, locomotiveData, locomotiveStatusCountData } from "./mocks";
import locomotivesRepositories from "../src/repositories/locomotivesRepositories";
import locomotivesServices from "../src/services/locomotivesServices";
import { LocomotiveType } from "../src/types/locomotivesType";
import { ErrorType } from "../src/types/error";
import locomotivesController from "../src/controllers/locomotivesController";
import { Request, Response, NextFunction } from "express";

describe("Locomotives tests", () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Controller
  describe("show", () => {
    it("should return status 200 and correct response", async (): Promise<void> => {
      jest
        .spyOn(locomotivesServices, "getAllLocomotivesInfo")
        .mockResolvedValueOnce([locomotiveData]);

      await locomotivesController.show(req, res, next);

      expect(locomotivesServices.getAllLocomotivesInfo).toHaveBeenCalledTimes(
        1
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([locomotiveData]);
      expect(next).not.toHaveBeenCalled();
    });
    it("Should call next function if error occurs", async (): Promise<void> => {
      jest
        .spyOn(locomotivesServices, "getAllLocomotivesInfo")
        .mockRejectedValueOnce(errorMock);

      await locomotivesController.show(req, res, next);

      expect(next).toHaveBeenCalledWith(errorMock);
    });
  });
  describe("filterLocomotives", () => {
    it("should return status 200 and correct response", async (): Promise<void> => {
      jest
        .spyOn(locomotivesServices, "getFilteredLocomotives")
        .mockResolvedValueOnce([locomotiveData, locomotiveData]);

      await locomotivesController.filterLocomotives(req, res, next);

      expect(locomotivesServices.getFilteredLocomotives).toHaveBeenCalledTimes(
        1
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([locomotiveData, locomotiveData]);
      expect(next).not.toHaveBeenCalled();
    });
    it("Should call next function if error occurs", async (): Promise<void> => {
      jest
        .spyOn(locomotivesServices, "getFilteredLocomotives")
        .mockRejectedValueOnce(errorMock);

      await locomotivesController.filterLocomotives(req, res, next);

      expect(next).toHaveBeenCalledWith(errorMock);
    });
  });

  describe("quantityOfLocomotiveBystatus", () => {
    it("should return status 200 and correct response", async (): Promise<void> => {
      jest
        .spyOn(locomotivesServices, "getFilteredQuantityOfLocomotiveByStatus")
        .mockResolvedValueOnce(locomotiveStatusCountData);

      await locomotivesController.quantityOfLocomotiveBystatus(req, res, next);

      expect(
        locomotivesServices.getFilteredQuantityOfLocomotiveByStatus
      ).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(locomotiveStatusCountData);
      expect(next).not.toHaveBeenCalled();
    });
    it("Should call next function if error occurs", async (): Promise<void> => {
      jest
        .spyOn(locomotivesServices, "getFilteredQuantityOfLocomotiveByStatus")
        .mockRejectedValueOnce(errorMock);

      await locomotivesController.quantityOfLocomotiveBystatus(req, res, next);

      expect(next).toHaveBeenCalledWith(errorMock);
    });
  });

  //Services
  describe("getAllLocomotivesInfo", () => {
    it("should return all locomotives stored in DB", async (): Promise<void> => {
      jest
        .spyOn(locomotivesRepositories, "getAllLocomotivesData")
        .mockResolvedValueOnce([locomotiveData, locomotiveData]);
      const result: LocomotiveType[] =
        await locomotivesServices.getAllLocomotivesInfo();

      expect(result).toMatchObject([locomotiveData, locomotiveData]);
    });
    it("should throw an error if no locomotives were found", async (): Promise<void> => {
      jest
        .spyOn(locomotivesRepositories, "getAllLocomotivesData")
        .mockResolvedValueOnce([]);
      try {
        await locomotivesServices.getAllLocomotivesInfo();
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("No locomotives found!");
      }
    });
  });
  describe("getFilteredLocomotives", () => {
    it("should return all locomotives with the status given by query", async (): Promise<void> => {
      jest
        .spyOn(locomotivesRepositories, "filterLocomotive")
        .mockResolvedValueOnce([locomotiveData, locomotiveData]);
      const result: LocomotiveType[] =
        await locomotivesServices.getFilteredLocomotives({
          status: "stopped",
          load: "iron",
          locomotiveName: "Locomotiva ZEY39",
        });

      expect(result).toMatchObject([locomotiveData, locomotiveData]);
    });
    it("should throw an error if no locomotives with given status were found", async (): Promise<void> => {
      jest
        .spyOn(locomotivesRepositories, "filterLocomotive")
        .mockResolvedValueOnce([]);
      try {
        await locomotivesServices.getFilteredLocomotives({
          status: "running",
          load: "coal",
          locomotiveName: "Locomotiva ZEY31",
        });
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("No locomotives found!");
      }
    });
  });
  describe("getFilteredQuantityOfLocomotiveByStatus", () => {
    it("should return all locomotives status count", async (): Promise<void> => {
      jest
        .spyOn(locomotivesRepositories, "getAllLocomotivesData")
        .mockResolvedValueOnce([locomotiveData, locomotiveData]);
      const result =
        await locomotivesServices.getFilteredQuantityOfLocomotiveByStatus();

      expect(result).toMatchObject(locomotiveStatusCountData);
    });
    it("should throw if no locomotives were found", async (): Promise<void> => {
      jest
        .spyOn(locomotivesRepositories, "getAllLocomotivesData")
        .mockResolvedValueOnce([]);

      try {
        await locomotivesServices.getFilteredQuantityOfLocomotiveByStatus();
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("No locomotives found!");
      }
    });
    describe("getFilteredQuantityOfLocomotiveByStatus", () => {
      it("should return an object counting all locomotive status", async (): Promise<void> => {
        jest
          .spyOn(locomotivesRepositories, "getAllLocomotivesData")
          .mockResolvedValueOnce([locomotiveData, locomotiveData]);
        const result =
          await locomotivesServices.getFilteredQuantityOfLocomotiveByStatus();

        expect(result).toMatchObject(locomotiveStatusCountData);
      });
    });
  });
});
