import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfigService } from './config.service';
import { SnowplowService } from './snowplow/snowplow.service';
import * as i0 from "@angular/core";
export declare class DataVizUiComponent implements OnInit, OnChanges {
    configService: ConfigService;
    private snowplowService;
    modules: object;
    bookmarks: object;
    uiElements: string[];
    roles: string[];
    constructor(configService: ConfigService, snowplowService: SnowplowService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDef<DataVizUiComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<DataVizUiComponent, "lib-data-viz-ui", never, { "modules": "modules"; "bookmarks": "bookmarks"; "uiElements": "uiElements"; "roles": "roles"; }, {}, never, never>;
}
//# sourceMappingURL=data-viz-ui.component.d.ts.map