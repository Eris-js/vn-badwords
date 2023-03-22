const { badWords } = require('./index');

console.log(badWords('Không là mà đòi có ăn thì ăn con cặc, ăn cứt', { replacement: '*' }))
console.log(badWords('Không là mà đòi có ăn thì ăn con cặc, ăn cứt', { validate: true }))
console.log(badWords('Không là mà đòi có ăn thì ăn con cặc, ăn cứt', '*'))
console.log(badWords('Không là mà đòi có ăn thì ăn con cặc, ăn cứt', '*', (badwordsMatch, count) => console.log(badwordsMatch, count)))