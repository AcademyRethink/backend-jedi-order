import { Knex } from "knex";

const communicationReportRepository = (knex: Knex) => ({
  findAll: () => knex.select("*").from("communication_report"),
  create: (data: any) => knex("communication_report").insert(data),
  findById: (id: number) => knex("communication_report").where({ id }).first(),
  findByDate: (days: number) =>
    knex
      .select(
        knex.raw(
          "DATE(created_at) as created_date, subject_id, count(*) as count"
        )
      )
      .from("communication_report")
      .where(
        "created_at",
        ">=",
        knex.raw(`CURRENT_TIMESTAMP - INTERVAL '${days} days'`)
      )
      .groupByRaw("DATE(created_at), subject_id"),
});

export default communicationReportRepository;
