import { Request, Response } from "express";
import communicationReportService from "../services/communicationReportServices";

const communicationReportController = (
  service: ReturnType<typeof communicationReportService>
) => ({
  getAllReports: async (_req: Request, res: Response) => {
    const reports = await service.getReports();
    res.json(reports);
  },
  createReport: async (req: Request, res: Response) => {
    const newReport = await service.createReport(req.body);
    res.status(201).json(newReport);
  },
  getReportById: async (req: Request, res: Response) => {
    const report = await service.getReportById(Number(req.params.id));
    if (!report) return res.status(404).json({ message: "Report not found." });
    res.json(report);
  },
});

export default communicationReportController;
