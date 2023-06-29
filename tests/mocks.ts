import { LocomotiveType } from "../src/types/locomotivesType";
import { RoutesType } from "../src/types/routesType";

export const locomotiveData: LocomotiveType = {
  id: 1,
  name: "Locomotiva ZEY39",
  status: "stopped",
  route: "route1",
  load: "iron",
  driverName: "André",
  maneuverer: null,
};

export const routeData: RoutesType = {
  id: 1,
  latitude: "-12.8531",
  longitude: "-38.1615",
};
