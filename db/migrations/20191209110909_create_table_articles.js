exports.up = function(knex) {
  // console.log("create_table_articles - UP");
  const datePosted = new Date();
  return knex.schema.createTable("articles", function(table) {
    table.increments("article_id").primary();
    table.string("title").notNullable();
    table.text("body");
    table.integer("votes").defaultTo("0");
    table.string("author").references("users.username");
    table.string("created_at").defaultTo(datePosted);
    table.string("topic");
  });
};

exports.down = function(knex) {
  // console.log("create_table_articles - DOWN");
  return knex.schema.dropTable("articles");
};
