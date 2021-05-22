import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./authentication.service";
import * as i2 from "./../data-viz-ui.service";
import * as i3 from "@angular/router";
export class AuthenticationGuard {
    constructor(authService, dataVizUiService, router) {
        this.authService = authService;
        this.dataVizUiService = dataVizUiService;
        this.router = router;
    }
    canActivate(route, state) {
        return this.checkLogin(state.url);
    }
    checkLogin(url) {
        if (this.authService.isAuthenticated()) {
            // const userRole = this.authService.getUserRole();
            // if (userRole !== 'MANUFACTURER' && userRole !== 'DISTRIBUTOR') {
            //   this.router.navigate(['/unauthorized']);
            // }
            this.dataVizUiService.rolesObject$.next(this.authService.getUserRole());
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.setRedirectUrl(url);
        // Navigate to the login or ping page with extras
        url.includes('ping')
            ? this.router.navigate(['/ping-login'])
            : this.router.navigate(['/login']);
        return false;
    }
}
AuthenticationGuard.ɵfac = function AuthenticationGuard_Factory(t) { return new (t || AuthenticationGuard)(i0.ɵɵinject(i1.AuthenticationService), i0.ɵɵinject(i2.DataVizUiService), i0.ɵɵinject(i3.Router)); };
AuthenticationGuard.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationGuard, factory: AuthenticationGuard.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthenticationGuard, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.AuthenticationService }, { type: i2.DataVizUiService }, { type: i3.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBZTNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDVSxXQUFrQyxFQUNsQyxnQkFBa0MsRUFDbEMsTUFBYztRQUZkLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUNsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckIsQ0FBQztJQUVKLFdBQVcsQ0FDVCxLQUE2QixFQUM3QixLQUEwQjtRQUUxQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBVztRQUNwQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDdEMsbURBQW1EO1lBQ25ELG1FQUFtRTtZQUNuRSw2Q0FBNkM7WUFDN0MsSUFBSTtZQUNKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN4RSxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLGlEQUFpRDtRQUNqRCxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7c0ZBaENVLG1CQUFtQjsyREFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQixtQkFGbEIsTUFBTTt1RkFFUCxtQkFBbUI7Y0FIL0IsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgQ2FuQWN0aXZhdGUsXHJcbiAgUm91dGVyLFxyXG4gIFJvdXRlclN0YXRlU25hcHNob3QsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVZpelVpU2VydmljZSB9IGZyb20gJy4vLi4vZGF0YS12aXotdWkuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVZpelVpU2VydmljZTogRGF0YVZpelVpU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIGNhbkFjdGl2YXRlKFxyXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdFxyXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVja0xvZ2luKHN0YXRlLnVybCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0xvZ2luKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5hdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICAvLyBjb25zdCB1c2VyUm9sZSA9IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlclJvbGUoKTtcclxuICAgICAgLy8gaWYgKHVzZXJSb2xlICE9PSAnTUFOVUZBQ1RVUkVSJyAmJiB1c2VyUm9sZSAhPT0gJ0RJU1RSSUJVVE9SJykge1xyXG4gICAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3VuYXV0aG9yaXplZCddKTtcclxuICAgICAgLy8gfVxyXG4gICAgICB0aGlzLmRhdGFWaXpVaVNlcnZpY2Uucm9sZXNPYmplY3QkLm5leHQodGhpcy5hdXRoU2VydmljZS5nZXRVc2VyUm9sZSgpKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RvcmUgdGhlIGF0dGVtcHRlZCBVUkwgZm9yIHJlZGlyZWN0aW5nXHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnNldFJlZGlyZWN0VXJsKHVybCk7XHJcblxyXG4gICAgLy8gTmF2aWdhdGUgdG8gdGhlIGxvZ2luIG9yIHBpbmcgcGFnZSB3aXRoIGV4dHJhc1xyXG4gICAgdXJsLmluY2x1ZGVzKCdwaW5nJylcclxuICAgICAgPyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9waW5nLWxvZ2luJ10pXHJcbiAgICAgIDogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==