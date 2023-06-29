import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("communication_report", function (table) {
    table.increments("id").primary();
    table.string("subject");
    table.integer("created_by_id");
    table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.integer("driver_id");
    table.string("location");
    table.string("description");
    table.integer("locomotive_id");
    table.boolean("is_stopped");
    table.string("reason_stopped");
    table.boolean("is_communication_failed");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("communication_report");
}
