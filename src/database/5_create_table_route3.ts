import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("route3", function (table) {
    table.increments();
    table.string("latitude");
    table.string("longitude");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("route3");
}
