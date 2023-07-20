import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("locomotive", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("route").notNullable();
    table.string("load").notNullable();
    table.integer("driver_id");
    table.foreign("driver_id").references("driver.id");
    table.string("maneuverer");
    table.string("status").defaultTo("Em movimento");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("locomotive");
}
