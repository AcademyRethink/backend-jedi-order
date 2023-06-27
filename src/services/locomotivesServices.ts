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

export default {
  getAllLocomotivesInfo,
};
