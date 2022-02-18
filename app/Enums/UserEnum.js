const Enum = use("./Enum");

class UserType extends Enum {
  static CLIENT = "client";
  static ADMIN = "admin";
}

module.exports.UserType = UserType;
