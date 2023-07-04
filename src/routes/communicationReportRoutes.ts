import { Router } from "express";
import Knex from "knex";
import communicationReportController from "../controllers/communicationReportController";
import communicationReportService from "../services/communicationReportServices";
import communicationReportRepository from "../repositories/communicationReportRepository";
import knexConfig from "../../knexfile";

const router = Router();

const knex = Knex(knexConfig);

const repository = communicationReportRepository(knex);
const service = communicationReportService(repository);

const controller = communicationReportController(service);

router.get("/", controller.getAllReports);
router.post("/", controller.createReport);
router.get("/:id", controller.getReportById);
router.get(
  "/filterbysubjectid/:subjectId",
  controller.getReportCountBySubjectLastThreeMonths
);

router.post(
  "/countbytimeinterval",
  controller.getErrorCountByLocomotiveAndTimeInterval
);
router.post("/filterbytimeinterval", controller.getReportsByTimeInterval);

router.get("/filterbysubjectanddays/:days", async (req, res) => {
  const days = Number(req.params.days);
  const result = await service.groupReportsByDate(days);
  res.json(result);
});

export { router };
