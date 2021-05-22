import { AnalyticsEnvironment } from '@cdx/analytics';
export declare class AnalyticsConfig {
    static SNOWPLOW_ENVIRONMENTS_MAPPING: {
        [key: string]: string;
    };
    static SNOWPLOW_PARAMS: {
        appId: string;
        options: {
            snowplowEnvironmentProvider: {
                provide: import("@angular/core").InjectionToken<AnalyticsEnvironment>;
                useFactory: typeof getEnvironment;
            };
            tracking: {
                inferred: boolean;
                pageViews: boolean;
            };
        };
    };
}
export declare function getEnvironment(): AnalyticsEnvironment;
//# sourceMappingURL=analytics-config.d.ts.map