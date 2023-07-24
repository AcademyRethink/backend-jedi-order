import { Router } from "express";
import locomotivesController from "../controllers/locomotivesController";
import tokenAuth from "../middlewares/tokenAuthetication";

const router: Router = Router();

router.use(tokenAuth.authToken);

router.get("/", locomotivesController.show);
router.get("/filter", locomotivesController.filterLocomotives);
router.get("/overview", locomotivesController.quantityOfLocomotiveBystatus);

export { router };
