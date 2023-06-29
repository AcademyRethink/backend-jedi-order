export type LocomotiveType = {
  id: number;
  name: string;
  status: string;
  route: string;
  load: string;
  driverName: string;
  maneuverer: string | null;
};

export type LocomotivesFilterType = {
  status: string | undefined;
  load: string | undefined;
  locomotiveName: string | undefined;
};
