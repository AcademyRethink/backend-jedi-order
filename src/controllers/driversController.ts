import { NextFunction, Request, Response } from "express";
import driversServices from "../services/driversServices";
import { DriverType } from "../types/driversType";

const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const drivers: DriverType[] =
      await driversServices.getAllDriversOfLocomotives();

    res.status(200).send(drivers);
  } catch (error: any) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const driverId = Number(req.params.id);
    const drivers: DriverType[] = await driversServices.getDriversFilterById(
      driverId
    );
    res.status(200).send(drivers);
  } catch (error: any) {
    next(error);
  }
};

export default { index, show };
