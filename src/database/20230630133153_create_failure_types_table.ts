import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("failure_types", function (table) {
    table.increments();
    table.string("failure_type");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("failure_types");
}
