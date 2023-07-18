export interface LocomotiveType {
  id?: number;
  name: string;
  driver_id?: number;
  status:
    | "Em movimento"
    | "Locomotiva parada"
    | "Em manutenção"
    | "Problema de equipagem";
  route: "route1" | "route2" | "route3";
  load: string;
  driverName?: string;
  maneuverer: string | null;
}

export type LocomotivesFilterType = {
  status: string | undefined;
  load: string | undefined;
  locomotiveName: string | undefined;
};
