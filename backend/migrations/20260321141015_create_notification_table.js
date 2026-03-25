/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("notification", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("title").notNullable();
    table.text("message").notNullable();
    table.enum("status", ["pending", "success", "error"]).defaultTo("pending");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists("notification");
};
