export declare class AnalyticsStructuredEventsMapping {
    static STRUCTURED_ACTION: {
        click: string;
        load: string;
    };
    static STRUCTURED_CATEGORY: {
        'load-dashboard': string;
        login: string;
        logout: string;
        'create-bookmark': string;
        'update-bookmark': string;
        'delete-bookmark': string;
        'load-bookmarks': string;
        'select-bookmarks': string;
        'page-changed': string;
    };
    static fetchCategory(category: string): string;
    static fetchAction(action: string): string;
}
//# sourceMappingURL=analytics-structured-events-mapping.d.ts.map