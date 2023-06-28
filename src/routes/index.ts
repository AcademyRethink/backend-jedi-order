import { Router } from "express";
import { login as loginRoutes } from "./login";
import { router as locomotivesRoutes } from "./locomotives";

const router: Router = Router();

router.use("/user",loginRoutes);
router.use("/locomotives", locomotivesRoutes);

export { router };
