"use strict";
const Question = use("App/Models/Question");
const Option = use("App/Models/QuestionOption");

class QuestionController {
  async index({ response }) {
    try {
      const question = await Question.query().with("options").fetch();
      return response.json({
        success: true,
        message: `Found ${question.rows.length} question`,
        questions: question,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  async store({ request, response }) {
    try {
      const Qdata = request.only([
        "title",
        "correct_answer",
        "details",
        "subject_id",
      ]);
      const question = await Question.create(Qdata);
      const options = JSON.parse(request.only(["options"]).options);
      const option = await Option.createMany(
        options.map((option) => ({ option: option, question_id: question.id }))
      );

      return response.json({
        success: true,
        message: "Create question  successfully",
        question: question,
        PushSubscriptionOptions: option,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  async update({ params: { id }, request, response }) {
    try {
      const question = await Question.find(id);
      const Qdata = request.only([
        "title",
        "correct_answer",
        "details",
        "subject_id",
      ]);
      question.merge(Qdata);
      await question.save();

      return response.json({
        success: true,
        message: "Update question  successfully",
        Question: question,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  async destroy({ params: { id }, request, response }) {
    try {
      const question = await Question.find(id);
      await question.delete();

      return response.json({
        success: true,
        message: "delete question  successfully",
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }
}

module.exports = QuestionController;
