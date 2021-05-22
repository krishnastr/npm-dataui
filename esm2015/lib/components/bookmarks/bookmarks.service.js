import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataVizUiEnvironmentManager } from '../../config/data-viz-ui-environment-manager';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./../../authentication/config";
import * as i3 from "../../config.service";
import * as i4 from "./../../authentication/authentication.service";
export class BookmarkService {
    constructor(http, apiConfig, configService, authService) {
        this.http = http;
        this.apiConfig = apiConfig;
        this.configService = configService;
        this.authService = authService;
        this.apiUrl = this.apiConfig.getConfig().apiUrl;
        this.reportName = configService.config['roles'].
            includes('Manufacturer') ? 'MAN' : 'DIST';
        this.tenantId = DataVizUiEnvironmentManager.getTenant();
    }
    getBookmarks(reportName) {
        if (reportName) {
            this.reportName = reportName;
        }
        return this.http
            .get(this.apiUrl + `api/bookmarks/v1/api/bookmarks?reportName=${this.reportName}&tenantId=${this.tenantId}`)
            .pipe(map((bookmarks) => {
            return bookmarks;
        }), catchError((error) => throwError(error)));
    }
    createBookmark(bookmark) {
        const requestData = {};
        requestData.bookmarkName = bookmark.bookmarkName;
        requestData.bookmarkState = bookmark.state;
        requestData.reportName = this.reportName;
        requestData.tenantId = this.tenantId;
        return this.http
            .post(this.apiUrl + 'api/bookmarks/v1/api/bookmarks', requestData)
            .pipe(map((data) => {
            catchError(this.handleError);
            return data;
        }));
    }
    updateBookmark(editedBookmark) {
        const requestData = {};
        requestData.bookmarkName = editedBookmark.bookmarkName;
        requestData.bookmarkState = editedBookmark.bookmarkState;
        requestData.reportName = this.reportName;
        requestData.tenantId = this.tenantId;
        return this.http
            .put(this.apiUrl + 'api/bookmarks/v1/api/bookmarks/' + editedBookmark.bookmarkId, requestData)
            .pipe(map((data) => {
            catchError(this.handleError);
            return data;
        }));
    }
    updateBookmarkName(editedBookmark, newName) {
        const requestData = {};
        requestData.bookmarkName = newName;
        requestData.bookmarkState = editedBookmark.bookmarkState;
        requestData.reportName = this.reportName;
        return this.http
            .put(this.apiUrl +
            `api/bookmarks/v1/api/bookmarks/${editedBookmark.bookmarkId}`, requestData)
            .pipe(map((data) => {
            catchError(this.handleError);
            return data;
        }));
    }
    deleteBookmark(bookmark) {
        return this.http
            .delete(this.apiUrl + `api/bookmarks/v1/api/bookmarks/${bookmark.bookmarkId}`, { responseType: 'text' })
            .pipe(map((data) => {
            // catchError(this.handleError);
            return data;
        }));
    }
    handleError(error) {
        console.log(error);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
BookmarkService.ɵfac = function BookmarkService_Factory(t) { return new (t || BookmarkService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.Config), i0.ɵɵinject(i3.ConfigService), i0.ɵɵinject(i4.AuthenticationService)); };
BookmarkService.ɵprov = i0.ɵɵdefineInjectable({ token: BookmarkService, factory: BookmarkService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BookmarkService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.Config }, { type: i3.ConfigService }, { type: i4.AuthenticationService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmtzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2NvbXBvbmVudHMvYm9va21hcmtzL2Jvb2ttYXJrcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSzlDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7QUFHM0YsTUFBTSxPQUFPLGVBQWU7SUFJMUIsWUFDVSxJQUFnQixFQUNoQixTQUFpQixFQUNqQixhQUE0QixFQUM1QixXQUFrQztRQUhsQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBUHBDLFdBQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQVNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRywyQkFBMkIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQW1CO1FBQzlCLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7U0FDOUI7UUFDRCxPQUFPLElBQUks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LENBQ0gsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDWCxnQ0FBZ0M7WUFDaEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUssS0FBYSxDQUFDLEtBQUssWUFBWSxVQUFVLEVBQUU7WUFDOUMsb0JBQW9CO1lBQ3BCLFlBQVksR0FBRyxVQUFXLEtBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekQ7YUFBTTtZQUNMLG9CQUFvQjtZQUNwQixZQUFZLEdBQUcsZUFBZ0IsS0FBYSxDQUFDLE1BQU0sY0FBZSxLQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0Y7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNCLE9BQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OzhFQXRHVSxlQUFlO3VEQUFmLGVBQWUsV0FBZixlQUFlLG1CQURGLE1BQU07dUZBQ25CLGVBQWU7Y0FEM0IsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vLi4vYXV0aGVudGljYXRpb24vY29uZmlnJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG93ZXJiaUJvb2ttYXJrIH0gZnJvbSAnLi4vdmlzdWFsaXphdGlvbi92aXN1YWxpemF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgRGF0YVZpelVpRW52aXJvbm1lbnRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vY29uZmlnL2RhdGEtdml6LXVpLWVudmlyb25tZW50LW1hbmFnZXInO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEJvb2ttYXJrU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBhcGlVcmwgPSB0aGlzLmFwaUNvbmZpZy5nZXRDb25maWcoKS5hcGlVcmw7XHJcbiAgcHJpdmF0ZSByZXBvcnROYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSB0ZW5hbnRJZDogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBhcGlDb25maWc6IENvbmZpZyxcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5yZXBvcnROYW1lID0gY29uZmlnU2VydmljZS5jb25maWdbJ3JvbGVzJ10uXHJcbiAgICAgIGluY2x1ZGVzKCdNYW51ZmFjdHVyZXInKSA/ICdNQU4nIDogJ0RJU1QnO1xyXG4gICAgdGhpcy50ZW5hbnRJZCA9IERhdGFWaXpVaUVudmlyb25tZW50TWFuYWdlci5nZXRUZW5hbnQoKTtcclxuICB9XHJcblxyXG4gIGdldEJvb2ttYXJrcyhyZXBvcnROYW1lPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xyXG4gICAgaWYgKHJlcG9ydE5hbWUpIHtcclxuICAgICAgdGhpcy5yZXBvcnROYW1lID0gcmVwb3J0TmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgYGFwaS9ib29rbWFya3MvdjEvYXBpL2Jvb2ttYXJrcz9yZXBvcnROYW1lPSR7dGhpcy5yZXBvcnROYW1lfSZ0ZW5hbnRJZD0ke3RoaXMudGVuYW50SWR9YClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChib29rbWFya3MpID0+IHtcclxuICAgICAgICAgIHJldHVybiBib29rbWFya3M7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRocm93RXJyb3IoZXJyb3IpKVxyXG4gICAgICApO1xyXG4gIH1cclxuICBjcmVhdGVCb29rbWFyayhib29rbWFyazogUG93ZXJiaUJvb2ttYXJrKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHJlcXVlc3REYXRhID0ge30gYXMgYW55O1xyXG4gICAgcmVxdWVzdERhdGEuYm9va21hcmtOYW1lID0gYm9va21hcmsuYm9va21hcmtOYW1lO1xyXG4gICAgcmVxdWVzdERhdGEuYm9va21hcmtTdGF0ZSA9IGJvb2ttYXJrLnN0YXRlO1xyXG4gICAgcmVxdWVzdERhdGEucmVwb3J0TmFtZSA9IHRoaXMucmVwb3J0TmFtZTtcclxuICAgIHJlcXVlc3REYXRhLnRlbmFudElkID0gdGhpcy50ZW5hbnRJZDtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QodGhpcy5hcGlVcmwgKyAnYXBpL2Jvb2ttYXJrcy92MS9hcGkvYm9va21hcmtzJywgcmVxdWVzdERhdGEpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG4gIHVwZGF0ZUJvb2ttYXJrKGVkaXRlZEJvb2ttYXJrOiBQb3dlcmJpQm9va21hcmspOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdERhdGEgPSB7fSBhcyBhbnk7XHJcbiAgICByZXF1ZXN0RGF0YS5ib29rbWFya05hbWUgPSBlZGl0ZWRCb29rbWFyay5ib29rbWFya05hbWU7XHJcbiAgICByZXF1ZXN0RGF0YS5ib29rbWFya1N0YXRlID0gZWRpdGVkQm9va21hcmsuYm9va21hcmtTdGF0ZTtcclxuICAgIHJlcXVlc3REYXRhLnJlcG9ydE5hbWUgPSB0aGlzLnJlcG9ydE5hbWU7XHJcbiAgICByZXF1ZXN0RGF0YS50ZW5hbnRJZCA9IHRoaXMudGVuYW50SWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wdXQodGhpcy5hcGlVcmwgKyAnYXBpL2Jvb2ttYXJrcy92MS9hcGkvYm9va21hcmtzLycgKyBlZGl0ZWRCb29rbWFyay5ib29rbWFya0lkLCByZXF1ZXN0RGF0YSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcbiAgdXBkYXRlQm9va21hcmtOYW1lKGVkaXRlZEJvb2ttYXJrOiBQb3dlcmJpQm9va21hcmssIG5ld05hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCByZXF1ZXN0RGF0YSA9IHt9IGFzIGFueTtcclxuICAgIHJlcXVlc3REYXRhLmJvb2ttYXJrTmFtZSA9IG5ld05hbWU7XHJcbiAgICByZXF1ZXN0RGF0YS5ib29rbWFya1N0YXRlID0gZWRpdGVkQm9va21hcmsuYm9va21hcmtTdGF0ZTtcclxuICAgIHJlcXVlc3REYXRhLnJlcG9ydE5hbWUgPSB0aGlzLnJlcG9ydE5hbWU7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wdXQoXHJcbiAgICAgICAgdGhpcy5hcGlVcmwgK1xyXG4gICAgICAgIGBhcGkvYm9va21hcmtzL3YxL2FwaS9ib29rbWFya3MvJHtlZGl0ZWRCb29rbWFyay5ib29rbWFya0lkfWAsXHJcbiAgICAgICAgcmVxdWVzdERhdGFcclxuICAgICAgKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGRhdGEpID0+IHtcclxuICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuICBkZWxldGVCb29rbWFyayhib29rbWFyazogUG93ZXJiaUJvb2ttYXJrKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmRlbGV0ZShcclxuICAgICAgICB0aGlzLmFwaVVybCArIGBhcGkvYm9va21hcmtzL3YxL2FwaS9ib29rbWFya3MvJHtib29rbWFyay5ib29rbWFya0lkfWAsXHJcbiAgICAgICAgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9XHJcbiAgICAgIClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAvLyBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUVycm9yKGVycm9yOiBvYmplY3QpOiBPYnNlcnZhYmxlPG5ldmVyPiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gJyc7XHJcbiAgICBpZiAoKGVycm9yIGFzIGFueSkuZXJyb3IgaW5zdGFuY2VvZiBFcnJvckV2ZW50KSB7XHJcbiAgICAgIC8vIGNsaWVudC1zaWRlIGVycm9yXHJcbiAgICAgIGVycm9yTWVzc2FnZSA9IGBFcnJvcjogJHsoZXJyb3IgYXMgYW55KS5lcnJvci5tZXNzYWdlfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzZXJ2ZXItc2lkZSBlcnJvclxyXG4gICAgICBlcnJvck1lc3NhZ2UgPSBgRXJyb3IgQ29kZTogJHsoZXJyb3IgYXMgYW55KS5zdGF0dXN9XFxuTWVzc2FnZTogJHsoZXJyb3IgYXMgYW55KS5tZXNzYWdlfWA7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==