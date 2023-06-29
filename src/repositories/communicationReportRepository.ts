import { Knex } from "knex";

const communicationReportRepository = (knex: Knex) => ({
  findAll: () => knex.select("*").from("communication_report"),
  create: (data: any) => knex("communication_report").insert(data),
  findById: (id: number) => knex("communication_report").where({ id }).first(),
});

export default communicationReportRepository;
