import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/communicationReportRoutes";
dotenv.config();
const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", routes);
app.get("", (_req: Request, res: Response) => {
  res.send("Jedi Order API - Versão 01");
});

const port = 3000;

app.listen(port, () => console.log(`App Listening on port ${port}...`));
