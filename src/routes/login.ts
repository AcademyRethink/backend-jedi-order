import { Router } from "express";
import user from "../controllers/loginController";
import adminAuth from '../middlewares/tokenAuthetication'
import userValidator from "../middlewares/userValidator";
const login: Router = Router();

login.post("/", adminAuth.authToken,userValidator.userInsertValidator, user.insert);
login.post("/login", user.login);
login.patch("/:id",adminAuth.authToken,userValidator.userPatchValidator, user.update);

export { login };
