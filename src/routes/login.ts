import { Router } from "express";
import user from "../controllers/login";
const login: Router = Router();

login.post("/", user.insert);
login.post("/login", user.login);
login.put("/:id", user.update);

export { login };
