import { Router } from "express";
import { login as loginRoutes } from "./login";
import { router as locomotivesRoutes } from "./locomotives";
import { router as routesRoutes } from "./routes";
import { router as communicationReportRoutes } from "./communicationReportRoutes";
import { router as driversRoutes } from "./drivers";
import { router as failureTypeRoutes } from "./failureTypeRoutes";

const router: Router = Router();

router.use("/user", loginRoutes);
router.use("/locomotives", locomotivesRoutes);
router.use("/routes", routesRoutes);
router.use("/communication-reports", communicationReportRoutes);
router.use("/drivers", driversRoutes);
router.use("/failure-types", failureTypeRoutes);

export { router };
