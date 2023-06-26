import express from "express";
import Knex from "knex";
import { CommunicationReportController } from "../controllers/communicationReportController";
import { CommunicationReportRepository } from "../repositories/communicationReportRepository";
import { CommunicationReportService } from "../services/communicationReportServices";

import knexConfig from "../../knexfile";

const knex = Knex(knexConfig);

const repository = new CommunicationReportRepository(knex);
const service = new CommunicationReportService(repository);
const controller = new CommunicationReportController(service);

/* //Testando o repositório com console.log
repository
  .getAll()
  .then((reports) => {
    console.log("Reports:", reports);
  })
  .catch((error) => {
    console.error("Error fetching reports:", error);
  });
*/

/* // Testando o service com console.log
service
  .getAllReports()
  .then((reports) => {
    console.log("Reports from service:", reports);
  })
  .catch((error) => {
    console.error("Error fetching reports from service:", error);
  });
*/

/*// Testando o controlador com console.log
// Simulando uma solicitação e resposta HTTP
const mockRequest = {};
const mockResponse = {
  json: (data: any) => {
    console.log("Data returned by the controller:", data);
  },
};

// Chamar o método do controlador e passar os objetos simulados
controller.getAllReports(mockRequest as any, mockResponse as any);
*/

const router = express.Router();

router.get("/communication-reports", controller.getAllReports.bind(controller));
router.post("/communication-reports", controller.createReport.bind(controller));

export default router;
