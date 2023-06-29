import communicationReportRepository from "../repositories/communicationReportRepository";
import { formatReportDateAndTime } from "../utils/formateDateAndTime";

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
});

export default communicationReportService;
