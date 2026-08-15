import Kuroshiro from "../src/index";
import type {
    ConvertOptions,
    FuriganaMapResult,
    FuriganaSegment
} from "../src/types";

declare const kuroshiro: Kuroshiro;
declare const dynamicOptions: ConvertOptions;
declare const optionalDynamicOptions: ConvertOptions | undefined;

const normalResult: Promise<string> = kuroshiro.convert("日本語");
const explicitStringResult: Promise<string> = kuroshiro.convert("日本語", { mode: "furigana" });
const segmentResult: Promise<FuriganaSegment[]> = kuroshiro.convert("日本語", { mode: "furigana_segments" });
const mapResult: Promise<FuriganaMapResult> = kuroshiro.convert("日本語", { mode: "furigana_map" });
const dynamicResult: Promise<string | FuriganaMapResult | FuriganaSegment[]> = kuroshiro.convert("日本語", dynamicOptions);
const optionalDynamicResult: Promise<string | FuriganaMapResult | FuriganaSegment[]> = kuroshiro.convert("日本語", optionalDynamicOptions);

// Negative cases. The assignments above only prove the return types are
// *assignable* to what we expect, which `any` also satisfies — so on their own
// they cannot catch a regression that widens `convert` back to `Promise<any>`.
// These directives can: if the overloads stop discriminating, the errors below
// disappear and `tsc` fails on the now-unused `@ts-expect-error`.

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

void [normalResult, explicitStringResult, segmentResult, mapResult, dynamicResult, optionalDynamicResult];
void [segmentsNotString, mapNotString, stringNotSegments, dynamicNotString, invalidMode];
