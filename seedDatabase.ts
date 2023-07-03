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
} from "./seedData";

const knexInstance: Knex = knex(config);

const fillUserTable = async () => {
  for (const user of userData) {
    await knexInstance("user").insert(user);
  }
};
fillUserTable();

const fillDriverTable = async () => {
  for (const driver of driverData) {
    await knexInstance("driver").insert(driver);
  }
};
fillDriverTable();

const fillRoute1Data = async () => {
  for (const location of beloHorizonteToPortoTubarao) {
    await knexInstance("route1").insert({
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    });
  }
};
fillRoute1Data();

const fillRoute2Data = async () => {
  for (const location of beloHorizonteToPortoBarraDoRiacho) {
    await knexInstance("route2").insert({
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    });
  }
};
fillRoute2Data();

const fillRoute3Data = async () => {
  for (const location of beloHorizonteToSalvador) {
    await knexInstance("route3").insert({
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    });
  }
};
fillRoute3Data();

const fillFailureTypesTable = async () => {
  for (const failure of failureTypesData) {
    await knexInstance("failure_types").insert(failure);
  }
};
fillFailureTypesTable();

const fillLocomotiveTable = async () => {
  for (const locomotive of locomotivesData) {
    await knexInstance("locomotive").insert(locomotive);
  }
};
fillLocomotiveTable();

const fillComunicattionReportTable = async () => {
  for (const report of communicationReportData) {
    await knexInstance("communication_report").insert(report);
  }
};
fillComunicattionReportTable();
