"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Subject extends Model {
  questions() {
    return this.hasMany("App/Models/Question", "id", "subject_id");
  }
}

module.exports = Subject;
