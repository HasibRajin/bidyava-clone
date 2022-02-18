"use strict";

class Register {
  get rules() {
    return {
      username: "required|string",
      phone: "required|string",
      password: "required|string|min:5",
    };
  }

  get messages() {
    return {
      "username.required": "Please, enter your name",
      "phone.required": "Please, enter your mobile number",
      "password.required": "Please, enter a password",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({
      success: false,
      message: collect(errorMessages).first().message,
    });
  }
}

export default Register;
