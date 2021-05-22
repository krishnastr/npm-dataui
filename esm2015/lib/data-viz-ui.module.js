import { NgModule } from '@angular/core';
import { DataVizUiComponent } from './data-viz-ui.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Config } from './authentication/config';
import { AnalyticsModule, AnalyticsService } from '@cdx/analytics';
import { AnalyticsConfig } from './config/analytics-config';
import { LoginComponent } from './authentication/login/login.component';
import { TokenInterceptor } from './authentication/token-interceptor';
import { DataVizUiService } from './data-viz-ui.service';
import { DataVizUiRoutingModule } from './data-viz-ui-routing.module';
import * as i0 from "@angular/core";
import * as i1 from "@cdx/analytics";
export class DataVizUiModule {
}
DataVizUiModule.ɵfac = function DataVizUiModule_Factory(t) { return new (t || DataVizUiModule)(); };
DataVizUiModule.ɵmod = i0.ɵɵdefineNgModule({ type: DataVizUiModule });
DataVizUiModule.ɵinj = i0.ɵɵdefineInjector({ providers: [
        Config,
        AnalyticsService,
        DataVizUiService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ], imports: [[
            CommonModule,
            ReactiveFormsModule,
            RouterModule,
            HttpClientModule,
            DataVizUiRoutingModule,
            AnalyticsModule.forRoot(AnalyticsConfig.SNOWPLOW_PARAMS)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DataVizUiModule, { declarations: [DataVizUiComponent,
        HeaderComponent,
        BookmarksComponent,
        VisualizationComponent,
        LoginComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        DataVizUiRoutingModule, i1.AnalyticsModule], exports: [DataVizUiComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    DataVizUiComponent,
                    HeaderComponent,
                    BookmarksComponent,
                    VisualizationComponent,
                    LoginComponent
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterModule,
                    HttpClientModule,
                    DataVizUiRoutingModule,
                    AnalyticsModule.forRoot(AnalyticsConfig.SNOWPLOW_PARAMS)
                ],
                providers: [
                    Config,
                    AnalyticsService,
                    DataVizUiService,
                    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
                ],
                exports: [
                    DataVizUiComponent,
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS12aXotdWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0YS12aXotdWkvc3JjL2xpYi9kYXRhLXZpei11aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOEJBQThCLENBQUM7OztBQTRCdEUsTUFBTSxPQUFPLGVBQWU7OzhFQUFmLGVBQWU7bURBQWYsZUFBZTt3REFWZjtRQUNULE1BQU07UUFDTixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0tBQ3hFLFlBYlE7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsc0JBQXNCO1lBQ3RCLGVBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztTQUN6RDt3RkFXVSxlQUFlLG1CQXhCeEIsa0JBQWtCO1FBQ2xCLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLGNBQWMsYUFHZCxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsc0JBQXNCLGlDQVV0QixrQkFBa0I7dUZBR1QsZUFBZTtjQTFCM0IsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2Ysa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLGNBQWM7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsc0JBQXNCO29CQUN0QixlQUFlLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7aUJBQ3pEO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxNQUFNO29CQUNOLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtpQkFDeEU7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtpQkFDbkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGFWaXpVaUNvbXBvbmVudCB9IGZyb20gJy4vZGF0YS12aXotdWkuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5cclxuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9va21hcmtzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Jvb2ttYXJrcy9ib29rbWFya3MuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92aXN1YWxpemF0aW9uL3Zpc3VhbGl6YXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vYXV0aGVudGljYXRpb24vY29uZmlnJztcclxuaW1wb3J0IHsgQW5hbHl0aWNzTW9kdWxlLCBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnQGNkeC9hbmFseXRpY3MnO1xyXG5pbXBvcnQgeyBBbmFseXRpY3NDb25maWcgfSBmcm9tICcuL2NvbmZpZy9hbmFseXRpY3MtY29uZmlnJztcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRva2VuSW50ZXJjZXB0b3IgfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uL3Rva2VuLWludGVyY2VwdG9yJztcclxuaW1wb3J0IHsgRGF0YVZpelVpU2VydmljZSB9IGZyb20gJy4vZGF0YS12aXotdWkuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFWaXpVaVJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2RhdGEtdml6LXVpLXJvdXRpbmcubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhVml6VWlDb21wb25lbnQsXHJcbiAgICBIZWFkZXJDb21wb25lbnQsXHJcbiAgICBCb29rbWFya3NDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29tcG9uZW50LFxyXG4gICAgTG9naW5Db21wb25lbnRcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgRGF0YVZpelVpUm91dGluZ01vZHVsZSxcclxuICAgIEFuYWx5dGljc01vZHVsZS5mb3JSb290KEFuYWx5dGljc0NvbmZpZy5TTk9XUExPV19QQVJBTVMpXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENvbmZpZyxcclxuICAgIEFuYWx5dGljc1NlcnZpY2UsXHJcbiAgICBEYXRhVml6VWlTZXJ2aWNlLFxyXG4gICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IFRva2VuSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBEYXRhVml6VWlDb21wb25lbnQsXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVZpelVpTW9kdWxlIHsgfVxyXG4iXX0=