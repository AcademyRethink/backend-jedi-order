import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", function (table) {
    table.increments();
    table.string("name");
    table.string("email").unique;
    table.string("password");
    table.boolean("permission").defaultTo(false);
    table.string("image");
    table.boolean("active").defaultTo(true);
    table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime("date_updated", { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
}
