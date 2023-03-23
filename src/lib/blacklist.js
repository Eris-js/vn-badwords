const blackList = require('./lang/vi.json');

function isString(input) {
    return typeof input === 'string';
}

const DEFAULT_OPTIONS = {
    blackList: [],
    replacement: '*',
    validate: false,
};

function createConfig(extraConfig) {
    if (!extraConfig) {
        return DEFAULT_OPTIONS;
    }

    if (isString(extraConfig)) {
        return {
            ...DEFAULT_OPTIONS,
            replacement: extraConfig,
        };
    }

    const mergedBlackList = [
        ...blackList,
        ...(extraConfig.blackList && Array.isArray(extraConfig.blackList)
            ? extraConfig.blackList
            : []
        ),
    ];

    return {
        ...DEFAULT_OPTIONS,
        ...extraConfig,
        blackList: mergedBlackList,
    }
}

function badWords(input, options, callback) {
    if (!isString(input)) {
        throw new Error('[vn-badwords] string argument expected');
    }

    const config = createConfig(options);

    // "i" when matching, casing differences are ignored.
    const regexp = new RegExp("(" + config.blackList.join("|") + ")", "gi");

    input = input.normalize();

    const badWordsFiltered = [];

    const strFiltered = input.replace(regexp, (match) => {
        badWordsFiltered.push(match);
        return config.replacement.repeat(match.length);
    });

    if (callback) {
        callback(badWordsFiltered, badWordsFiltered.length)
    }

    if (config.validate) {
        return regexp.test(input);
    }

    return strFiltered;
}

module.exports = {
    badWords,
    blackList
}
