import { Router } from "express";
import routesController from "../controllers/routesController";

const router: Router = Router();

router.get("/route", routesController.show);
router.get("/", routesController.index);
router.get("/locomotivePosition", routesController.currentPosition);

export { router };
