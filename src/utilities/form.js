import { userService } from "../services";

export class Form {
  /**
   *
   * @param {object} prop
   */
  constructor(prop) {
    this.originalData = prop;

    for (let field in prop) {
      this[field] = prop[field];
    }
  }

  data() {
    let data = {};

    for (let props in this.originalData) {
      data[props] = this[props];
    }

    return data;
  }

  reset() {
    for (let props in this.originalData) {
      this[props] = "";
    }
  }
}
