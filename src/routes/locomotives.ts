import { Router } from "express";
import locomotivesController from "../controllers/locomotivesController";

const router: Router = Router();

router.get("/", locomotivesController.show);
router.get("/filter", locomotivesController.filterStatus);
router.get("/overview", locomotivesController.quantityOfLocomotiveBystatus);

export { router };
