export interface Options {
  allowBookendWhitespace?: boolean;
  allowEmptyList?: boolean;
  allowEmptyString?: boolean;
  allowLeadingWhitespace?: boolean;
  allowMissingIndices?: boolean;
  allowMissingLemma?: boolean;
  allowNewlines?: boolean;
  allowNoDependencies?: boolean;
  allowTrailingWhitespace?: boolean;
  allowWhiteLines?: boolean;
  allowZeroFields?: boolean;
  allowZeroTokens?: boolean;
  bracketsAllowanceTreshold?: number;
  coerceMultipleSpacesAfterSemicolonToTab?: boolean;
  enhanced?: boolean;
  equalizeWhitespace?: boolean;
  indentString?: string|RegExp|null,
  interpretAs?: string;
  omitIndices?: boolean;
  requireOne?: boolean;
  requireOneMatch?: boolean;
  requireTenParams?: boolean;
  returnAllMatches?: boolean;
  returnAllPossibilities?: boolean;
  spacesPerTab?: null,
  suppressDetectorErrors?: boolean;
  suppressParserErrors?: boolean;
  trimChunks?: boolean;
  useTabIndent?: boolean;
}