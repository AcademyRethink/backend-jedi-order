import { Router } from "express";
import user from "../controllers/loginController";
import adminAuth from '../middlewares/tokenAuthetication'
const login: Router = Router();

login.post("/", adminAuth.authToken, user.insert);
login.post("/login", user.login);
login.put("/:id", user.update);

export { login };
