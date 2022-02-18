"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SubjectSchema extends Schema {
  up() {
    this.create("subjects", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("icon").nullable();
      table
        .integer("carriculum_id")
        .unsigned()
        .references("id")
        .inTable("carriculums")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("subjects");
  }
}

module.exports = SubjectSchema;
