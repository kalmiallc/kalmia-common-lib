/**
 * Standard logger. This logger uses common logging methods with addition to test and db methods.
 * Test method runs on [INF] level, providing additional [ TEST ] argument.
 * DB method runs on [VERBOSE] level, providing additional [ DB ] argument.
 *
 * Both test and db level can be filtered regardless of the level, but be included in corresponding levels.
 *
 */
export declare class StandardLogger {
    private loglevel;
    setLogLevel(ll: string): void;
    info(args: any[]): void;
    debug(args: any[]): void;
    verbose(args: any[]): void;
    warn(args: any[]): void;
    error(args: any[]): void;
    test(args: any[]): void;
    db(args: any[]): void;
}
//# sourceMappingURL=logger.d.ts.map