import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("locomotive", function (table) {
    table.increments();
    table.string("name");
    table.string("status");
    table.string("route");
    table.string("load");
    table.string("trainDriver");
    table.string("maneuverer");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("locomotive");
}
