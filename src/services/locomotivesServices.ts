import { makeError } from "../middlewares/errorHandler";
import locomotivesRepositories from "../repositories/locomotivesRepositories";
import {
  LocomotivesFilterType,
  LocomotiveType,
} from "../types/locomotivesType";

const getAllLocomotivesInfo = async (): Promise<LocomotiveType[]> => {
  const locomotives: LocomotiveType[] =
    await locomotivesRepositories.getAllLocomotivesData();
  if (!locomotives.length) {
    throw makeError({ message: "No locomotives found!", status: 500 });
  }

  return locomotives;
};

const getFilteredLocomotives = async (
  filterParams: LocomotivesFilterType
): Promise<LocomotiveType[]> => {
  const filters: { [key: string]: string } = {};

  Object.entries(filterParams).forEach(([key, value]) => {
    if (value) {
      const objectKey: string = "locomotive." + key;
      filters[objectKey] = value;
    }
  });

  const locomotivesFiltered: LocomotiveType[] =
    await locomotivesRepositories.filterLocomotive(filters);

  if (!locomotivesFiltered.length) {
    throw makeError({ message: "No locomotives found!", status: 500 });
  }

  return locomotivesFiltered;
};

const getFilteredQuantityOfLocomotiveByStatus = async (): Promise<{
  totalLocomotive: number;
  "Em movimento": number;
  "Locomotiva parada": number;
  "Em manutenção": number;
  "Problema de equipagem": number;
}> => {
  const allLocomotives: LocomotiveType[] =
    await locomotivesRepositories.getAllLocomotivesData();

  if (!allLocomotives.length) {
    throw makeError({ message: "No locomotives found!", status: 500 });
  }

  const countLocomotiveStatus = allLocomotives.reduce(
    (acc, curr) => {
      acc.totalLocomotive = acc.totalLocomotive + 1;
      acc[curr.status]++;
      return acc;
    },
    {
      totalLocomotive: 0,
      "Em movimento": 0,
      "Locomotiva parada": 0,
      "Em manutenção": 0,
      "Problema de equipagem": 0,
    }
  );
  return countLocomotiveStatus;
};

export default {
  getAllLocomotivesInfo,
  getFilteredLocomotives,
  getFilteredQuantityOfLocomotiveByStatus,
};
