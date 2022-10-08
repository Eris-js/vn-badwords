const { regexp, badWords } = require('../index')

test('must be true 1', () => {
    expect(regexp.test("dmm")).toBeTruthy()
})
test('must be true 2', () => {
    expect(regexp.test("bà cha mày")).toBeTruthy()
})

test('must be true 3', () => {
    expect(regexp.test("bà cha mày 1")).toBeTruthy()
})

//----//

test('must be false 1', () => {
    expect(regexp.test("cmn1")).toBeFalsy()
})

test('must be false 2', () => {
    expect(regexp.test("tổ cha1")).toBeFalsy()
})

test('must be false 2', () => {
    expect(regexp.test("tổ1 cha")).toBeFalsy()
})

//I used includes but it doesn't seem to work right.
test('Array must be false 1', () => {
    expect(badWords.includes('bà cha mày 1')).toBeFalsy()
})

test('Array must be true 1', () => {
    expect(badWords.some(x => 'bà cha mày 1'.includes(x))).toBeTruthy()
})