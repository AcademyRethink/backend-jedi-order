import { Router } from "express";
import routesController from "../controllers/routesController";

const router: Router = Router();

router.get("/", routesController.show);

export { router };
