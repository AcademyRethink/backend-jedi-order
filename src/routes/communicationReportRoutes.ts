import { Router } from "express";
import Knex from "knex";
import communicationReportController from "../controllers/communicationReportController";
import communicationReportService from "../services/communicationReportServices";
import communicationReportRepository from "../repositories/communicationReportRepository";
import knexConfig from "../../knexfile";

const routes = Router();

const knex = Knex(knexConfig);

const repository = communicationReportRepository(knex);
const service = communicationReportService(repository);

const controller = communicationReportController(service);

routes.get("/communication-reports", controller.getAllReports);
routes.post("/communication-reports", controller.createReport);
routes.get("/communication-reports/:id", controller.getReportById);

export default routes;
