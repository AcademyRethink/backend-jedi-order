import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", function (table) {
    table.increments();
    table.string("name");
    table.string("email");
    table.string("password");
    table.integer("permissionLevel");
    table.string("image");
    table.datetime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime("date_updated", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.integer("created_by_id");
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
}
