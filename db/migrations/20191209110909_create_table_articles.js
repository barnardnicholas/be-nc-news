exports.up = function(knex) {
  console.log("create_table_articles - UP");
  return knex.schema.createTable("articles", function(table) {
    table.increments("article_id").primary();
    table.string("title").notNullable();
    table.text("body");
    table.integer("votes").defaultTo("0");
    table.string("author").references("users.username");
    table.timestamp("created_at");
  });
};

exports.down = function(knex) {
  console.log("create_table_articles - DOWN");
  return knex.schema.dropTable("articles");
};
