import Validator from './src/Validator.js';
// Пример 1: Валидатор чисел
const v = new Validator();
const numberSchema = v.number();

console.log(numberSchema.isValid(123)); // true
console.log(numberSchema.isValid('Hexlet')); // false
console.log(numberSchema.isValid(null)); // false
console.log(numberSchema.isValid('')); // false

// Пример 2: Валидатор четных и нечетных чисел
const evenSchema = v.number().even();
const oddSchema = v.number().odd();

console.log(evenSchema.isValid(2)); // true
console.log(evenSchema.isValid(11)); // false

console.log(oddSchema.isValid(11)); // true
console.log(oddSchema.isValid(2)); // false

// Пример 3: Валидатор массивов
const arraySchema = v.array();

console.log(arraySchema.isValid([])); // true
console.log(arraySchema.isValid(123)); // false
console.log(arraySchema.isValid('Hexlet')); // false

// Пример 4: Валидатор длины массива
const lengthSchema = v.array().length(3);
console.log(lengthSchema.isValid([1, 2, 3])); // true
console.log(lengthSchema.isValid([1, 2, 3, 4])); // false

// Пример 5: Валидатор объектов
const objectSchema = v.object().shape({
  id: v.number(),
  name: v.custom((data) => typeof data === 'string' && data.length > 0),
});

console.log(objectSchema.isValid({ id: 123, name: 'John' })); // true
console.log(objectSchema.isValid({ id: '123', name: 'John' })); // false

export default Validator;
