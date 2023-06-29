import { format, utcToZonedTime } from "date-fns-tz";

export const formatReportDateAndTime = (report: any) => {
  const timeZone = "America/Sao_Paulo"; // GTM-3
  const dateFormat = "dd/MM/yyyy";
  const timeFormat = "HH:mm:ss";

  const zonedDate = utcToZonedTime(report.created_at, timeZone);
  return {
    ...report,
    date: format(zonedDate, dateFormat),
    time: format(zonedDate, timeFormat),
  };
};
