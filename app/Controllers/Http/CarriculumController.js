"use strict";
const Curriculum = use("App/Models/Carriculum");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with carriculums
 */
class CarriculumController {
  /**
   * Show a list of all carriculums.
   * GET carriculums
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    try {
      const curriculum = await Curriculum.query().with("subjects").fetch();

      return response.json({
        success: true,
        message: `Found ${curriculum.rows.length} curriculums`,
        curriculum,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  /**
   * Create/save a new carriculum.
   * POST carriculums
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const carriculumData = request.only(["name", "details", "icon"]);
      const curriculum = await Curriculum.create(carriculumData);

      return response.json({
        success: true,
        message: "Create curriculum  successfully",
        curriculum,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  /**
   * Update carriculum details.
   * PUT or PATCH carriculums/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    try {
      const curriculum = await Curriculum.find(id);
      const curriculumData = request.only(["name", "details", "icon"]);
      curriculum.merge(curriculumData);
      await curriculum.save();

      return response.json({
        success: true,
        message: "Update curriculum  successfully",
        curriculum,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  /**
   * Delete a carriculum with id.
   * DELETE carriculums/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    try {
      const curriculum = await Curriculum.find(id);
      await curriculum.delete();

      return response.json({
        success: true,
        message: "delete curriculum  successfully",
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }
}

module.exports = CarriculumController;
