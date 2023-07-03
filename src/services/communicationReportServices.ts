import communicationReportRepository from "../repositories/communicationReportRepository";
import { formatReportDateAndTime } from "../utils/formateDateAndTime";

interface Report {
  created_date: Date;
  subject_id: number;
  count: number;
}

interface ReportsByDate {
  [date: string]: {
    [subject_id: number]: number;
  };
}

const communicationReportService = (
  repo: ReturnType<typeof communicationReportRepository>
) => ({
  getReports: async () => {
    const reports = await repo.findAll();
    return reports.map(formatReportDateAndTime);
  },
  createReport: (data: any) => repo.create(data),
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

      result[date][report.failure_type] = report.count;
    });

    const formattedResult = Object.keys(result).map((date) => ({
      date,
      reports: result[date],
    }));

    return formattedResult;
  },
  getReportCountBySubjectLastThreeMonths: async (subjectId: number) => {
    const reports = await repo.findBySubjectLastThreeMonths(subjectId);
    return reports.map((report) => ({
      month: report.month,
      failure_type: report.failure_type,
      count: report.count,
    }));
  },
});

export default communicationReportService;
