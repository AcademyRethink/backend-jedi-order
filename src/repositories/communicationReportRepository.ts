import { Knex } from "knex";

export class CommunicationReportRepository {
  constructor(private knex: Knex) {}

  async getAll() {
    return this.knex("communication_report").select("*");
  }

  async insert(data: any) {
    return this.knex("communication_report").insert(data);
  }
}
