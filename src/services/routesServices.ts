import { makeError } from "../middlewares/errorHandler";
import routesRepositories from "../repositories/routesRepositories";
import { LocomotiveRoutePosition, RoutesType } from "../types/routesType";

const getAllRoutes = async () => {
  const route1: RoutesType[] = await routesRepositories.getRouteData("route1");
  const route2: RoutesType[] = await routesRepositories.getRouteData("route2");
  const route3: RoutesType[] = await routesRepositories.getRouteData("route3");

  const routes = {
    route1: [...route1],
    route2: [...route2],
    route3: [...route3],
  };
  if (!routes) {
    throw makeError({ message: "Route not found", status: 500 });
  }

  return routes;
};

const getRouteInfo = async (routeName: string): Promise<RoutesType[]> => {
  const route: RoutesType[] = await routesRepositories.getRouteData(routeName);
  if (!route.length) {
    throw makeError({ message: "Route not found", status: 500 });
  }

  return route;
};

const getCurrentPosition = async () => {
  const locomotivesPosition: LocomotiveRoutePosition[] =
    await routesRepositories.getCurrentLocomotivesPosition();

  if (!locomotivesPosition.length) {
    throw makeError({
      message: "No locomotives position were found",
      status: 500,
    });
  }

  return locomotivesPosition;
};

export default {
  getAllRoutes,
  getRouteInfo,
  getCurrentPosition,
};
