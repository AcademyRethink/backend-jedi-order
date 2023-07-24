import { jest, describe } from "@jest/globals";
import { routeData } from "./mocks";
import routesRepositories from "../src/repositories/routesRepositories";
import { RoutesType } from "../src/types/routesType";
import { ErrorType } from "../src/types/error";
import routesServices from "../src/services/routesServices";

describe("Routes tests", () => {
  describe("getRouteInfo", () => {
    it("should return all route data stored in DB", async (): Promise<void> => {
      jest
        .spyOn(routesRepositories, "getRouteData")
        .mockResolvedValueOnce([routeData, routeData]);
      const result: RoutesType[] = await routesServices.getRouteInfo("route1");

      expect(result).toMatchObject([routeData, routeData]);
    });
    it("should throw if no data was returned", async (): Promise<void> => {
      jest.spyOn(routesRepositories, "getRouteData").mockResolvedValueOnce([]);

      try {
        await routesServices.getRouteInfo("route1");
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("Route not found");
      }
    });
  });
});
