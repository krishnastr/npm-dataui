import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Config } from './config';
import { BehaviorSubject } from 'rxjs';
import { DataVizUiEnvironmentManager } from '../config/data-viz-ui-environment-manager';
import * as i0 from "@angular/core";
export class AuthenticationService {
    constructor() {
        this.redirectUrl = '';
        this.isUserLoggedIn = new BehaviorSubject(false);
        this.apiConfig = new Config().getConfig();
    }
    getTenantApiTokenKey() {
        return [DataVizUiEnvironmentManager.getTenant(), 'api-token'].join('-');
    }
    getAuthorizationToken() {
        return sessionStorage.getItem(this.getTenantApiTokenKey());
    }
    isAuthenticated() {
        return sessionStorage.getItem(this.getTenantApiTokenKey()) !== null;
    }
    setRedirectUrl(url) {
        this.redirectUrl = url;
    }
    getRedirectUrl() {
        return this.redirectUrl || '';
    }
    getUserName() {
        return localStorage.getItem('user-name') || '';
    }
    getUserEmail() {
        const jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return decodedToken['email'];
        }
        return '';
    }
    getClientId() {
        const jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return decodedToken['clientId'];
        }
        return '';
    }
    parseUserRole(roles) {
        if (roles === null || roles === undefined || roles.length === 0) {
            return '';
        }
        if (roles.some(role => role.toLowerCase() === 'distributor')) {
            return 'DISTRIBUTOR';
        }
        else if (roles.some(role => role.toLowerCase() === 'manufacturer')) {
            return 'MANUFACTURER';
        }
        else {
            return '';
        }
    }
    isAdmin() {
        return this.getUserRole() !== '' && this.getUserRole().toLowerCase() === 'admin';
    }
    authenticate(token) {
        if (token) {
            sessionStorage.setItem(this.getTenantApiTokenKey(), token);
            this.isUserLoggedIn.next(true);
        }
    }
    getUserRole() {
        const jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return this.parseUserRole(decodedToken['roles']);
        }
        return '';
    }
    getRoles() {
        const jwtToken = sessionStorage.getItem(this.getTentantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return decodedToken['roles'];
        }
        return '';
    }
    getTentantApiTokenKey() {
        return this.apiConfig.tenantId + '-api-token';
    }
    login() {
        this.signOut();
        const url = this.apiConfig.apiUrl +
            this.apiConfig.endPoints.login +
            '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
            '&redirectTo=' +
            this.getRedirectUrl();
        this.redirect(url); // Redirect user to login page
        // this.redirect('http://localhost:8080/HidaApiGateway/login?redirectTo=/dashboard');
        return false;
    }
    ping() {
        this.signOut();
        const url = this.apiConfig.apiUrl +
            this.apiConfig.endPoints.ping +
            '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
            '&redirectTo=' +
            this.getRedirectUrl();
        this.redirect(url); // Redirect user to ping endpoint
        return false;
    }
    logout() {
        const url = this.apiConfig.apiUrl +
            this.apiConfig.endPoints.logout +
            '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
            '&api_token=' +
            sessionStorage.getItem(this.getTenantApiTokenKey());
        this.signOut();
        this.redirect(url); // Redirect user to logout page
        return false;
    }
    redirect(url) {
        window.location.replace(url);
    }
    signOut() {
        sessionStorage.clear();
    }
}
AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(); };
AuthenticationService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthenticationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUVwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBS3hGLE1BQU0sT0FBTyxxQkFBcUI7SUFTaEM7UUFQQSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdWLG1CQUFjLEdBQTZCLElBQUksZUFBZSxDQUNuRSxLQUFLLENBQ04sQ0FBQztRQUdBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUN0RSxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQVc7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7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bkQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU87UUFDTCxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7MEZBaEpVLHFCQUFxQjs2REFBckIscUJBQXFCLFdBQXJCLHFCQUFxQixtQkFGcEIsTUFBTTt1RkFFUCxxQkFBcUI7Y0FIakMsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERhdGFWaXpVaUVudmlyb25tZW50TWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZy9kYXRhLXZpei11aS1lbnZpcm9ubWVudC1tYW5hZ2VyJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblNlcnZpY2Uge1xyXG4gIGFwaUNvbmZpZzogYW55O1xyXG4gIHJlZGlyZWN0VXJsID0gJyc7XHJcbiAgYXBpVG9rZW46IGFueTtcclxuXHJcbiAgcHVibGljIGlzVXNlckxvZ2dlZEluOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxyXG4gICAgZmFsc2VcclxuICApO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYXBpQ29uZmlnID0gbmV3IENvbmZpZygpLmdldENvbmZpZygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGVuYW50QXBpVG9rZW5LZXkoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBbRGF0YVZpelVpRW52aXJvbm1lbnRNYW5hZ2VyLmdldFRlbmFudCgpLCAnYXBpLXRva2VuJ10uam9pbignLScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXV0aG9yaXphdGlvblRva2VuKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5nZXRUZW5hbnRBcGlUb2tlbktleSgpKTtcclxuICB9XHJcblxyXG4gIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuZ2V0VGVuYW50QXBpVG9rZW5LZXkoKSkgIT09IG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXRSZWRpcmVjdFVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWRpcmVjdFVybCA9IHVybDtcclxuICB9XHJcblxyXG4gIGdldFJlZGlyZWN0VXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWRpcmVjdFVybCB8fCAnJztcclxuICB9XHJcblxyXG4gIGdldFVzZXJOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXItbmFtZScpIHx8ICcnO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckVtYWlsKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBqd3RUb2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5nZXRUZW5hbnRBcGlUb2tlbktleSgpKTtcclxuICAgIGlmIChqd3RUb2tlbikge1xyXG4gICAgICBjb25zdCBkZWNvZGVkVG9rZW46IGFueSA9IGp3dF9kZWNvZGUoand0VG9rZW4pO1xyXG4gICAgICByZXR1cm4gZGVjb2RlZFRva2VuWydlbWFpbCddO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENsaWVudElkKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBqd3RUb2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5nZXRUZW5hbnRBcGlUb2tlbktleSgpKTtcclxuICAgIGlmIChqd3RUb2tlbikge1xyXG4gICAgICBjb25zdCBkZWNvZGVkVG9rZW46IGFueSA9IGp3dF9kZWNvZGUoand0VG9rZW4pO1xyXG4gICAgICByZXR1cm4gZGVjb2RlZFRva2VuWydjbGllbnRJZCddO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VVc2VyUm9sZShyb2xlczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gICAgaWYgKHJvbGVzID09PSBudWxsIHx8IHJvbGVzID09PSB1bmRlZmluZWQgfHwgcm9sZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGlmIChyb2xlcy5zb21lKHJvbGUgPT4gcm9sZS50b0xvd2VyQ2FzZSgpID09PSAnZGlzdHJpYnV0b3InKSkge1xyXG4gICAgICByZXR1cm4gJ0RJU1RSSUJVVE9SJztcclxuICAgIH0gZWxzZSBpZiAocm9sZXMuc29tZShyb2xlID0+IHJvbGUudG9Mb3dlckNhc2UoKSA9PT0gJ21hbnVmYWN0dXJlcicpKSB7XHJcbiAgICAgIHJldHVybiAnTUFOVUZBQ1RVUkVSJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQWRtaW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRVc2VyUm9sZSgpICE9PSAnJyAmJiB0aGlzLmdldFVzZXJSb2xlKCkudG9Mb3dlckNhc2UoKSA9PT0gJ2FkbWluJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGUodG9rZW46IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRva2VuKSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5nZXRUZW5hbnRBcGlUb2tlbktleSgpLCB0b2tlbik7XHJcbiAgICAgIHRoaXMuaXNVc2VyTG9nZ2VkSW4ubmV4dCh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVc2VyUm9sZSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgand0VG9rZW4gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuZ2V0VGVuYW50QXBpVG9rZW5LZXkoKSk7XHJcbiAgICBpZiAoand0VG9rZW4pIHtcclxuICAgICAgY29uc3QgZGVjb2RlZFRva2VuOiBhbnkgPSBqd3RfZGVjb2RlKGp3dFRva2VuKTtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyc2VVc2VyUm9sZShkZWNvZGVkVG9rZW5bJ3JvbGVzJ10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFJvbGVzKCk6IGFueSB7XHJcbiAgICBjb25zdCBqd3RUb2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5nZXRUZW50YW50QXBpVG9rZW5LZXkoKSk7XHJcbiAgICBpZiAoand0VG9rZW4pIHtcclxuICAgICAgY29uc3QgZGVjb2RlZFRva2VuOiBhbnkgPSBqd3RfZGVjb2RlKGp3dFRva2VuKTtcclxuICAgICAgcmV0dXJuIGRlY29kZWRUb2tlblsncm9sZXMnXTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIGdldFRlbnRhbnRBcGlUb2tlbktleSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBpQ29uZmlnLnRlbmFudElkICsgJy1hcGktdG9rZW4nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luKCk6IGJvb2xlYW4ge1xyXG4gICAgdGhpcy5zaWduT3V0KCk7XHJcbiAgICBjb25zdCB1cmwgPVxyXG4gICAgICB0aGlzLmFwaUNvbmZpZy5hcGlVcmwgK1xyXG4gICAgICB0aGlzLmFwaUNvbmZpZy5lbmRQb2ludHMubG9naW4gK1xyXG4gICAgICAnP3RlbmFudElkPScgKyBEYXRhVml6VWlFbnZpcm9ubWVudE1hbmFnZXIuZ2V0VGVuYW50KCkgK1xyXG4gICAgICAnJnJlZGlyZWN0VG89JyArXHJcbiAgICAgIHRoaXMuZ2V0UmVkaXJlY3RVcmwoKTtcclxuICAgIHRoaXMucmVkaXJlY3QodXJsKTsgLy8gUmVkaXJlY3QgdXNlciB0byBsb2dpbiBwYWdlXHJcbiAgICAvLyB0aGlzLnJlZGlyZWN0KCdodHRwOi8vbG9jYWxob3N0OjgwODAvSGlkYUFwaUdhdGV3YXkvbG9naW4/cmVkaXJlY3RUbz0vZGFzaGJvYXJkJyk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGluZygpOiBib29sZWFuIHtcclxuICAgIHRoaXMuc2lnbk91dCgpO1xyXG4gICAgY29uc3QgdXJsID1cclxuICAgICAgdGhpcy5hcGlDb25maWcuYXBpVXJsICtcclxuICAgICAgdGhpcy5hcGlDb25maWcuZW5kUG9pbnRzLnBpbmcgK1xyXG4gICAgICAnP3RlbmFudElkPScgKyBEYXRhVml6VWlFbnZpcm9ubWVudE1hbmFnZXIuZ2V0VGVuYW50KCkgK1xyXG4gICAgICAnJnJlZGlyZWN0VG89JyArXHJcbiAgICAgIHRoaXMuZ2V0UmVkaXJlY3RVcmwoKTtcclxuICAgIHRoaXMucmVkaXJlY3QodXJsKTsgLy8gUmVkaXJlY3QgdXNlciB0byBwaW5nIGVuZHBvaW50XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9nb3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgdXJsID1cclxuICAgICAgdGhpcy5hcGlDb25maWcuYXBpVXJsICtcclxuICAgICAgdGhpcy5hcGlDb25maWcuZW5kUG9pbnRzLmxvZ291dCArXHJcbiAgICAgICc/dGVuYW50SWQ9JyArIERhdGFWaXpVaUVudmlyb25tZW50TWFuYWdlci5nZXRUZW5hbnQoKSArXHJcbiAgICAgICcmYXBpX3Rva2VuPScgK1xyXG4gICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuZ2V0VGVuYW50QXBpVG9rZW5LZXkoKSk7XHJcbiAgICB0aGlzLnNpZ25PdXQoKTtcclxuICAgIHRoaXMucmVkaXJlY3QodXJsKTsgLy8gUmVkaXJlY3QgdXNlciB0byBsb2dvdXQgcGFnZVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVkaXJlY3QodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHVybCk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KCk6IHZvaWQge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuIl19