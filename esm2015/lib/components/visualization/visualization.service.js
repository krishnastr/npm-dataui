import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppConfig } from '../../config/app_config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./../../authentication/config";
import * as i3 from "../../config.service";
export class VisualizationService {
    constructor(http, apiConfig, configService) {
        this.http = http;
        this.apiConfig = apiConfig;
        this.configService = configService;
    }
    getEmbedToken(reportName) {
        const apiUrl = this.apiConfig.getConfig().apiUrl;
        return this.http
            .get(apiUrl + this.getEmbedTokenUrl(reportName))
            .pipe(map((token) => {
            catchError(this.handleError);
            return token;
        }));
    }
    getEmbedTokenUrl(reportName) {
        console.log(AppConfig.fetchAppEnv());
        console.log(reportName);
        return 'api/embedtoken/v1/api/embedtoken?reportId='
            + this.configService.config.bookmarks.envBasedReportIdsMap[AppConfig.fetchAppEnv()][reportName]
            + this.getEmbedParams(reportName);
    }
    getEmbedParams(reportName) {
        const params = this.configService.config.bookmarks.embedUrlQueryParamsMap[reportName];
        let url = '';
        if (params) {
            Object.keys(params).forEach(param => {
                url = url + '&' + param + '=' + (params[param].encoded ? encodeURIComponent(params[param].value) : params[param].value);
            });
        }
        return url;
    }
    handleError(error) {
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
VisualizationService.ɵfac = function VisualizationService_Factory(t) { return new (t || VisualizationService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.Config), i0.ɵɵinject(i3.ConfigService)); };
VisualizationService.ɵprov = i0.ɵɵdefineInjectable({ token: VisualizationService, factory: VisualizationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VisualizationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.Config }, { type: i3.ConfigService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0YS12aXotdWkvc3JjL2xpYi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24vdmlzdWFsaXphdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFHcEQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUNVLElBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLGFBQTRCO1FBRjVCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNsQyxDQUFDO0lBRUwsYUFBYSxDQUFDLFVBQWtCO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMvQyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFrQjtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsT0FBTyw0Q0FBNEM7Y0FDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztjQUM3RixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxjQUFjLENBQUMsVUFBa0I7UUFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RGLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDcEIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksS0FBSyxDQUFDLEtBQUssWUFBWSxVQUFVLEVBQUU7WUFDckMsb0JBQW9CO1lBQ3BCLFlBQVksR0FBRyxVQUFVLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEQ7YUFBTTtZQUNMLG9CQUFvQjtZQUNwQixZQUFZLEdBQUcsZUFBZSxLQUFLLENBQUMsTUFBTSxjQUFjLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN6RTtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0IsT0FBTyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7d0ZBakRVLG9CQUFvQjs0REFBcEIsb0JBQW9CLFdBQXBCLG9CQUFvQixtQkFEUCxNQUFNO3VGQUNuQixvQkFBb0I7Y0FEaEMsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vLi4vLi4vYXV0aGVudGljYXRpb24vY29uZmlnJztcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2FwcF9jb25maWcnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnLnNlcnZpY2UnO1xyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBhcGlDb25maWc6IENvbmZpZyxcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIGdldEVtYmVkVG9rZW4ocmVwb3J0TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+e1xyXG4gICAgY29uc3QgYXBpVXJsID0gdGhpcy5hcGlDb25maWcuZ2V0Q29uZmlnKCkuYXBpVXJsO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KGFwaVVybCArIHRoaXMuZ2V0RW1iZWRUb2tlblVybChyZXBvcnROYW1lKSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh0b2tlbikgPT4ge1xyXG4gICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0RW1iZWRUb2tlblVybChyZXBvcnROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc29sZS5sb2coQXBwQ29uZmlnLmZldGNoQXBwRW52KCkpO1xyXG4gICAgY29uc29sZS5sb2cocmVwb3J0TmFtZSk7XHJcbiAgICByZXR1cm4gJ2FwaS9lbWJlZHRva2VuL3YxL2FwaS9lbWJlZHRva2VuP3JlcG9ydElkPSdcclxuICAgICAgKyB0aGlzLmNvbmZpZ1NlcnZpY2UuY29uZmlnLmJvb2ttYXJrcy5lbnZCYXNlZFJlcG9ydElkc01hcFtBcHBDb25maWcuZmV0Y2hBcHBFbnYoKV1bcmVwb3J0TmFtZV1cclxuICAgICAgKyB0aGlzLmdldEVtYmVkUGFyYW1zKHJlcG9ydE5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RW1iZWRQYXJhbXMocmVwb3J0TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29uZmlnU2VydmljZS5jb25maWcuYm9va21hcmtzLmVtYmVkVXJsUXVlcnlQYXJhbXNNYXBbcmVwb3J0TmFtZV07XHJcbiAgICBsZXQgdXJsID0gJyc7XHJcbiAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgICAgdXJsID0gdXJsICsgJyYnICsgcGFyYW0gKyAnPScgKyAocGFyYW1zW3BhcmFtXS5lbmNvZGVkID8gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1twYXJhbV0udmFsdWUpIDogcGFyYW1zW3BhcmFtXS52YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcblxyXG4gIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPG5ldmVyPiB7XHJcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gJyc7XHJcbiAgICBpZiAoZXJyb3IuZXJyb3IgaW5zdGFuY2VvZiBFcnJvckV2ZW50KSB7XHJcbiAgICAgIC8vIGNsaWVudC1zaWRlIGVycm9yXHJcbiAgICAgIGVycm9yTWVzc2FnZSA9IGBFcnJvcjogJHtlcnJvci5lcnJvci5tZXNzYWdlfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzZXJ2ZXItc2lkZSBlcnJvclxyXG4gICAgICBlcnJvck1lc3NhZ2UgPSBgRXJyb3IgQ29kZTogJHtlcnJvci5zdGF0dXN9XFxuTWVzc2FnZTogJHtlcnJvci5tZXNzYWdlfWA7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWxlcnQoZXJyb3JNZXNzYWdlKTtcclxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==