import { jest, describe } from "@jest/globals";
import { routeData } from "./mocks";
import routesRepositories from "../src/repositories/routesRepositories";
import { RoutesType } from "../src/types/routesType";
import { ErrorType } from "../src/types/error";

describe("Routes tests", () => {
  describe("getRouteInfo", () => {
    it("should return all route data stored in DB", async (): Promise<void> => {
      jest
        .spyOn(routesRepositories, "getRouteData")
        .mockResolvedValueOnce([routeData, routeData]);
      const result: RoutesType[] = await routesRepositories.getRouteData(
        "route1"
      );

      expect(result).toMatchObject([routeData, routeData]);
    });
    it("should throw if no data was returned", async (): Promise<void> => {
      jest.spyOn(routesRepositories, "getRouteData").mockResolvedValueOnce([]);

      try {
        await routesRepositories.getRouteData("route1");
      } catch (error) {
        const myError: ErrorType = error as ErrorType;
        expect(myError.message).toBe("Route not found");
      }
    });
  });
});
