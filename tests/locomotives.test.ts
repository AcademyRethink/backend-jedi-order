import { jest, describe } from "@jest/globals";
import { locomotiveData } from "./mocks";
import locomotivesRepositories from "../src/repositories/locomotivesRepositories";
import locomotivesServices from "../src/services/locomotivesServices";
import { LocomotiveType } from "../src/types/locomotivesType";

describe("Locomotives tests", () => {
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
      } catch (error: any) {
        expect(error.message).toBe("Locomotives not found");
      }
    });
  });
  describe("getFilteredLocomotivesByStatus", () => {
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
      } catch (error: any) {
        expect(error.message).toBe("No locomotives found");
      }
    });
  });

  describe("getFilteredQuantityOfLocomotiveByStatus", () => {
    it("should return the total number of locomotives ", async (): Promise<void> => {});
  });

  describe("getFilteredQuantityOfLocomotiveByStatus", () => {
    it("should return the count of locomotives by status", async () => {
      // Mock da função getAllLocomotivesData para retornar dados fictícios
      const mockData = [
        { id: 1, status: "locomotive under maintenance" },
        { id: 2, status: "moving locomotive" },
        { id: 3, status: "stopped locomotive" },
        { id: 4, status: "moving locomotive" },
        { id: 5, status: "locomotive under maintenance" },
      ];
      jest
        .spyOn(locomotivesRepositories, "getAllLocomotivesData")
        .mockResolvedValue(mockData);

      const expectedCount = {
        totalLocomotive: 5,
        underMaintenance: 2,
        moving: 2,
        stopped: 1,
      };

      const result =
        await locomotivesServices.getFilteredQuantityOfLocomotiveByStatus();

      expect(result).toEqual(expectedCount);
      expect(locomotivesRepositories.getAllLocomotivesData).toHaveBeenCalled();
    });
  });
});
