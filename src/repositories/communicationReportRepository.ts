import { Knex } from "knex";
import { CreateCommunicationReportData } from "../types/communicationReportsTypes";

const communicationReportRepository = (knex: Knex) => ({
  findAll: () => {
    return knex("communication_report")
      .join(
        "failure_types",
        "communication_report.subject_id",
        "failure_types.id"
      )
      .join("user", "communication_report.created_by_id", "user.id")
      .join("driver", "communication_report.driver_id", "driver.id")
      .join("locomotive", "communication_report.locomotive_id", "locomotive.id")
      .select([
        "communication_report.*",
        "failure_types.failure_type as subject",
        "user.name as created_by",
        "driver.name as driver",
        "locomotive.name as locomotive",
      ]);
  },
  create: (data: CreateCommunicationReportData) =>
    knex("communication_report").insert(data),
  findById: (id: number) =>
    knex("communication_report")
      .where("communication_report.id", id)
      .join(
        "failure_types",
        "communication_report.subject_id",
        "failure_types.id"
      )
      .join("user", "communication_report.created_by_id", "user.id")
      .join("driver", "communication_report.driver_id", "driver.id")
      .join("locomotive", "communication_report.locomotive_id", "locomotive.id")
      .select([
        "communication_report.*",
        "failure_types.failure_type as subject",
        "user.name as created_by",
        "driver.name as driver",
        "locomotive.name as locomotive",
      ])
      .first(),

  findByDate: (days: number) =>
    knex
      .select(
        knex.raw(
          "DATE(communication_report.created_at) as created_date, failure_types.failure_type, count(*) as count"
        )
      )
      .from("communication_report")
      .join(
        "failure_types",
        "communication_report.subject_id",
        "failure_types.id"
      )
      .where(
        "communication_report.created_at",
        ">=",
        knex.raw(`CURRENT_TIMESTAMP - INTERVAL '${days} days'`)
      )
      .groupByRaw(
        "DATE(communication_report.created_at), failure_types.failure_type"
      ),

  findBySubjectLastThreeMonths: (subjectId: number) =>
    knex
      .select(
        knex.raw(
          "TO_CHAR(DATE_TRUNC('month', communication_report.created_at), 'Month') as month, failure_types.failure_type, count(*) as count"
        )
      )
      .from("communication_report")
      .join(
        "failure_types",
        "communication_report.subject_id",
        "failure_types.id"
      )
      .where("communication_report.subject_id", subjectId)
      .andWhere(
        "communication_report.created_at",
        ">=",
        knex.raw(`CURRENT_DATE - INTERVAL '3 months'`)
      )
      .groupByRaw(
        "TO_CHAR(DATE_TRUNC('month', communication_report.created_at), 'Month'), failure_types.failure_type"
      ),
  findErrorCountByLocomotiveAndTimeInterval: (
    failureType: number,
    startDate: Date,
    endDate: Date
  ) =>
    knex("communication_report")
      .join(
        "failure_types",
        "communication_report.subject_id",
        "failure_types.id"
      )
      .join("locomotive", "communication_report.locomotive_id", "locomotive.id")
      .where("failure_types.id", failureType)
      .whereBetween("communication_report.created_at", [startDate, endDate])
      .select("locomotive.name as locomotive", "failure_types.failure_type")
      .count("* as count")
      .groupBy("locomotive.name", "failure_types.failure_type"),
});

export default communicationReportRepository;
