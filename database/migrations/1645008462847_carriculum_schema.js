"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CarriculumSchema extends Schema {
  up() {
    this.create("carriculums", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.text("details").nullable();
      table.string("icon").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("carriculums");
  }
}

module.exports = CarriculumSchema;
