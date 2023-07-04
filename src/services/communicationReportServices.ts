import { makeError } from "../middlewares/errorHandler";
import communicationReportRepository from "../repositories/communicationReportRepository";
import { ReportType } from "../types/communicationReportsTypes";
import { formatReportDateAndTime } from "../utils/formateDateAndTime";
interface ReportsByDate {
  [date: string]: {
    [subject_id: number]: number;
  };
}

const communicationReportService = (
  repo: ReturnType<typeof communicationReportRepository>
) => ({
  getReports: async (): Promise<ReportType[]> => {
    const reports: ReportType[] = await repo.findAll();
    return reports.map(formatReportDateAndTime);
  },
  createReport: async (data: ReportType): Promise<ReportType> => {
    const isCreated = await repo.create(data);
    if (isCreated) return data;
    throw makeError({ message: "Internal server error", status: 500 });
  },
  getReportById: async (id: number) => {
    const report = await repo.findById(id);
    return report ? formatReportDateAndTime(report) : null;
  },
  getReportsByDays: async (days: number) => {
    const reports = await repo.findByDate(days);
    const countedReports = reports.reduce((acc, curr) => {
      acc[curr.subject_id] = (acc[curr.subject_id] || 0) + 1;
      return acc;
    }, {});
    return countedReports;
  },
  groupReportsByDate: async (days: number) => {
    const reports = await repo.findByDate(days);

    const result: ReportsByDate = {};

    reports.forEach((report) => {
      const date = report.created_date.toISOString().substring(0, 10);
      if (!result[date]) {
        result[date] = {};
      }

      result[date][report.subject_id] = report.count;
    });

    const formattedResult = Object.keys(result).map((date) => ({
      date,
      reports: result[date],
    }));

    return formattedResult;
  },
});

export default communicationReportService;
