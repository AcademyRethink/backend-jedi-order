import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("communication_report", function (table) {
    table.increments("id").primary();
    table.integer("subject_id");
    table.foreign("subject_id").references("failure_types.id");
    table.integer("created_by_id");
    table.foreign("created_by_id").references("user.id");
    table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.integer("driver_id");
    table.foreign("driver_id").references("driver.id");
    table.string("location");
    table.string("description");
    table.integer("locomotive_id");
    table.foreign("locomotive_id").references("locomotive.id");
    table.boolean("is_stopped");
    table.string("reason_stopped");
    table.boolean("is_communication_failed");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("communication_report");
}
