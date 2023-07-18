export type RoutesType = {
  id: number;
  latitude: string;
  longitude: string;
};

export interface LocomotiveRoutePosition
  extends LocomotiveRoutePositionToUpdate {
  status:
    | "Em movimento"
    | "Locomotiva parada"
    | "Em manutenção"
    | "Problema de equipagem";
}

export type LocomotiveRoutePositionToUpdate = {
  id: number;
  locomotive_id: number;
  routeName: "route1" | "route2" | "route3";
  index: number;
  maxIndex: number;
  direction: "up" | "down";
};
