"use strict";

class Login {
  get rules() {
    return {
      phone: "required|string",
      password: "required|string|min:5",
    };
  }

  get messages() {
    return {
      "phone.required": "Please, enter valid mobile number",
      "password.required": "Please, enter your password",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({
      success: false,
      message: collect(errorMessages).first().message,
    });
  }
}

module.exports = Login;
