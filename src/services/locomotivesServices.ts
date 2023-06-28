import locomotivesRepositories from "../repositories/locomotivesRepositories";
import { LocomotiveType } from "../types";

const getAllLocomotivesInfo = async (): Promise<LocomotiveType[]> => {
  const locomotives: LocomotiveType[] =
    await locomotivesRepositories.getAllLocomotivesData();
  if (!locomotives.length) {
    throw new Error("Locomotives not found");
  }

  return locomotives;
};

const getFilteredLocomotivesByStatus = async (
  statusWanted: string
): Promise<LocomotiveType[]> => {
  const locomotivesFiltered: LocomotiveType[] =
    await locomotivesRepositories.filterLocomotiveByStatus(statusWanted);
  if (!locomotivesFiltered.length) {
    throw new Error("No locomotives found with given status");
  }

  return locomotivesFiltered;
};

export default {
  getAllLocomotivesInfo,
  getFilteredLocomotivesByStatus,
};
