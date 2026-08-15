import Kuroshiro from "kuroshiro-enhance";
import type {
    ConvertOptions,
    FuriganaMapResult,
    FuriganaSegment
} from "kuroshiro-enhance";

declare const kuroshiro: Kuroshiro;
declare const dynamicOptions: ConvertOptions | undefined;

const normalResult: Promise<string> = kuroshiro.convert("日本語");
const segmentResult: Promise<FuriganaSegment[]> = kuroshiro.convert("日本語", { mode: "furigana_segments" });
const mapResult: Promise<FuriganaMapResult> = kuroshiro.convert("日本語", { mode: "furigana_map" });
const dynamicResult: Promise<string | FuriganaMapResult | FuriganaSegment[]> = kuroshiro.convert("日本語", dynamicOptions);

// Negative cases — see test/public-api.types.ts for the rationale. These guard
// the *built* .d.mts rather than the source, so they also catch a bundler or
// dts-rollup step that flattens the overloads on the way out.

// @ts-expect-error furigana_segments returns FuriganaSegment[], never a string
const segmentsNotString: Promise<string> = kuroshiro.convert("日本語", { mode: "furigana_segments" });
// @ts-expect-error furigana_map returns FuriganaMapResult, never a string
const mapNotString: Promise<string> = kuroshiro.convert("日本語", { mode: "furigana_map" });
// @ts-expect-error string modes never return FuriganaSegment[]
const stringNotSegments: Promise<FuriganaSegment[]> = kuroshiro.convert("日本語", { mode: "furigana" });
// @ts-expect-error a widened ConvertOptions cannot be narrowed to the string overload
const dynamicNotString: Promise<string> = kuroshiro.convert("日本語", dynamicOptions);
// @ts-expect-error mode is constrained to ConvertMode
const invalidMode: Promise<string> = kuroshiro.convert("日本語", { mode: "xxxx" });

void [normalResult, segmentResult, mapResult, dynamicResult];
void [segmentsNotString, mapNotString, stringNotSegments, dynamicNotString, invalidMode];
