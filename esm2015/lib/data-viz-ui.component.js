import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./config.service";
import * as i2 from "./snowplow/snowplow.service";
import * as i3 from "@angular/common";
import * as i4 from "./components/visualization/visualization.component";
import * as i5 from "./components/header/header.component";
function DataVizUiComponent_lib_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "lib-header", 3);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(3);
    i0.ɵɵproperty("visual", _r1);
} }
export class DataVizUiComponent {
    constructor(configService, snowplowService) {
        this.configService = configService;
        this.snowplowService = snowplowService;
        this.modules = {
            header: true,
            bookmarks: true,
        };
        this.bookmarks = {};
        this.uiElements = [];
        this.roles = [];
    }
    ngOnInit() {
        // Set userId in Snowplow
        this.snowplowService.setUserId();
        // Set appSessionId
        this.snowplowService.setAppSessionId();
    }
    ngOnChanges(changes) {
        Object.keys(changes).forEach(key => {
            changes[key] = changes[key].currentValue;
        });
        this.configService.updateValues(changes);
    }
}
DataVizUiComponent.ɵfac = function DataVizUiComponent_Factory(t) { return new (t || DataVizUiComponent)(i0.ɵɵdirectiveInject(i1.ConfigService), i0.ɵɵdirectiveInject(i2.SnowplowService)); };
DataVizUiComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DataVizUiComponent, selectors: [["lib-data-viz-ui"]], inputs: { modules: "modules", bookmarks: "bookmarks", uiElements: "uiElements", roles: "roles" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 1, consts: [[1, "app-container"], [3, "visual", 4, "ngIf"], ["visual", ""], [3, "visual"]], template: function DataVizUiComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, DataVizUiComponent_lib_header_1_Template, 1, 1, "lib-header", 1);
        i0.ɵɵelement(2, "lib-visualization", null, 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.configService.config.modules.header);
    } }, directives: [i3.NgIf, i4.VisualizationComponent, i5.HeaderComponent], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiComponent, [{
        type: Component,
        args: [{
                selector: 'lib-data-viz-ui',
                templateUrl: './data-viz-ui.component.html',
                styleUrls: [],
            }]
    }], function () { return [{ type: i1.ConfigService }, { type: i2.SnowplowService }]; }, { modules: [{
            type: Input
        }], bookmarks: [{
            type: Input
        }], uiElements: [{
            type: Input
        }], roles: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS12aXotdWkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0YS12aXotdWkvc3JjL2xpYi9kYXRhLXZpei11aS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2RhdGEtdml6LXVpLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7SUNDakYsZ0NBR2M7Ozs7SUFEWiw0QkFBaUI7O0FETXJCLE1BQU0sT0FBTyxrQkFBa0I7SUFXN0IsWUFDUyxhQUE0QixFQUMzQixlQUFnQztRQURqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFYakMsWUFBTyxHQUFXO1lBQ3pCLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQztRQUNPLGNBQVMsR0FBVyxFQUM1QixDQUFDO1FBQ08sZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQixVQUFLLEdBQWEsRUFBRSxDQUFDO0lBSzlCLENBQUM7SUFFRCxRQUFRO1FBQ04seUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7SUFFekMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7O29GQTdCVSxrQkFBa0I7dURBQWxCLGtCQUFrQjtRQ1QvQiw4QkFBMkI7UUFDekIsaUZBR2M7UUFDZCw2Q0FBK0M7UUFDakQsaUJBQU07O1FBSkQsZUFBOEM7UUFBOUMsOERBQThDOzt1RkRPdEMsa0JBQWtCO2NBTDlCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxTQUFTLEVBQUUsRUFBRTthQUNkOzhGQUdVLE9BQU87a0JBQWYsS0FBSztZQUlHLFNBQVM7a0JBQWpCLEtBQUs7WUFFRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTbm93cGxvd1NlcnZpY2UgfSBmcm9tICcuL3Nub3dwbG93L3Nub3dwbG93LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItZGF0YS12aXotdWknLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhLXZpei11aS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFWaXpVaUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcbiAgQElucHV0KCkgbW9kdWxlczogb2JqZWN0ID0ge1xyXG4gICAgaGVhZGVyOiB0cnVlLFxyXG4gICAgYm9va21hcmtzOiB0cnVlLFxyXG4gIH07XHJcbiAgQElucHV0KCkgYm9va21hcmtzOiBvYmplY3QgPSB7XHJcbiAgfTtcclxuICBASW5wdXQoKSB1aUVsZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHJvbGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzbm93cGxvd1NlcnZpY2U6IFNub3dwbG93U2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBTZXQgdXNlcklkIGluIFNub3dwbG93XHJcbiAgICB0aGlzLnNub3dwbG93U2VydmljZS5zZXRVc2VySWQoKTtcclxuICAgIC8vIFNldCBhcHBTZXNzaW9uSWRcclxuICAgIHRoaXMuc25vd3Bsb3dTZXJ2aWNlLnNldEFwcFNlc3Npb25JZCgpO1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgY2hhbmdlc1trZXldID0gY2hhbmdlc1trZXldLmN1cnJlbnRWYWx1ZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb25maWdTZXJ2aWNlLnVwZGF0ZVZhbHVlcyhjaGFuZ2VzKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImFwcC1jb250YWluZXJcIj5cclxuICA8bGliLWhlYWRlclxyXG4gICAgKm5nSWY9XCJ0aGlzLmNvbmZpZ1NlcnZpY2UuY29uZmlnLm1vZHVsZXMuaGVhZGVyXCJcclxuICAgIFt2aXN1YWxdPVwidmlzdWFsXCJcclxuICA+PC9saWItaGVhZGVyPlxyXG4gIDxsaWItdmlzdWFsaXphdGlvbiAjdmlzdWFsPjwvbGliLXZpc3VhbGl6YXRpb24+XHJcbjwvZGl2PlxyXG4iXX0=