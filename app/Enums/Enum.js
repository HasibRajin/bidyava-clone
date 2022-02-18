class Enum {
  /**
   *
   * @return {string[]}
   */
  static getKeys() {
    return Object.keys(this);
  }

  /**
   *
   * @param name
   * @return {*}
   */
  static getValue(name) {
    return this[name];
  }

  /**
   *
   * @return {((function(*): *) | Enum | (function(): *) | (function(): string[]) | (function(): *))[]}
   */
  static getValues() {
    return Object.values(this);
  }

  /**
   *
   * @return {string}
   */
  static rules() {
    return Object.values(this).join(",");
  }
}
module.exports = Enum;
