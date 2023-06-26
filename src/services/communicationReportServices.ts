import { CommunicationReportRepository } from "../repositories/communicationReportRepository";
import { formatReportDateAndTime } from "../utils/formateDateAndTime";
export class CommunicationReportService {
  constructor(private repository: CommunicationReportRepository) {}

  async getAllReports() {
    const reports = await this.repository.getAll();
    const processedReports = reports.map(formatReportDateAndTime);
    return processedReports;
  }

  async createReport(data: any) {
    return this.repository.insert(data);
  }
}
