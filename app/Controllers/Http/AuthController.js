"use strict";
const User = use("App/Models/User");

class AuthController {
  async index({ request, response }) {
    try {
      return User.all();
    } catch (e) {
      return response.json({ success: false, message: e.message });
    }
  }

  async register({ request, response }) {
    try {
      const userData = request.only(["username", "phone", "password"]);
      const user = await User.create(userData);

      return response.json({
        success: true,
        message: "User create success",
        user,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }

  async update({ request, response }) {
    const userData = request.only(["username", "phone", "password"]);

    const user = await User.save(userData);

    response.status(200).json({
      message: "Successfully updated the user.",
      user,
    });
  }

  async login({ request, response, auth }) {
    try {
      const { phone, password } = request.all();

      const token = await auth.attempt(phone, password);
      return response.json({
        message: "Log in successfully",
        token,
      });
    } catch (e) {
      return response.json({
        success: false,
        message: e.message,
      });
    }
  }
  async logout({ auth, response }) {
    try {
      const user = await auth.getUser();
      await auth.authenticator("api").revokeTokensForUser(user);

      return response.json({
        success: true,
        message: "Logout success",
      });
    } catch (e) {
      return response.json({ success: false, message: e.message });
    }
  }
}

module.exports = AuthController;
