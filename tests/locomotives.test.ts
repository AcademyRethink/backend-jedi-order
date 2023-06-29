import { jest, describe } from "@jest/globals";
import { locomotiveData } from "./mocks";
import locomotivesRepositories from "../src/repositories/locomotivesRepositories";
import locomotivesServices from "../src/services/locomotivesServices";
import { LocomotiveType } from "../src/types/locomotivesType";
import { ErrorType } from "../src/types/error";

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
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("Locomotives not found");
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
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("No locomotives found");
      }
    });
  });
});
