import { AfterContentInit, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';
import { VisualizationComponent } from '../visualization/visualization.component';
import * as i0 from "@angular/core";
export declare class HeaderComponent implements OnInit, AfterContentInit {
    configService: ConfigService;
    visual: VisualizationComponent;
    constructor(configService: ConfigService);
    uiElementsListing(): string[];
    ngOnInit(): void;
    ngAfterContentInit(): void;
    appendElements(elements: string[]): void;
    static ɵfac: i0.ɵɵFactoryDef<HeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<HeaderComponent, "lib-header", never, { "visual": "visual"; }, {}, never, never>;
}
//# sourceMappingURL=header.component.d.ts.map