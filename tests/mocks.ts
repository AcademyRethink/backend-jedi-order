import { LocomotiveType } from "../src/types/locomotivesType";
import { RoutesType } from "../src/types/routesType";
import { LoginRequest, User } from "../src/types/user";

export const locomotiveData: LocomotiveType = {
  id: 1,
  name: "Locomotiva ZEY39",
  status: "stopped",
  route: "route1",
  load: "iron",
  driverName: "André",
  maneuverer: null,
};

export const locomotiveStatusCountData = {
  totalLocomotive: 2,
  underMaintenance: 0,
  moving: 0,
  stopped: 2,
};

export const routeData: RoutesType = {
  id: 1,
  latitude: "-12.8531",
  longitude: "-38.1615",
};

export const mockReports = [
  {
    id: 1,
    subject: "Report 1",
    created_by_id: 1,
    created_at: "2023-06-26T18:03:32.909Z",
    driver_id: 1,
    location: "Location 1",
    description: "Description 1",
    locomotive_id: 1,
    is_stopped: true,
    reason_stopped: "Reason 1",
    is_communication_failed: false,
  },
];

export const mockNewReport = {
  subject: "Report 2",
  created_by_id: 2,
  driver_id: 2,
  location: "Location 2",
  description: "Description 2",
  locomotive_id: 2,
  is_stopped: false,
  reason_stopped: "Reason 2",
  is_communication_failed: true,
};

export const mockReportFormated = {
  id: 3,
  subject: "lsidasoidhsaiusahiudas",
  created_by_id: null,
  created_at: "2023-06-29T17:37:36.775Z",
  driver_id: 3,
  location: "lalla",
  description: "lalala",
  locomotive_id: 9,
  is_stopped: false,
  reason_stopped: "lalala",
  is_communication_failed: true,
  date: "29/06/2023",
  time: "14:37:36",
};

export const createdUserData: User = {
  id: 1,
  name: "Andre",
  email: "andre@email.com",
  password: "usanfuqwnfiq",
  permission: true,
  active: true,
  image: undefined,
  date_created: new Date(),
  date_updated: new Date(),
};

export const loginData: LoginRequest = {
  email: "andre@email.com",
  password: "usanfuqwnfiq",
};

export const userData = {
  name: "Andre",
  email: "andre@email.com",
  password: "usanfuqwnfiq",
  permission: true,
  active: true,
  image: undefined,
};

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRyZUBlbWFpbC5jb20iLCJwZXJtaXNzaW9uIjp0cnVlfQ.IorlY9xDaQh5khqxlbrwgPetcU2JlSAZawkzEOE74DE";
