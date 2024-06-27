/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_files', (table) => {
    table.string('id').primary();
    table.string('user_ip');
    table.string('user_agent');
    table.string('user_name');
    table.string('file_name');
    table.string('file_type');
    table.string('file_extension');
    table.string('file_url');
    table.boolean('is_private').defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user_files');
};
