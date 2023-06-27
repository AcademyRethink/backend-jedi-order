import { jest, describe } from "@jest/globals";
import { locomotiveData } from "./mocks";
import locomotivesRepositories from "../src/repositories/locomotivesRepositories";
import locomotivesServices from "../src/services/locomotivesServices";
import { LocomotiveType } from "../src/types";

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
        expect(error.message).toBe("Locomotives not found");
      }
    });
  });
});
