import { NextFunction, Request, Response } from "express";
import communicationReportService from "../services/communicationReportServices";
import { ReportType } from "../types/communicationReportsTypes";
import { CreateCommunicationReportData } from "../types/communicationReportsTypes";

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
      const newReport: CreateCommunicationReportData = req.body;
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
  getErrorCountByLocomotiveAndTimeInterval: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { startDate, endDate, failureType } = req.body;
      const errorCounts =
        await service.getErrorCountByLocomotiveAndTimeInterval(
          failureType,
          startDate,
          endDate
        );
      res.json(errorCounts);
    } catch (error) {
      next(error);
    }
  },

  getReportsByTimeInterval: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { startDate, endDate } = req.body;
      const reports = await service.getReportsByTimeInterval(
        startDate,
        endDate
      );
      res.json(reports);
    } catch (error) {
      next(error);
    }
  },
});

export default communicationReportController;
