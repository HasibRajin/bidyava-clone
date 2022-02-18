"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Question extends Model {
  options() {
    return this.hasMany("App/Models/QuestionOption", "id", "question_id");
  }
}

module.exports = Question;
