import locomotivesRepositories from "../repositories/locomotivesRepositories";
import {
  LocomotivesFilterType,
  LocomotiveType,
} from "../types/locomotivesType";

const getAllLocomotivesInfo = async (): Promise<LocomotiveType[]> => {
  const locomotives: LocomotiveType[] =
    await locomotivesRepositories.getAllLocomotivesData();
  if (!locomotives.length) {
    throw new Error("Locomotives not found");
  }

  return locomotives;
};

const getFilteredLocomotives = async (filterParams: LocomotivesFilterType) => {
  const filters: { [key: string]: string } = {};

  Object.entries(filterParams).forEach(([key, value]) => {
    if (value) {
      const objectKey = "locomotive." + key;
      filters[objectKey] = value;
    }
  });

  const locomotivesFiltered: LocomotiveType[] =
    await locomotivesRepositories.filterLocomotive(filters);

  if (!locomotivesFiltered.length) {
    throw new Error("No locomotives found");
  }

  return locomotivesFiltered;
};

export default {
  getAllLocomotivesInfo,
  getFilteredLocomotives,
};
