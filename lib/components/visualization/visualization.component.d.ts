import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { VisualizationService } from './visualization.service';
import { AuthenticationService } from './../../authentication/authentication.service';
import { Subject } from 'rxjs';
import { SnowplowService } from './../../snowplow/snowplow.service';
import { ConfigService } from './../../config.service';
import { PowerbiBookmark } from '../bookmarks/bookmarks.model';
import * as i0 from "@angular/core";
export declare class VisualizationComponent implements OnInit, OnDestroy {
    private visualizationService;
    private authService;
    private snowplowService;
    private configService;
    report: any;
    unSubscribe: Subject<unknown>;
    MINUTES_BEFORE_EXPIRATION: number;
    INTERVAL_TIME: number;
    tokenExpiration: string;
    powerbi: any;
    reportsContainer: any;
    save: EventEmitter<any>;
    defaultView: EventEmitter<any>;
    constructor(visualizationService: VisualizationService, authService: AuthenticationService, snowplowService: SnowplowService, configService: ConfigService);
    ngOnInit(): void;
    getReports(embedResponse: any): any;
    getBookmarkState(type: string): Promise<PowerbiBookmark>;
    loadReport(bookmark: any, type: string): void;
    getEmbedToken(type: string, taxonomy?: string): void;
    subscribeGetEmbedToken(resp: any, type: string): void;
    getReportName(): string;
    checkTokenAndUpdate(): void;
    updateToken(resp: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<VisualizationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<VisualizationComponent, "lib-visualization", never, {}, { "save": "save"; "defaultView": "defaultView"; }, never, never>;
}
//# sourceMappingURL=visualization.component.d.ts.map