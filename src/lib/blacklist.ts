import blackList from './lang/vi.json';

type BadWordsOptions = {
    /**
     * Extra words to add to the black list
     * @default []
     */
    readonly blackList: string[];

    /**
     * The string to replace the bad words with
     * @default '*'
     */
    readonly replacement: string;

    /**
     * Whether to return the validation, or return the replaced string
     * If true, return the validation result
     * If false, return the replaced string
     * @default false
     */
    readonly validate: boolean;
}

type BadWordsCallback = (badWordsMatch: string[], length: number) => unknown;

function isString(input: unknown): input is string {
    return typeof input === 'string';
}

const DEFAULT_OPTIONS: BadWordsOptions = {
    blackList,
    replacement: '*',
    validate: false,
};

function createConfig(extraConfig?: string | Partial<BadWordsOptions>) {
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
        ...DEFAULT_OPTIONS.blackList,
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

function badWords(input: string, options?: string | Partial<BadWordsOptions>, callback?: BadWordsCallback) {
    if (!isString(input)) {
        throw new Error('[vn-badwords] string argument expected');
    }

    const config = createConfig(options);

    // "i" when matching, casing differences are ignored.
    const regexp = new RegExp("(" + config.blackList.join("|") + ")", "gi");

    input = input.normalize();

    const badWordsFiltered: string[] = [];

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

export {
    badWords,
    blackList,
};
