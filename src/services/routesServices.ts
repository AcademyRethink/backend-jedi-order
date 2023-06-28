import routesRepositories from "../repositories/routesRepositories";
import { RoutesType } from "../types/routesType";

const getRouteInfo = async (routeName: string): Promise<RoutesType[]> => {
  const route: RoutesType[] = await routesRepositories.getRouteData(routeName);
  if (!route.length) {
    throw new Error("Route not found");
  }

  return route;
};

export default {
  getRouteInfo,
};
