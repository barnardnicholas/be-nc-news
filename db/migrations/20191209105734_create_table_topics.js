exports.up = function(knex) {
  console.log("create_table_topics - UP");
  return knex.schema.createTable("topics", function(table) {
    table.string("slug").primary();
    table.string("description").notNullable();
  });
};

exports.down = function(knex) {
  console.log("create_table_topics - DOWN");
  return knex.schema.dropTable("topics");
};
