import { Router } from "express";
import driversController from "../controllers/driversController";

const router: Router = Router();

router.get("/", driversController.index);
router.get("/filter-driver/:id", driversController.show);

export { router };
