// Temporary shim: kuroshiro-analyzer-kuromoji ships no TypeScript declarations.
// Remove this file once it does — a stale shim may mask or conflict with
// upstream types, and `skipLibCheck: true` can hide declaration conflicts.
// See https://github.com/hexenq/kuroshiro-analyzer-kuromoji/issues
declare module "kuroshiro-analyzer-kuromoji" {
    export default class KuromojiAnalyzer {
        init(): Promise<void>;
        parse(str: string): Promise<import("../src/types").Token[]>;
    }
}
