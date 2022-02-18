"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");
const { UserType } = require("../../app/Enums/UserEnum");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("username", 80).notNullable().unique();
      table.string("phone", 20).notNullable().unique();
      table.string("password", 60).notNullable();
      table.enu("type", UserType.getValues()).defaultTo("client");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
