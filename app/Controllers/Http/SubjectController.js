"use strict";
const Subject = use("App/Models/Subject");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with subjects
 */
class SubjectController {
  /**
   * Show a list of all subjects.
   * GET subjects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    try {
      const subject = await Subject.query().with("questions").fetch();
      return response.json({
        success: true,
        message: `Found ${subject.rows.length} subject`,
        Subjects: subject,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  /**
   * Create/save a new subject.
   * POST subjects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const subData = request.only(["name", "icon", "carriculum_id"]);
      const subject = await Subject.create(subData);

      return response.json({
        success: true,
        message: "Create subject  successfully",
        subject: subject,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  /**
   * Update subject details.
   * PUT or PATCH subjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    try {
      const subject = await Subject.find(id);
      const subData = request.only(["name", "icon", "carriculum_id"]);
      subject.merge(subData);
      await subject.save();

      return response.json({
        success: true,
        message: "Update subject  successfully",
        subject: subject,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  /**
   * Delete a subject with id.
   * DELETE subjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    try {
      const subject = await Subject.find(id);
      await subject.delete();

      return response.json({
        success: true,
        message: "delete subject  successfully",
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }
}

module.exports = SubjectController;
