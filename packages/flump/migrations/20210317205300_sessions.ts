import * as knex from "knex";

const tableName = "sessions";

function down(knex: knex): knex.SchemaBuilder {
  return knex.schema.dropTable(tableName);
}

function up(knex: knex): knex.SchemaBuilder {
  return knex.schema.createTable(tableName, (table) => {
    table.integer("id").primary();
    table.timestamps(true, true);
    table.timestamp("deleted_at");
  });
}

export { down, up };
