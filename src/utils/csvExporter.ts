import { createObjectCsvWriter } from "csv-writer";
import { ReportType } from "../types/communicationReportsTypes";
import { Response } from "express";
import path from "path";

const exportToCsv = (reports: ReportType[], res: Response): void => {
  const timestamp = Date.now();
  const filename = `report_${timestamp}.csv`;

  const csvWriter = createObjectCsvWriter({
    path: path.resolve(__dirname, "..", "csv-reports-created", filename),
    header: [
      { id: "id", title: "ID" },
      { id: "subject", title: "Subject" },
      { id: "created_by", title: "Created By" },
      { id: "driver", title: "Driver" },
      { id: "locomotive", title: "Locomotive" },
      { id: "created_at", title: "Created At" },
    ],
    encoding: "utf8",
  });

  const data = reports.map((report) => ({
    id: report.id,
    subject: report.subject,
    created_by: report.created_by,
    driver: report.driver,
    locomotive: report.locomotive,
    created_at: report.created_at,
  }));

  csvWriter
    .writeRecords(data)
    .then(() => {
      const filePath = path.resolve(
        __dirname,
        "..",
        "csv-reports-created",
        filename
      );
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.sendFile(filePath);
    })
    .catch((error) => console.error(`Error creating CSV file: ${error}`));
};

export default exportToCsv;
