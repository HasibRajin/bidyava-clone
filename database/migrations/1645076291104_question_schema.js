"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuestionSchema extends Schema {
  up() {
    this.create("questions", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("correct_answer").notNullable();
      table.text("details").nullable();
      table
        .integer("subject_id")
        .unsigned()
        .references("id")
        .inTable("subjects")
        .onDelete("cascade");

      table.timestamps();
    });
  }

  down() {
    this.drop("questions");
  }
}

module.exports = QuestionSchema;
