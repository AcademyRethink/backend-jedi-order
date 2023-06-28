import locomotivesRepositories from "../repositories/locomotivesRepositories";
import { LocomotiveType } from "../types/locomotivesType";

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

const getFilteredQuantityOfLocomotiveByStatus = async () => {
  const locomotiveStatus: LocomotiveType[] =
    await locomotivesRepositories.getAllLocomotivesData();
  const countLocomotiveStatus = locomotiveStatus.reduce(
    (acc, curr) => {
      acc.totalLocomotive = acc.totalLocomotive + 1;
      if (curr.status === "locomotive under maintenance")
        acc.underMaintenance = acc.underMaintenance + 1;
      if (curr.status === "moving locomotive") acc.moving = acc.moving + 1;
      if (curr.status === "stopped locomotive") acc.stopped = acc.stopped + 1;
      return acc;
    },
    { totalLocomotive: 0, underMaintenance: 0, moving: 0, stopped: 0 }
  );
  return countLocomotiveStatus;
};

export default {
  getAllLocomotivesInfo,
  getFilteredLocomotivesByStatus,
  getFilteredQuantityOfLocomotiveByStatus,
};
