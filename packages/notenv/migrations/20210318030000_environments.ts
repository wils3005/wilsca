import Knex from "knex";

const tableName = "environments";

function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(tableName);
}

function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable(tableName, (table) => {
    table.integer("id").primary();
    table.string("value").unique().notNullable();
    table.timestamps(true, true);
  });
}

export { down, up };
