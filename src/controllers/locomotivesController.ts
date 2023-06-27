import { NextFunction, Request, Response } from "express";
import locomotivesServices from "../services/locomotivesServices";
import { LocomotiveType } from "../types/index";

const show = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const locomotives: LocomotiveType[] =
      await locomotivesServices.getAllLocomotivesInfo();

    res.status(200).send(locomotives);
  } catch (error) {
    next(error);
  }
};

const filterStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const statusWanted: string = req.query.status as string;

    const locomotivesFiltered: LocomotiveType[] =
      await locomotivesServices.getFilteredLocomotivesByStatus(statusWanted);

    res.status(200).send(locomotivesFiltered);
  } catch (error) {
    next(error);
  }
};

export default { show, filterStatus };
