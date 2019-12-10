exports.up = function(knex) {
  // console.log("create_table_comments - UP");
  return knex.schema.createTable("comments", function(table) {
    table.increments("comment_id").primary();
    table
      .string("author")
      .references("users.username")
      .notNullable();
    table
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    table.integer("votes").defaultsTo("0");
    table.string("created_at");
    table.text("body").notNullable();
  });
};

exports.down = function(knex) {
  // console.log("create_table_comments - DOWN");
  return knex.schema.dropTable("comments");
};
