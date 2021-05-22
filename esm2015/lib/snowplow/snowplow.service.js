import { Injectable } from '@angular/core';
import { AnalyticsStructuredEventsMapping } from '../config/analytics-structured-events-mapping';
import * as i0 from "@angular/core";
import * as i1 from "@cdx/analytics";
import * as i2 from "../authentication/authentication.service";
export class SnowplowService {
    constructor(analyticsService, authService) {
        this.analyticsService = analyticsService;
        this.authService = authService;
    }
    setUserId() {
        const userId = this.authService.getUserEmail();
        if (userId) {
            // Since userId represents sensitive information - email, second parameter useHash is set to true
            this.analyticsService.setUserId(userId, true);
        }
    }
    setCustomerId() {
    }
    setAppSessionId() {
        const userSessionId = this.authService.getAuthorizationToken();
        if (userSessionId) {
            this.analyticsService.setAppSessionId(userSessionId);
        }
    }
    fetchStructuredEventCategory(category) {
        return AnalyticsStructuredEventsMapping.fetchCategory(category);
    }
    fetchStructuredEventAction(action) {
        return AnalyticsStructuredEventsMapping.fetchAction(action);
    }
    pageTracking(pageName) {
        this.analyticsService.trackPage(pageName);
    }
    eventTracking(category, action, label, property, value) {
        category = this.fetchStructuredEventCategory(category);
        action = this.fetchStructuredEventAction(action);
        if (label || property || value) {
            this.analyticsService.trackEventFull(category, action, label, property, value);
        }
        else {
            this.analyticsService.trackEvent(category, action);
        }
    }
}
SnowplowService.ɵfac = function SnowplowService_Factory(t) { return new (t || SnowplowService)(i0.ɵɵinject(i1.AnalyticsService), i0.ɵɵinject(i2.AuthenticationService)); };
SnowplowService.ɵprov = i0.ɵɵdefineInjectable({ token: SnowplowService, factory: SnowplowService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SnowplowService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.AnalyticsService }, { type: i2.AuthenticationService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vd3Bsb3cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvc25vd3Bsb3cvc25vd3Bsb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLCtDQUErQyxDQUFDOzs7O0FBT2pHLE1BQU0sT0FBTyxlQUFlO0lBRTFCLFlBQ1UsZ0JBQWtDLEVBQ2xDLFdBQWtDO1FBRGxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO0lBRTVDLENBQUM7SUFFRCxTQUFTO1FBQ1AsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQyxJQUFJLE1BQU0sRUFBRTtZQUNWLGlHQUFpRztZQUNqRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxhQUFhO0lBRWIsQ0FBQztJQUVELGVBQWU7UUFDYixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0QsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxRQUFnQjtRQUMzQyxPQUFPLGdDQUFnQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsMEJBQTBCLENBQUMsTUFBYztRQUN2QyxPQUFPLGdDQUFnQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGFBQWEsQ0FDWCxRQUFnQixFQUNoQixNQUFjLEVBQ2QsS0FBYyxFQUNkLFFBQWlCLEVBQ2pCLEtBQWM7UUFFZCxRQUFRLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDOzs4RUFyRFUsZUFBZTt1REFBZixlQUFlLFdBQWYsZUFBZSxtQkFGZCxNQUFNO3VGQUVQLGVBQWU7Y0FIM0IsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBbmFseXRpY3NTdHJ1Y3R1cmVkRXZlbnRzTWFwcGluZyB9IGZyb20gJy4uL2NvbmZpZy9hbmFseXRpY3Mtc3RydWN0dXJlZC1ldmVudHMtbWFwcGluZyc7XHJcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICdAY2R4L2FuYWx5dGljcyc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd3Bsb3dTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIHNldFVzZXJJZCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlckVtYWlsKCk7XHJcbiAgICBpZiAodXNlcklkKSB7XHJcbiAgICAgIC8vIFNpbmNlIHVzZXJJZCByZXByZXNlbnRzIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbiAtIGVtYWlsLCBzZWNvbmQgcGFyYW1ldGVyIHVzZUhhc2ggaXMgc2V0IHRvIHRydWVcclxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldFVzZXJJZCh1c2VySWQsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0Q3VzdG9tZXJJZCgpOiB2b2lkIHtcclxuXHJcbiAgfVxyXG5cclxuICBzZXRBcHBTZXNzaW9uSWQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB1c2VyU2Vzc2lvbklkID0gdGhpcy5hdXRoU2VydmljZS5nZXRBdXRob3JpemF0aW9uVG9rZW4oKTtcclxuICAgIGlmICh1c2VyU2Vzc2lvbklkKSB7XHJcbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBcHBTZXNzaW9uSWQodXNlclNlc3Npb25JZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmZXRjaFN0cnVjdHVyZWRFdmVudENhdGVnb3J5KGNhdGVnb3J5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIEFuYWx5dGljc1N0cnVjdHVyZWRFdmVudHNNYXBwaW5nLmZldGNoQ2F0ZWdvcnkoY2F0ZWdvcnkpO1xyXG4gIH1cclxuXHJcbiAgZmV0Y2hTdHJ1Y3R1cmVkRXZlbnRBY3Rpb24oYWN0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIEFuYWx5dGljc1N0cnVjdHVyZWRFdmVudHNNYXBwaW5nLmZldGNoQWN0aW9uKGFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwYWdlVHJhY2tpbmcocGFnZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnRyYWNrUGFnZShwYWdlTmFtZSk7XHJcbiAgfVxyXG5cclxuICBldmVudFRyYWNraW5nKFxyXG4gICAgY2F0ZWdvcnk6IHN0cmluZyxcclxuICAgIGFjdGlvbjogc3RyaW5nLFxyXG4gICAgbGFiZWw/OiBzdHJpbmcsXHJcbiAgICBwcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIHZhbHVlPzogc3RyaW5nXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjYXRlZ29yeSA9IHRoaXMuZmV0Y2hTdHJ1Y3R1cmVkRXZlbnRDYXRlZ29yeShjYXRlZ29yeSk7XHJcbiAgICBhY3Rpb24gPSB0aGlzLmZldGNoU3RydWN0dXJlZEV2ZW50QWN0aW9uKGFjdGlvbik7XHJcbiAgICBpZiAobGFiZWwgfHwgcHJvcGVydHkgfHwgdmFsdWUpIHtcclxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnRGdWxsKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCBwcm9wZXJ0eSwgdmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoY2F0ZWdvcnksIGFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==