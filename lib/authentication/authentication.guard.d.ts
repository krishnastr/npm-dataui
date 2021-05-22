import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { DataVizUiService } from './../data-viz-ui.service';
import * as i0 from "@angular/core";
export declare class AuthenticationGuard implements CanActivate {
    private authService;
    private dataVizUiService;
    private router;
    constructor(authService: AuthenticationService, dataVizUiService: DataVizUiService, router: Router);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    checkLogin(url: string): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AuthenticationGuard, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthenticationGuard>;
}
//# sourceMappingURL=authentication.guard.d.ts.map