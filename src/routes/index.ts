import { Router } from "express";
import { login as loginRoutes } from "./login";

const router: Router = Router();

router.use("/user",loginRoutes);

export { router };
