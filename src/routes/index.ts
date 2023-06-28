import { Router } from "express";
import { router as locomotivesRoutes } from "./locomotives";

const router: Router = Router();

router.use("/locomotives", locomotivesRoutes);

export { router };
