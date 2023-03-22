const blackList = require('./lang/vi.json');

function badWords(str, options, cb) {
    if (typeof str !== 'string') throw new Error('[vn-badwords] string argument expected')

    options = (typeof options === 'string') ? { replacement: options } : options || {}

    if (!options?.replacement) options.replacement = '*'

    if (typeof options.blackList === 'function') options.blackList = options.blackList(blackList);
    else options.blackList = blackList;

    const regexp = new RegExp("(" + options.blackList.join("|") + ")", "gi"); // "i" when matching, casing differences are ignored.

    str = str.normalize();

    const badWordsFiltered = [];

    const strFiltered = str.replace(regexp, (match) => {
        badWordsFiltered.push(match);
        return options.replacement.repeat(match.length);
    });

    if (cb) {
        cb(badWordsFiltered, badWordsFiltered.length)
    }

    if (options?.validate && !!options.validate) {
        return regexp.test(str);
    }

    return strFiltered;
}

module.exports = {
    badWords,
    blackList
}