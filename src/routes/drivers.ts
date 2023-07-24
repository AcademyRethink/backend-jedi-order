import { Router } from "express";
import driversController from "../controllers/driversController";
import tokenAuth from "../middlewares/tokenAuthetication";

const router: Router = Router();

router.use(tokenAuth.authToken);

router.get("/", driversController.index);
router.get("/filter-driver/:id", driversController.show);

export { router };
