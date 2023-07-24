import { NextFunction, Request, Response } from "express";
import routesServices from "../services/routesServices";
import { LocomotiveRoutePosition, RoutesType } from "../types/routesType";

const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const routes = await routesServices.getAllRoutes();

    res.status(200).send(routes);
  } catch (error) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const routeName: string = req.query.name as string;
    const routes: RoutesType[] = await routesServices.getRouteInfo(routeName);

    res.status(200).send(routes);
  } catch (error) {
    next(error);
  }
};

const currentPosition = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentPosition: LocomotiveRoutePosition[] =
      await routesServices.getCurrentPosition();

    res.status(200).send(currentPosition);
  } catch (error) {
    next(error);
  }
};

export default { index, show, currentPosition };
