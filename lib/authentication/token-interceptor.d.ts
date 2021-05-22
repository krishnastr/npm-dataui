import { HttpRequest, HttpEvent, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import * as i0 from "@angular/core";
export declare class TokenInterceptor implements HttpInterceptor {
    private authService;
    private router;
    constructor(authService: AuthenticationService, router: Router);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDef<TokenInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDef<TokenInterceptor>;
}
//# sourceMappingURL=token-interceptor.d.ts.map