import { NextFunction, Request, Response } from "express";
import communicationReportService from "../services/communicationReportServices";
import { ReportType } from "../types/communicationReportsTypes";

const communicationReportController = (
  service: ReturnType<typeof communicationReportService>
) => ({
  getAllReports: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reports: ReportType[] = await service.getReports();
      res.json(reports);
    } catch (error) {
      next(error);
    }
  },
  createReport: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newReport: ReportType = req.body;
      const createdReport: ReportType = await service.createReport(newReport);
      res.status(201).json(createdReport);
    } catch (error) {
      next(error);
    }
  },
  getReportById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report: ReportType = await service.getReportById(
        Number(req.params.id)
      );
      if (!report)
        return res.status(404).json({ message: "Report not found." });
      res.json(report);
    } catch (error) {
      next(error);
    }
  },
  getReportsByDays: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const days = Number(req.params.days);
      const reports = await service.getReportsByDays(days);
      if (!reports)
        return res
          .status(404)
          .json({ message: "No reports found for the given days." });
      res.json(reports);
    } catch (error) {
      next(error);
    }
  },
});

export default communicationReportController;
