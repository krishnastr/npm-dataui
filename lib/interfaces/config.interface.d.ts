export interface Config {
    modules: {
        header: boolean;
        bookmarks: boolean;
    };
    bookmarks: {
        envBasedReportIdsMap: {
            [key: string]: {
                [key: string]: string;
            };
        };
        embedUrlQueryParamsMap: {
            [key: string]: {
                [key: string]: {
                    [key: string]: any;
                };
            };
        };
    };
    uiElements: string[];
    roles: string[];
}
//# sourceMappingURL=config.interface.d.ts.map