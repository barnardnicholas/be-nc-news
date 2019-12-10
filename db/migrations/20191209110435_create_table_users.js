exports.up = function(knex) {
  // console.log("create_table_users - UP");
  return knex.schema.createTable("users", function(table) {
    table
      .string("username")
      .primary()
      .unique();
    table.string("avatar_url");
    table.string("name").notNullable();
  });
};

exports.down = function(knex) {
  // console.log("create_table_users - DOWN");
  return knex.schema.dropTable("users");
};
