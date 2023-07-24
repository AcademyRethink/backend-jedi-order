import { Router } from "express";
import routesController from "../controllers/routesController";
import tokenAuth from "../middlewares/tokenAuthetication";

const router: Router = Router();

router.use(tokenAuth.authToken);

router.get("/route", routesController.show);
router.get("/", routesController.index);
router.get("/locomotivePosition", routesController.currentPosition);

export { router };
