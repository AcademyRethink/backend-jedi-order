import knex, { Knex } from "knex";
import config from "./knexfile";
import {
  beloHorizonteToPortoBarraDoRiacho,
  beloHorizonteToPortoTubarao,
  beloHorizonteToSalvador,
  communicationReportData,
  driverData,
  failureTypesData,
  locomotivesData,
  userData,
  locomotivePositionData,
} from "./seedData";

const knexInstance: Knex = knex(config);

const fillUserTable = async () => {
  for (const user of userData) {
    await knexInstance("user").insert(user);
  }
};
setTimeout(fillUserTable, 5000);

const fillDriverTable = async () => {
  for (const driver of driverData) {
    await knexInstance("driver").insert(driver);
  }
};
setTimeout(fillDriverTable, 15000);

const fillFailureTypesTable = async () => {
  for (const failure of failureTypesData) {
    await knexInstance("failure_types").insert(failure);
  }
};
setTimeout(fillFailureTypesTable, 25000);

const fillLocomotiveTable = async () => {
  for (const locomotive of locomotivesData) {
    await knexInstance("locomotive").insert(locomotive);
  }
};
setTimeout(fillLocomotiveTable, 30000);

const fillComunicattionReportTable = async () => {
  for (const report of communicationReportData) {
    await knexInstance("communication_report").insert(report);
  }
};
setTimeout(fillComunicattionReportTable, 45000);

const fillLocomotivePositionTable = async () => {
  for (const locomotivePosition of locomotivePositionData) {
    await knexInstance("locomotivePosition").insert(locomotivePosition);
  }
};
setTimeout(fillLocomotivePositionTable, 55000);

const fillRoute1Data = async () => {
  for (const location of beloHorizonteToPortoTubarao) {
    await knexInstance("route1").insert({
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    });
  }
};
setTimeout(fillRoute1Data, 60000);

const fillRoute2Data = async () => {
  for (const location of beloHorizonteToPortoBarraDoRiacho) {
    await knexInstance("route2").insert({
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    });
  }
};
setTimeout(fillRoute2Data, 65000);

const fillRoute3Data = async () => {
  for (const location of beloHorizonteToSalvador) {
    await knexInstance("route3").insert({
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    });
  }
};
setTimeout(fillRoute3Data, 70000);
