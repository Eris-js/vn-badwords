const { badWords } = require('./index');

const text = 'Không là mà đòi có ăn thì ăn con cặc, ăn cứt';

console.log(badWords(text, { replacement: '*' }))
console.log(badWords(text, { validate: true }))
console.log(badWords(text, '*'))
console.log(badWords(text, '*', (badwordsMatch, count) => console.log(badwordsMatch, count)));
