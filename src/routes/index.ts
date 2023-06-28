import { Router } from "express";
import { router as locomotivesRoutes } from "./locomotives";
import { router as routesRoutes } from "./routes";

const router: Router = Router();

router.use("/locomotives", locomotivesRoutes);
router.use("/routes", routesRoutes);

export { router };
