import Knex from "knex";

const tableName = "entries";

function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(tableName);
}

function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable(tableName, (table) => {
    table.integer("id").primary();
    table.integer("cluster_id").notNullable();
    table.integer("namespace_id").notNullable();
    table.integer("service_id").notNullable();
    table.integer("environment_id").notNullable();
    table.integer("name_id").notNullable();
    table.integer("value_id").notNullable();
    table.timestamps(true, true);

    table
      .foreign("cluster_id")
      .references("id")
      .inTable("clusters")
      .onDelete("CASCADE");

    table
      .foreign("namespace_id")
      .references("id")
      .inTable("namespaces")
      .onDelete("CASCADE");

    table
      .foreign("service_id")
      .references("id")
      .inTable("services")
      .onDelete("CASCADE");

    table
      .foreign("environment_id")
      .references("id")
      .inTable("environments")
      .onDelete("CASCADE");

    table
      .foreign("name_id")
      .references("id")
      .inTable("names")
      .onDelete("CASCADE");

    table
      .foreign("name_id")
      .references("id")
      .inTable("names")
      .onDelete("CASCADE");
  });
}

export { down, up };
