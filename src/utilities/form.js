import { Errors } from "./errors";

export class Form {
  /**
   *
   * @param {object} prop
   */
  constructor(prop) {
    this.originalData = prop;
    this.errors = new Errors();

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

  setErrors(errors) {
    this.errors = new Errors(errors);
  }
}
