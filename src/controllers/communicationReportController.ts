import { Request, Response } from "express";
import { CommunicationReportService } from "../services/communicationReportServices";

export class CommunicationReportController {
  constructor(private service: CommunicationReportService) {}

  async getAllReports(req: Request, res: Response) {
    const reports = await this.service.getAllReports();
    res.json(reports);
  }

  async createReport(req: Request, res: Response) {
    const report = await this.service.createReport(req.body);
    res.status(201).json(report);
  }
}
