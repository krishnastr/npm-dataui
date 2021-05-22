import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./../authentication.service";
import * as i2 from "@angular/router";
import * as i3 from "../../snowplow/snowplow.service";
export class LoginComponent {
    constructor(authService, router, route, snowplowService) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.snowplowService = snowplowService;
    }
    login() {
        this.authService.login();
    }
    consume(apiToken) {
        const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '';
        this.authService.authenticate(apiToken);
        this.authService.getUserRole();
        this.router.navigate([redirect]);
        this.trackLogin();
    }
    consumePing(apiToken) {
        const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '';
        this.authService.authenticate(apiToken);
        this.authService.getUserRole();
        this.router.navigate([redirect]);
    }
    trackLogin() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['']);
            this.snowplowService.eventTracking('login', 'click');
        }
    }
    logout() {
        this.authService.logout();
    }
    validRoute() {
        if (this.route && this.route.snapshot && this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path) {
            return this.route.snapshot.routeConfig.path;
        }
        return '/';
    }
    ngOnInit() {
        const routePath = this.validRoute();
        if (routePath.indexOf('ping-login') > -1) {
            this.ping();
        }
        else if (routePath.indexOf('login') > -1) {
            this.login();
        }
        else if (routePath.indexOf('consumePing') > -1) {
            const consumeToken = this.route.snapshot.queryParams['api_token'];
            this.authService.redirectUrl = this.route.snapshot.queryParams['redirectTo'];
            this.consumePing(consumeToken);
        }
        else if (routePath.indexOf('consume') > -1) {
            const consumeToken = this.route.snapshot.queryParams['api_token'];
            this.authService.redirectUrl = this.route.snapshot.queryParams['redirectTo'];
            this.consume(consumeToken);
        }
        else if (routePath.indexOf('logout') > -1) {
            this.logout();
            this.snowplowService.eventTracking('logout', 'click');
        }
    }
    ping() {
        this.authService.ping();
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(i0.ɵɵdirectiveInject(i1.AuthenticationService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.SnowplowService)); };
LoginComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["lib-login"]], decls: 2, vars: 0, template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h4");
        i0.ɵɵtext(1, "You are being redirected to the Log In page");
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{
                selector: 'lib-login',
                templateUrl: './login.component.html',
            }]
    }], function () { return [{ type: i1.AuthenticationService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.SnowplowService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0YS12aXotdWkvc3JjL2xpYi9hdXRoZW50aWNhdGlvbi9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBU2xELE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQ1UsV0FBa0MsRUFDbEMsTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLGVBQWdDO1FBSGhDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3RDLENBQUM7SUFFTCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTyxDQUFDLFFBQWE7UUFDbkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO1lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7WUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQs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SUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7NEVBM0VVLGNBQWM7bURBQWQsY0FBYztRQ1QzQiwwQkFBSTtRQUFBLDJEQUEyQztRQUFBLGlCQUFLOzt1RkRTdkMsY0FBYztjQUoxQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7YUFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU25vd3Bsb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc25vd3Bsb3cvc25vd3Bsb3cuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1sb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgc25vd3Bsb3dTZXJ2aWNlOiBTbm93cGxvd1NlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBsb2dpbigpOiB2b2lkIHtcclxuICAgIHRoaXMuYXV0aFNlcnZpY2UubG9naW4oKTtcclxuICB9XHJcblxyXG4gIGNvbnN1bWUoYXBpVG9rZW46IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVkaXJlY3QgPSB0aGlzLmF1dGhTZXJ2aWNlLnJlZGlyZWN0VXJsXHJcbiAgICAgID8gdGhpcy5hdXRoU2VydmljZS5yZWRpcmVjdFVybFxyXG4gICAgICA6ICcnO1xyXG4gICAgdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGUoYXBpVG9rZW4pO1xyXG4gICAgdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyUm9sZSgpO1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JlZGlyZWN0XSk7XHJcbiAgICB0aGlzLnRyYWNrTG9naW4oKTtcclxuICB9XHJcblxyXG4gIGNvbnN1bWVQaW5nKGFwaVRva2VuOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlZGlyZWN0ID0gdGhpcy5hdXRoU2VydmljZS5yZWRpcmVjdFVybFxyXG4gICAgICA/IHRoaXMuYXV0aFNlcnZpY2UucmVkaXJlY3RVcmxcclxuICAgICAgOiAnJztcclxuICAgIHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlKGFwaVRva2VuKTtcclxuICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlclJvbGUoKTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtyZWRpcmVjdF0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tMb2dpbigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnJ10pO1xyXG4gICAgICB0aGlzLnNub3dwbG93U2VydmljZS5ldmVudFRyYWNraW5nKCdsb2dpbicsICdjbGljaycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9nb3V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcclxuICB9XHJcblxyXG4gIHZhbGlkUm91dGUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLnJvdXRlICYmIHRoaXMucm91dGUuc25hcHNob3QgJiYgdGhpcy5yb3V0ZS5zbmFwc2hvdC5yb3V0ZUNvbmZpZyAmJiB0aGlzLnJvdXRlLnNuYXBzaG90LnJvdXRlQ29uZmlnLnBhdGgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucm91dGUuc25hcHNob3Qucm91dGVDb25maWcucGF0aDtcclxuICAgIH1cclxuICAgIHJldHVybiAnLyc7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJvdXRlUGF0aCA9IHRoaXMudmFsaWRSb3V0ZSgpO1xyXG4gICAgaWYgKHJvdXRlUGF0aC5pbmRleE9mKCdwaW5nLWxvZ2luJykgPiAtMSkge1xyXG4gICAgICB0aGlzLnBpbmcoKTtcclxuICAgIH0gZWxzZSBpZiAocm91dGVQYXRoLmluZGV4T2YoJ2xvZ2luJykgPiAtMSkge1xyXG4gICAgICB0aGlzLmxvZ2luKCk7XHJcbiAgICB9IGVsc2UgaWYgKHJvdXRlUGF0aC5pbmRleE9mKCdjb25zdW1lUGluZycpID4gLTEpIHtcclxuICAgICAgY29uc3QgY29uc3VtZVRva2VuID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1snYXBpX3Rva2VuJ107XHJcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVkaXJlY3RVcmwgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zW1xyXG4gICAgICAgICdyZWRpcmVjdFRvJ1xyXG4gICAgICBdO1xyXG4gICAgICB0aGlzLmNvbnN1bWVQaW5nKGNvbnN1bWVUb2tlbik7XHJcbiAgICB9IGVsc2UgaWYgKHJvdXRlUGF0aC5pbmRleE9mKCdjb25zdW1lJykgPiAtMSkge1xyXG4gICAgICBjb25zdCBjb25zdW1lVG9rZW4gPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zWydhcGlfdG9rZW4nXTtcclxuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWRpcmVjdFVybCA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbXHJcbiAgICAgICAgJ3JlZGlyZWN0VG8nXHJcbiAgICAgIF07XHJcbiAgICAgIHRoaXMuY29uc3VtZShjb25zdW1lVG9rZW4pO1xyXG4gICAgfSBlbHNlIGlmIChyb3V0ZVBhdGguaW5kZXhPZignbG9nb3V0JykgPiAtMSkge1xyXG4gICAgICB0aGlzLmxvZ291dCgpO1xyXG4gICAgICB0aGlzLnNub3dwbG93U2VydmljZS5ldmVudFRyYWNraW5nKCdsb2dvdXQnLCAnY2xpY2snKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBpbmcoKTogdm9pZCB7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnBpbmcoKTtcclxuICB9XHJcbn1cclxuIiwiPGg0PllvdSBhcmUgYmVpbmcgcmVkaXJlY3RlZCB0byB0aGUgTG9nIEluIHBhZ2U8L2g0PlxyXG4iXX0=