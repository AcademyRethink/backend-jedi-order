import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("locomotivePosition", function (table) {
    table.increments();
    table.integer("locomotive_id");
    table.foreign("locomotive_id").references("locomotive.id");
    table.string("routeName");
    table.integer("index");
    table.integer("maxIndex");
    table.string("direction");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("locomotivePosition");
}
