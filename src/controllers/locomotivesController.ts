import { NextFunction, Request, Response } from "express";
import locomotivesServices from "../services/locomotivesServices";
import {
  LocomotivesFilterType,
  LocomotiveType,
} from "../types/locomotivesType";

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
    const filterParams: LocomotivesFilterType =
      req.query as LocomotivesFilterType;

    const locomotivesFiltered =
      await locomotivesServices.getFilteredLocomotives(filterParams);

    res.status(200).send(locomotivesFiltered);
  } catch (error) {
    next(error);
  }
};

const quantityOfLocomotiveBystatus = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locomotiveStatus =
      await locomotivesServices.getFilteredQuantityOfLocomotiveByStatus();
    res.status(200).json(locomotiveStatus);
  } catch (error) {
    next(error);
  }
};

export default { show, filterStatus, quantityOfLocomotiveBystatus };
