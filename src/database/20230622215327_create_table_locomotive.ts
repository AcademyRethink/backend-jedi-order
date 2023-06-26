import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("locomotive", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("status").defaultTo("stoped");
    table.string("route").notNullable();
    table.string("load").notNullable();
    table.string("driver").notNullable();
    table.string("maneuverer_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("locomotive");
}
