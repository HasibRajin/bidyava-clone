"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Carriculum extends Model {
  subjects() {
    return this.hasMany("App/Models/Subject", "id", "carriculum_id");
  }
}

module.exports = Carriculum;
