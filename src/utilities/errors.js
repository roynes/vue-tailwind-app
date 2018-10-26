export class Errors {
  constructor(errors = {}) {
    this.originalData = errors;

    for (let field in errors) {
      this[field] = errors[field];
    }
  }

  has(error) {
    this.originalData.hasOwnProperty(error);
  }

  reset() {
    for (let props in this.originalData) {
      this[props] = "";
    }
  }

  hasAny() {
    return !!Object.keys(this.originalData).length > 0;
  }
}
