/**
 * Token interface representing a parsed morphological token.
 */
export interface Token {
    surface_form: string;
    pos: string;
    reading?: string;
    pronunciation?: string;
}

/**
 * Interface that all Kuroshiro analyzers must implement.
 */
export interface Analyzer {
    init(): Promise<void>;
    parse(str: string): Promise<Token[]>;
}

/**
 * Valid syllabaries for conversion targets.
 */
export type TargetSyllabary = "hiragana" | "katakana" | "romaji";

/**
 * Valid modes for conversion.
 */
export type ConvertMode = "normal" | "spaced" | "okurigana" | "furigana" | "furigana_segments" | "furigana_map";

/**
 * Valid romanization systems.
 */
export type RomanizationSystem = "nippon" | "passport" | "hepburn";

/**
 * Options passed to convert method.
 */
export interface ConvertOptions {
    to?: TargetSyllabary;
    mode?: ConvertMode;
    includeKatakana?: boolean;
    romajiSystem?: RomanizationSystem;
    delimiter_start?: string;
    delimiter_end?: string;
}

/** Conversion options for modes that return a string. */
export interface StringConvertOptions extends ConvertOptions {
    mode?: Exclude<ConvertMode, "furigana_segments" | "furigana_map">;
}

/** Conversion options for structured furigana segments. */
export interface FuriganaSegmentsConvertOptions extends ConvertOptions {
    mode: "furigana_segments";
}

/** Conversion options for the deprecated furigana map format. */
export interface FuriganaMapConvertOptions extends ConvertOptions {
    mode: "furigana_map";
}

/**
 * A single segment of furigana_segments output.
 * `text` is a slice of the original input; `ruby` is present only when the
 * segment carries a reading (kanji, or katakana when includeKatakana is set).
 * Newlines are emitted as their own ruby-less segments.
 */
export interface FuriganaSegment {
    text: string;
    ruby?: string;
}

/**
 * @deprecated Use "furigana_segments" mode ({@link FuriganaSegment}[]) instead. Will be removed in the next major version.
 */
export interface FuriganaMapResult {
    text: string;
    ruby: Array<{ s: number; e: number; rt: string }>;
}
