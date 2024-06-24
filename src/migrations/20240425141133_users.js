/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('uploads', (table) => {
    table.increments('id').primary();
    table.string('file_name').notNullable();
    table.string('file_type').notNullable();
    table.string('file_extension').notNullable();
    table.string('file_url').notNullable();
    table.boolean('is_private').defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('uploads');
};
