// src/index.js
class Validator {
    constructor() {
      this.validators = [];
      this.customValidators = [];
    }
  
    number() {
      const newValidator = new Validator();
      newValidator.validators = [...this.validators, (data) => typeof data === 'number'];
      return newValidator;
    }
  
    even() {
      const newValidator = new Validator();
      newValidator.validators = [...this.validators, (data) => data % 2 === 0];
      return newValidator;
    }
  
    odd() {
      const newValidator = new Validator();
      newValidator.validators = [...this.validators, (data) => data % 2 !== 0];
      return newValidator;
    }
  
    array() {
      const newValidator = new Validator();
      newValidator.validators = [...this.validators, (data) => Array.isArray(data)];
      return newValidator;
    }
  
    length(expectedLength) {
      const newValidator = new Validator();
      newValidator.validators = [...this.validators, (data) => data.length === expectedLength];
      return newValidator;
    }
  
    object() {
      return {
        shape: (shape) => {
          return {
            isValid: (data) => {
              const dataKeys = Object.keys(data);
              const shapeKeys = Object.keys(shape);
              if (dataKeys.length !== shapeKeys.length) {
                return false;
              }
  
              for (const key of dataKeys) {
                if (!shapeKeys.includes(key) || !shape[key].isValid(data[key])) {
                  return false;
                }
              }
  
              return true;
            },
          };
        },
      };
    }
  
    isValid(data) {
      if (this.customValidators.length > 0) {
        for (const customValidator of this.customValidators) {
          if (!customValidator(data)) {
            return false;
          }
        }
      }
  
      for (const validator of this.validators) {
        if (!validator(data)) {
          return false;
        }
      }
  
      return true;
    }
  
    custom(validator) {
      const newValidator = new Validator();
      newValidator.customValidators = [...this.customValidators, validator];
      return newValidator;
    }
  }
  
  export default Validator;
  