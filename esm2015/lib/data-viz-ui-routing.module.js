import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../lib/authentication/login/login.component';
import { AuthenticationGuard } from '../lib/authentication/authentication.guard';
import { UnauthorizedComponent } from '../lib/authentication/unauthorized/unauthorized.component';
import { PingComponent } from '../lib/authentication/ping/ping.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export const DATA_VIZ_ROUTES = [
    {
        path: '',
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'login', component: LoginComponent },
    { path: 'consume', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    {
        path: 'ping',
        component: PingComponent,
        canActivate: [AuthenticationGuard],
    },
    { path: 'ping-login', component: LoginComponent },
    { path: 'consumePing', component: LoginComponent },
];
export class DataVizUiRoutingModule {
    static getRoutes() {
        return DATA_VIZ_ROUTES;
    }
}
DataVizUiRoutingModule.ɵfac = function DataVizUiRoutingModule_Factory(t) { return new (t || DataVizUiRoutingModule)(); };
DataVizUiRoutingModule.ɵmod = i0.ɵɵdefineNgModule({ type: DataVizUiRoutingModule });
DataVizUiRoutingModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[RouterModule.forChild(DATA_VIZ_ROUTES)], RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DataVizUiRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(DATA_VIZ_ROUTES)],
                exports: [RouterModule],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS12aXotdWktcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2RhdGEtdml6LXVpLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7OztBQUUxRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQVc7SUFDckM7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFdBQVcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xDLFFBQVEsRUFBRTtZQUNSLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7U0FDakQ7S0FDRjtJQUNELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUU7SUFDOUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUU7SUFDN0M7UUFDRSxJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLFdBQVcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0tBQ25DO0lBQ0QsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUU7Q0FDbkQsQ0FBQztBQU1GLE1BQU0sT0FBTyxzQkFBc0I7SUFDMUIsTUFBTSxDQUFDLFNBQVM7UUFDckIsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQzs7NEZBSFUsc0JBQXNCOzBEQUF0QixzQkFBc0I7OERBSHhCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUN2QyxZQUFZO3dGQUVYLHNCQUFzQiwwQ0FGdkIsWUFBWTt1RkFFWCxzQkFBc0I7Y0FKbEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuLi9saWIvYXV0aGVudGljYXRpb24vbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25HdWFyZCB9IGZyb20gJy4uL2xpYi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5ndWFyZCc7XHJcbmltcG9ydCB7IFVuYXV0aG9yaXplZENvbXBvbmVudCB9IGZyb20gJy4uL2xpYi9hdXRoZW50aWNhdGlvbi91bmF1dGhvcml6ZWQvdW5hdXRob3JpemVkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBpbmdDb21wb25lbnQgfSBmcm9tICcuLi9saWIvYXV0aGVudGljYXRpb24vcGluZy9waW5nLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY29uc3QgREFUQV9WSVpfUk9VVEVTOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjYW5BY3RpdmF0ZTogW0F1dGhlbnRpY2F0aW9uR3VhcmRdLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgeyBwYXRoOiAnJywgcmVkaXJlY3RUbzogJy8nLCBwYXRoTWF0Y2g6ICdmdWxsJyB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHsgcGF0aDogJ3VuYXV0aG9yaXplZCcsIGNvbXBvbmVudDogVW5hdXRob3JpemVkQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnbG9naW4nLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnY29uc3VtZScsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcclxuICB7IHBhdGg6ICdsb2dvdXQnLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sXHJcbiAge1xyXG4gICAgcGF0aDogJ3BpbmcnLFxyXG4gICAgY29tcG9uZW50OiBQaW5nQ29tcG9uZW50LFxyXG4gICAgY2FuQWN0aXZhdGU6IFtBdXRoZW50aWNhdGlvbkd1YXJkXSxcclxuICB9LFxyXG4gIHsgcGF0aDogJ3BpbmctbG9naW4nLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnY29uc3VtZVBpbmcnLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoREFUQV9WSVpfUk9VVEVTKV0sXHJcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVml6VWlSb3V0aW5nTW9kdWxlIHtcclxuICBwdWJsaWMgc3RhdGljIGdldFJvdXRlcygpOiBSb3V0ZXMge1xyXG4gICAgcmV0dXJuIERBVEFfVklaX1JPVVRFUztcclxuICB9XHJcbn1cclxuIl19