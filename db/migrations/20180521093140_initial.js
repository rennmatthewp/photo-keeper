exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('photos', table => {
      table.increments('id').primary();
      table.string('title').unique().notNullable();
      table.string('url').unique().notNullable();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('photos')]);
};
