import DEFAULT_BLACKLIST from "./lang/vi.json";

type DefinitelyString<T> = Extract<T, string> extends never
  ? string
  : Extract<T, string> extends any
  ? string
  : Extract<T, string>;

function isString<T>(input: T | string): input is DefinitelyString<T> {
  return typeof input === "string";
}

type DefinitelyArray<T> = Extract<T, Array<any> | ReadonlyArray<any>> extends never
  ? ReadonlyArray<unknown>
  : Extract<T, Array<any> | ReadonlyArray<any>>;

function isArray<T>(input: T | ReadonlyArray<unknown>): input is DefinitelyArray<T> {
  return Array.isArray(input);
}

type DefinitelyFunction<T> = Extract<T, Function> extends never ? Function : Extract<T, Function>;

function isFunc<T>(input: T | Function): input is DefinitelyFunction<T> {
  return typeof input === "function";
}

export type BadWordsOptions = {
  /**
   * Callback to create a custom blacklist.
   * Can be used to extend the default blacklist.
   * @default []
   */
  readonly blackList: (defaultBlacklist: string[]) => string[];

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
};

type BadWordsConfig = Omit<BadWordsOptions, "blackList"> & {
  readonly blackList: string[];
};

export type BadWordsCallback = (badWordsMatch: string[], length: number) => unknown;

type BadWords = boolean | string;

const DEFAULT_OPTIONS: BadWordsOptions = {
  blackList: () => DEFAULT_BLACKLIST,
  replacement: "*",
  validate: false,
};

function createConfig(extraConfig?: string | Partial<BadWordsOptions>): BadWordsConfig {
  if (!extraConfig) {
    return {
      ...DEFAULT_OPTIONS,
      blackList: DEFAULT_BLACKLIST,
    };
  }

  if (isString(extraConfig)) {
    return {
      ...DEFAULT_OPTIONS,
      blackList: DEFAULT_BLACKLIST,
      replacement: extraConfig,
    };
  }

  const { blackList: extraBlacklist, ...otherExtraConfig } = extraConfig;

  let customBlackList = extraBlacklist && isFunc(extraBlacklist) ? extraBlacklist(DEFAULT_BLACKLIST) : [];
  if (!isArray(customBlackList) || customBlackList.length <= 0) {
    customBlackList = DEFAULT_BLACKLIST;
  }

  return {
    ...DEFAULT_OPTIONS,
    ...otherExtraConfig,
    blackList: customBlackList,
  };
}

export function badWords(
  input: string,
  options?: string | Partial<BadWordsOptions>,
  callback?: BadWordsCallback
): BadWords {
  if (!isString(input)) {
    throw new Error("[vn-badwords] string argument expected");
  }

  const config = createConfig(options);

  // "i" when matching, casing differences are ignored.
  const regexp = new RegExp(`(\\s|^)(\\b${config.blackList.join("\\b|\\b")}\\b)(\\s|$)`, "gi");

  input = input.normalize();

  const badWordsMatched: string[] = [];

  const strReplace = input.replace(regexp, (match) => {
    badWordsMatched.push(match);
    return config.replacement.repeat(match.length);
  });

  if (callback) {
    callback(badWordsMatched, badWordsMatched.length);
  }

  if (config.validate) {
    return regexp.test(input);
  }

  return strReplace;
}

export { DEFAULT_BLACKLIST as blackList };
