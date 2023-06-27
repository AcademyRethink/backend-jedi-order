import { Router } from "express";
import locomotivesController from "../controllers/locomotivesController";

const router: Router = Router();

router.get("/", locomotivesController.show);

export { router };
