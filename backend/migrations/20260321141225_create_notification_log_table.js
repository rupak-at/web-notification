/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("notification_logs", (table) => {
    table.increments("id").primary();
    table.integer("notification_id").unsigned().notNullable();
    table.text("error_message");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .foreign("notification_id")
      .references("id")
      .inTable("notification")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists("notification_logs");
};
