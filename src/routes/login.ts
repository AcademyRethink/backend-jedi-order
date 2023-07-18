import { Router } from "express";
import user from "../controllers/loginController";
import tokenAuth from "../middlewares/tokenAuthetication";
import userValidator from "../middlewares/userValidator";
const login: Router = Router();

login.post(
  "/",
  tokenAuth.authTokenAdmin,
  userValidator.userInsertValidator,
  user.insert
);
login.post("/login", user.login);
login.patch(
  "/:id",
  userValidator.userPatchValidator,
  tokenAuth.authTokenAdmin,
  user.update
);
login.get(
  "/myAccount/:id",
  userValidator.userIdValidator,
  tokenAuth.authToken,
  user.show
);
login.post("/logout", tokenAuth.logoutAuth);

export { login };
