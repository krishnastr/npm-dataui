import { Component, EventEmitter, Output, } from '@angular/core';
import * as models from 'powerbi-models';
import { VisualizationService } from './visualization.service';
import * as pbi from 'powerbi-client';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./visualization.service";
import * as i2 from "./../../authentication/authentication.service";
import * as i3 from "./../../snowplow/snowplow.service";
import * as i4 from "./../../config.service";
export class VisualizationComponent {
    constructor(visualizationService, authService, snowplowService, configService) {
        this.visualizationService = visualizationService;
        this.authService = authService;
        this.snowplowService = snowplowService;
        this.configService = configService;
        this.unSubscribe = new Subject();
        this.MINUTES_BEFORE_EXPIRATION = 10;
        this.INTERVAL_TIME = 4; // In minutes
        this.tokenExpiration = '';
        this.save = new EventEmitter();
        this.defaultView = new EventEmitter();
    }
    ngOnInit() {
        this.configService.getConfigObject().subscribe(config => {
            this.getEmbedToken('new');
        });
        // Grab the reference to the div HTML element that will host the report.
        this.reportsContainer = (document.getElementById('reportsContainer'));
        // Embed the report and display it within the div container.
        this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        this.powerbi.bootstrap(this.reportsContainer, {
            type: 'report',
            tokenType: models.TokenType.Embed,
            uniqueId: 1,
            embedUrl: '',
            accessToken: '',
            settings: {
                navContentPaneEnabled: false,
            },
        });
        setInterval(() => this.checkTokenAndUpdate(), this.INTERVAL_TIME * 60 * 1000);
        this.getEmbedToken('new');
        // Track load dashboard event
        this.snowplowService.eventTracking('load-dashboard', 'load', 'reportName', '', this.getReportName());
    }
    getReports(embedResponse) {
        const config = {
            type: 'report',
            tokenType: models.TokenType.Embed,
            uniqueId: embedResponse.embedReports[0].reportId,
            embedUrl: embedResponse.embedReports[0].embedUrl,
            accessToken: embedResponse.embedToken.token,
            settings: {
                navContentPaneEnabled: false,
            },
        };
        this.report = this.powerbi.embed(this.reportsContainer, config);
        // Report.off removes a given event handler if it exists.
        this.report.off('loaded');
        // this.report.on will add an event handler which prints to Log window.
        this.report.on('loaded', (e) => {
            this.getBookmarkState('defaultView');
        });
        this.report.on('pageChanged', (page) => {
            // Track page changed event
            this.snowplowService.eventTracking('page-changed', 'click', 'pageName', '', page.detail.newPage.displayName);
        });
        this.report.on('error', (event) => {
            this.report.off('error');
        });
    }
    getBookmarkState(type) {
        const state = this.report.bookmarksManager.capture({
            allPages: true,
            personalizeVisuals: true,
        });
        // defaultView will be called only once on initial load of powerbi report
        type === 'defaultView'
            ? this.defaultView.emit(state)
            : this.save.emit(state);
        return state;
    }
    loadReport(bookmark, type) {
        // const state = bookmark.bookmarkState ? bookmark.bookmarkState : bookmark.state;
        this.report.bookmarksManager
            .applyState(bookmark.bookmarkState)
            .then((appliedState) => {
            this.report.getPages().then((pages) => {
                this.report.setPage(pages[0].name);
            });
        });
    }
    getEmbedToken(type, taxonomy) {
        const roles = this.configService.config.roles;
        let reportName = roles ? this.getReportName() : '';
        if (taxonomy) {
            reportName = taxonomy;
        }
        this.visualizationService
            .getEmbedToken(reportName)
            .pipe(takeUntil(this.unSubscribe))
            .subscribe((resp) => {
            this.subscribeGetEmbedToken(resp, type);
        });
    }
    subscribeGetEmbedToken(resp, type) {
        this.tokenExpiration = resp['embedToken'].expiration;
        if (type === 'new') {
            this.getReports(resp);
        }
        else {
            this.updateToken(resp);
        }
    }
    getReportName() {
        const reportNameRoleMapping = {
            Distributor: 'DIST',
            Manufacturer: 'MAN'
        };
        const role = this.configService.config.roles;
        if (role && role[0] === 'Distributor') {
            const reportName = localStorage.getItem('distributorTaxonomy');
            if (reportName) {
                return reportName;
            }
            else {
                localStorage.setItem('distributorTaxonomy', 'DIST');
                return 'DIST';
            }
        }
        return reportNameRoleMapping[role[0]] || '';
    }
    checkTokenAndUpdate() {
        // Get the current time
        const currentTime = Date.now();
        const expiration = Date.parse(this.tokenExpiration);
        // Time until token expiration in milliseconds
        const timeUntilExpiration = expiration - currentTime;
        const timeToUpdate = this.MINUTES_BEFORE_EXPIRATION * 60 * 1000;
        // Update the token if it is about to expired
        if (timeUntilExpiration <= timeToUpdate) {
            this.getEmbedToken('update');
        }
    }
    updateToken(resp) {
        // Set the new access token
        this.report.setAccessToken(resp.embedToken.token);
    }
    ngOnDestroy() {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }
}
VisualizationComponent.ɵfac = function VisualizationComponent_Factory(t) { return new (t || VisualizationComponent)(i0.ɵɵdirectiveInject(i1.VisualizationService), i0.ɵɵdirectiveInject(i2.AuthenticationService), i0.ɵɵdirectiveInject(i3.SnowplowService), i0.ɵɵdirectiveInject(i4.ConfigService)); };
VisualizationComponent.ɵcmp = i0.ɵɵdefineComponent({ type: VisualizationComponent, selectors: [["lib-visualization"]], outputs: { save: "save", defaultView: "defaultView" }, features: [i0.ɵɵProvidersFeature([VisualizationService])], decls: 1, vars: 0, consts: [["id", "reportsContainer", 2, "width", "100%", "height", "1000px"]], template: function VisualizationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VisualizationComponent, [{
        type: Component,
        args: [{
                selector: 'lib-visualization',
                templateUrl: './visualization.component.html',
                providers: [VisualizationService],
            }]
    }], function () { return [{ type: i1.VisualizationService }, { type: i2.AuthenticationService }, { type: i3.SnowplowService }, { type: i4.ConfigService }]; }, { save: [{
            type: Output
        }], defaultView: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi92aXN1YWxpemF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvY29tcG9uZW50cy92aXN1YWxpemF0aW9uL3Zpc3VhbGl6YXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBR1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFFekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0QsT0FBTyxLQUFLLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBVTNDLE1BQU0sT0FBTyxzQkFBc0I7SUFVakMsWUFDVSxvQkFBMEMsRUFDMUMsV0FBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsYUFBNEI7UUFINUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBWnRDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1Qiw4QkFBeUIsR0FBRyxFQUFFLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBQ2hDLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBR1gs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QVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2FBQ2xDO3FLQVNXLElBQUk7a0JBQWIsTUFBTTtZQUNHLFdBQVc7a0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIG1vZGVscyBmcm9tICdwb3dlcmJpLW1vZGVscyc7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uU2VydmljZSB9IGZyb20gJy4vdmlzdWFsaXphdGlvbi5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIHBiaSBmcm9tICdwb3dlcmJpLWNsaWVudCc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTbm93cGxvd1NlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3Nub3dwbG93L3Nub3dwbG93LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvd2VyYmlCb29rbWFyayB9IGZyb20gJy4uL2Jvb2ttYXJrcy9ib29rbWFya3MubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItdmlzdWFsaXphdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByb3ZpZGVyczogW1Zpc3VhbGl6YXRpb25TZXJ2aWNlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcmVwb3J0OiBhbnk7XHJcbiAgdW5TdWJzY3JpYmUgPSBuZXcgU3ViamVjdCgpO1xyXG4gIE1JTlVURVNfQkVGT1JFX0VYUElSQVRJT04gPSAxMDtcclxuICBJTlRFUlZBTF9USU1FID0gNDsgLy8gSW4gbWludXRlc1xyXG4gIHRva2VuRXhwaXJhdGlvbiA9ICcnO1xyXG4gIHBvd2VyYmk6IGFueTtcclxuICByZXBvcnRzQ29udGFpbmVyOiBhbnk7XHJcbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlZmF1bHRWaWV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB2aXN1YWxpemF0aW9uU2VydmljZTogVmlzdWFsaXphdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNub3dwbG93U2VydmljZTogU25vd3Bsb3dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWdPYmplY3QoKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgdGhpcy5nZXRFbWJlZFRva2VuKCduZXcnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gR3JhYiB0aGUgcmVmZXJlbmNlIHRvIHRoZSBkaXYgSFRNTCBlbGVtZW50IHRoYXQgd2lsbCBob3N0IHRoZSByZXBvcnQuXHJcbiAgICB0aGlzLnJlcG9ydHNDb250YWluZXIgPSAoXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBvcnRzQ29udGFpbmVyJylcclxuICAgICkgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgLy8gRW1iZWQgdGhlIHJlcG9ydCBhbmQgZGlzcGxheSBpdCB3aXRoaW4gdGhlIGRpdiBjb250YWluZXIuXHJcbiAgICB0aGlzLnBvd2VyYmkgPSBuZXcgcGJpLnNlcnZpY2UuU2VydmljZShcclxuICAgICAgcGJpLmZhY3Rvcmllcy5ocG1GYWN0b3J5LFxyXG4gICAgICBwYmkuZmFjdG9yaWVzLndwbXBGYWN0b3J5LFxyXG4gICAgICBwYmkuZmFjdG9yaWVzLnJvdXRlckZhY3RvcnlcclxuICAgICk7XHJcbiAgICB0aGlzLnBvd2VyYmkuYm9vdHN0cmFwKHRoaXMucmVwb3J0c0NvbnRhaW5lciwge1xyXG4gICAgICB0eXBlOiAncmVwb3J0JyxcclxuICAgICAgdG9rZW5UeXBlOiBtb2RlbHMuVG9rZW5UeXBlLkVtYmVkLFxyXG4gICAgICB1bmlxdWVJZDogMSxcclxuICAgICAgZW1iZWRVcmw6ICcnLFxyXG4gICAgICBhY2Nlc3NUb2tlbjogJycsXHJcbiAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgbmF2Q29udGVudFBhbmVFbmFibGVkOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgc2V0SW50ZXJ2YWwoXHJcbiAgICAgICgpID0+IHRoaXMuY2hlY2tUb2tlbkFuZFVwZGF0ZSgpLFxyXG4gICAgICB0aGlzLklOVEVSVkFMX1RJTUUgKiA2MCAqIDEwMDBcclxuICAgICk7XHJcbiAgICB0aGlzLmdldEVtYmVkVG9rZW4oJ25ldycpO1xyXG4gICAgLy8gVHJhY2sgbG9hZCBkYXNoYm9hcmQgZXZlbnRcclxuICAgIHRoaXMuc25vd3Bsb3dTZXJ2aWNlLmV2ZW50VHJhY2tpbmcoJ2xvYWQtZGFzaGJvYXJkJywgJ2xvYWQnLCAncmVwb3J0TmFtZScsICcnLCB0aGlzLmdldFJlcG9ydE5hbWUoKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXBvcnRzKGVtYmVkUmVzcG9uc2U6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgIHR5cGU6ICdyZXBvcnQnLFxyXG4gICAgICB0b2tlblR5cGU6IG1vZGVscy5Ub2tlblR5cGUuRW1iZWQsXHJcbiAgICAgIHVuaXF1ZUlkOiBlbWJlZFJlc3BvbnNlLmVtYmVkUmVwb3J0c1swXS5yZXBvcnRJZCxcclxuICAgICAgZW1iZWRVcmw6IGVtYmVkUmVzcG9uc2UuZW1iZWRSZXBvcnRzWzBdLmVtYmVkVXJsLFxyXG4gICAgICBhY2Nlc3NUb2tlbjogZW1iZWRSZXNwb25zZS5lbWJlZFRva2VuLnRva2VuLFxyXG4gICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgIG5hdkNvbnRlbnRQYW5lRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICB9IGFzIGFueTtcclxuICAgIHRoaXMucmVwb3J0ID0gdGhpcy5wb3dlcmJpLmVtYmVkKHRoaXMucmVwb3J0c0NvbnRhaW5lciwgY29uZmlnKTtcclxuICAgIC8vIFJlcG9ydC5vZmYgcmVtb3ZlcyBhIGdpdmVuIGV2ZW50IGhhbmRsZXIgaWYgaXQgZXhpc3RzLlxyXG4gICAgdGhpcy5yZXBvcnQub2ZmKCdsb2FkZWQnKTtcclxuICAgIC8vIHRoaXMucmVwb3J0Lm9uIHdpbGwgYWRkIGFuIGV2ZW50IGhhbmRsZXIgd2hpY2ggcHJpbnRzIHRvIExvZyB3aW5kb3cuXHJcbiAgICB0aGlzLnJlcG9ydC5vbignbG9hZGVkJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmdldEJvb2ttYXJrU3RhdGUoJ2RlZmF1bHRWaWV3Jyk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVwb3J0Lm9uKCdwYWdlQ2hhbmdlZCcsIChwYWdlOiBhbnkpID0+IHtcclxuICAgICAgLy8gVHJhY2sgcGFnZSBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgIHRoaXMuc25vd3Bsb3dTZXJ2aWNlLmV2ZW50VHJhY2tpbmcoJ3BhZ2UtY2hhbmdlZCcsICdjbGljaycsICdwYWdlTmFtZScsICcnLCBwYWdlLmRldGFpbC5uZXdQYWdlLmRpc3BsYXlOYW1lKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZXBvcnQub24oJ2Vycm9yJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5yZXBvcnQub2ZmKCdlcnJvcicpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRCb29rbWFya1N0YXRlKHR5cGU6IHN0cmluZyk6IFByb21pc2U8UG93ZXJiaUJvb2ttYXJrPiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMucmVwb3J0LmJvb2ttYXJrc01hbmFnZXIuY2FwdHVyZSh7XHJcbiAgICAgIGFsbFBhZ2VzOiB0cnVlLFxyXG4gICAgICBwZXJzb25hbGl6ZVZpc3VhbHM6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIC8vIGRlZmF1bHRWaWV3IHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZSBvbiBpbml0aWFsIGxvYWQgb2YgcG93ZXJiaSByZXBvcnRcclxuICAgIHR5cGUgPT09ICdkZWZhdWx0VmlldydcclxuICAgICAgPyB0aGlzLmRlZmF1bHRWaWV3LmVtaXQoc3RhdGUpXHJcbiAgICAgIDogdGhpcy5zYXZlLmVtaXQoc3RhdGUpO1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgbG9hZFJlcG9ydChib29rbWFyazogYW55LCB0eXBlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIC8vIGNvbnN0IHN0YXRlID0gYm9va21hcmsuYm9va21hcmtTdGF0ZSA/IGJvb2ttYXJrLmJvb2ttYXJrU3RhdGUgOiBib29rbWFyay5zdGF0ZTtcclxuICAgIHRoaXMucmVwb3J0LmJvb2ttYXJrc01hbmFnZXJcclxuICAgICAgLmFwcGx5U3RhdGUoYm9va21hcmsuYm9va21hcmtTdGF0ZSlcclxuICAgICAgLnRoZW4oKGFwcGxpZWRTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZXBvcnQuZ2V0UGFnZXMoKS50aGVuKChwYWdlczogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydC5zZXRQYWdlKHBhZ2VzWzBdLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldEVtYmVkVG9rZW4odHlwZTogc3RyaW5nLCB0YXhvbm9teT86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3Qgcm9sZXMgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuY29uZmlnLnJvbGVzO1xyXG4gICAgbGV0IHJlcG9ydE5hbWU6IHN0cmluZyA9IHJvbGVzID8gdGhpcy5nZXRSZXBvcnROYW1lKCkgOiAnJztcclxuICAgIGlmICh0YXhvbm9teSkge1xyXG4gICAgICByZXBvcnROYW1lID0gdGF4b25vbXk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpc3VhbGl6YXRpb25TZXJ2aWNlXHJcbiAgICAgIC5nZXRFbWJlZFRva2VuKHJlcG9ydE5hbWUpXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLnVuU3Vic2NyaWJlKSlcclxuICAgICAgLnN1YnNjcmliZSgocmVzcCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlR2V0RW1iZWRUb2tlbihyZXNwLCB0eXBlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVHZXRFbWJlZFRva2VuKHJlc3A6IGFueSwgdHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnRva2VuRXhwaXJhdGlvbiA9IHJlc3BbJ2VtYmVkVG9rZW4nXS5leHBpcmF0aW9uO1xyXG4gICAgaWYgKHR5cGUgPT09ICduZXcnKSB7XHJcbiAgICAgIHRoaXMuZ2V0UmVwb3J0cyhyZXNwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBkYXRlVG9rZW4ocmVzcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSZXBvcnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCByZXBvcnROYW1lUm9sZU1hcHBpbmc6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgIERpc3RyaWJ1dG9yOiAnRElTVCcsXHJcbiAgICAgIE1hbnVmYWN0dXJlcjogJ01BTidcclxuICAgIH07XHJcbiAgICBjb25zdCByb2xlID0gdGhpcy5jb25maWdTZXJ2aWNlLmNvbmZpZy5yb2xlcztcclxuICAgIGlmIChyb2xlICYmIHJvbGVbMF0gPT09ICdEaXN0cmlidXRvcicpIHtcclxuICAgICAgY29uc3QgcmVwb3J0TmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkaXN0cmlidXRvclRheG9ub215Jyk7XHJcbiAgICAgIGlmIChyZXBvcnROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcG9ydE5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Rpc3RyaWJ1dG9yVGF4b25vbXknLCAnRElTVCcpO1xyXG4gICAgICAgIHJldHVybiAnRElTVCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXBvcnROYW1lUm9sZU1hcHBpbmdbcm9sZVswXV0gfHwgJyc7XHJcbiAgfVxyXG5cclxuICBjaGVja1Rva2VuQW5kVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWVcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IGV4cGlyYXRpb24gPSBEYXRlLnBhcnNlKHRoaXMudG9rZW5FeHBpcmF0aW9uKTtcclxuXHJcbiAgICAvLyBUaW1lIHVudGlsIHRva2VuIGV4cGlyYXRpb24gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICBjb25zdCB0aW1lVW50aWxFeHBpcmF0aW9uID0gZXhwaXJhdGlvbiAtIGN1cnJlbnRUaW1lO1xyXG4gICAgY29uc3QgdGltZVRvVXBkYXRlID0gdGhpcy5NSU5VVEVTX0JFRk9SRV9FWFBJUkFUSU9OICogNjAgKiAxMDAwO1xyXG4gICAgLy8gVXBkYXRlIHRoZSB0b2tlbiBpZiBpdCBpcyBhYm91dCB0byBleHBpcmVkXHJcbiAgICBpZiAodGltZVVudGlsRXhwaXJhdGlvbiA8PSB0aW1lVG9VcGRhdGUpIHtcclxuICAgICAgdGhpcy5nZXRFbWJlZFRva2VuKCd1cGRhdGUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVRva2VuKHJlc3A6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gU2V0IHRoZSBuZXcgYWNjZXNzIHRva2VuXHJcbiAgICB0aGlzLnJlcG9ydC5zZXRBY2Nlc3NUb2tlbihyZXNwLmVtYmVkVG9rZW4udG9rZW4pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnVuU3Vic2NyaWJlLm5leHQoKTtcclxuICAgIHRoaXMudW5TdWJzY3JpYmUuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBpZD1cInJlcG9ydHNDb250YWluZXJcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMDBweDtcIj48L2Rpdj5cclxuIl19