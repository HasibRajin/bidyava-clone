"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuestionOptionSchema extends Schema {
  up() {
    this.create("question_options", (table) => {
      table.increments();
      table.string("option");
      table
        .integer("question_id")
        .unsigned()
        .references("id")
        .inTable("questions")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("question_options");
  }
}

module.exports = QuestionOptionSchema;
