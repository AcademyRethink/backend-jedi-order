// communicationReportController.ts

import { NextFunction, Request, Response } from "express";
import communicationReportService from "../services/communicationReportServices";

const communicationReportController = (
  service: ReturnType<typeof communicationReportService>
) => ({
  getAllReports: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const reports = await service.getReports();
      res.json(reports);
    } catch (error) {
      next(error);
    }
  },
  createReport: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReport = await service.createReport(req.body);
      res.status(201).json(newReport);
    } catch (error) {
      next(error);
    }
  },
  getReportById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await service.getReportById(Number(req.params.id));
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
  getReportCountBySubjectLastThreeMonths: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const subjectId = Number(req.params.subjectId);
      const reports = await service.getReportCountBySubjectLastThreeMonths(
        subjectId
      );
      if (!reports)
        return res
          .status(404)
          .json({ message: "No reports found for this subject ID." });
      res.json(reports);
    } catch (error) {
      next(error);
    }
  },
});

export default communicationReportController;
