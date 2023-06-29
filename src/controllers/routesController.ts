import { NextFunction, Request, Response } from "express";
import routesServices from "../services/routesServices";
import { RoutesType } from "../types/routesType";

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

export default { show };
