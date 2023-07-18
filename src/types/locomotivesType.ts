export interface LocomotiveType extends LocomotiveStatusType {
  id?: number;
  name: string;
  driver_id?: number;
  route: string;
  load: string;
  driverName?: string;
  maneuverer: string | null;
}

export type LocomotivesFilterType = {
  status: string | undefined;
  load: string | undefined;
  locomotiveName: string | undefined;
};

export type LocomotiveStatusType = {
  status:
    | "Em movimento"
    | "Locomotiva parada"
    | "Em manutenção"
    | "Problema de equipagem";
};
