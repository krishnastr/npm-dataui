import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./authentication.service";
import * as i2 from "@angular/router";
// import { MessageService } from '../services/message.service';
export class TokenInterceptor {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    intercept(req, next) {
        let token = this.authService.getAuthorizationToken()
            ? this.authService.getAuthorizationToken()
            : '';
        token = 'Bearer ' + token;
        const headers = req.headers.set('Authorization', token);
        req = req.clone({ headers });
        return next.handle(req).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                // Do something after success
            }
        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // redirect to login
                    this.router.navigate(['login']);
                }
                else if (err.status === 419) {
                    // redirect to logout
                    this.router.navigate(['logout']);
                }
                else {
                    // this.messageService.addErrorMessage(err.status.toString());
                }
            }
        }), finalize(() => { }));
    }
}
TokenInterceptor.ɵfac = function TokenInterceptor_Factory(t) { return new (t || TokenInterceptor)(i0.ɵɵinject(i1.AuthenticationService), i0.ɵɵinject(i2.Router)); };
TokenInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: TokenInterceptor, factory: TokenInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TokenInterceptor, [{
        type: Injectable
    }], function () { return [{ type: i1.AuthenticationService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL3Rva2VuLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUlMLFlBQVksRUFDWixpQkFBaUIsR0FFbEIsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRy9DLGdFQUFnRTtBQUdoRSxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQ1UsV0FBa0MsRUFDbEMsTUFBYztRQURkLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3BCLENBQUM7SUFDTCxTQUFTLENBQ1AsR0FBcUIsRUFDckIsSUFBaUI7UUFFakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRTtZQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsS0FBSyxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDMUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUU3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMxQixHQUFHLENBQ0QsQ0FBQyxLQUFxQixFQUFFLEVBQUU7WUFDeEIsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFO2dCQUNqQyw2QkFBNkI7YUFDOUI7UUFDSCxDQUFDLEVBQ0QsQ0FBQyxHQUFtQixFQUFFLEVBQUU7WUFDdEIsSUFBSSxHQUFHLFlBQVksaUJBQWlCLEVBQUU7Z0JBQ3BDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7b0JBQ3RCLG9CQUFvQjtvQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNqQztxQkFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO29CQUM3QixxQkFBcUI7b0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsOERBQThEO2lCQUMvRDthQUNGO1FBQ0gsQ0FBQyxDQUNGLEVBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUNwQixDQUFDO0lBQ0osQ0FBQzs7Z0ZBdkNVLGdCQUFnQjt3REFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQjt1RkFBaEIsZ0JBQWdCO2NBRDVCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cEV2ZW50LFxyXG4gIEh0dHBJbnRlcmNlcHRvcixcclxuICBIdHRwUmVzcG9uc2UsXHJcbiAgSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgSHR0cEhhbmRsZXIsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG4vLyBpbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUb2tlbkludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgKSB7IH1cclxuICBpbnRlcmNlcHQoXHJcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXHJcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgIGxldCB0b2tlbiA9IHRoaXMuYXV0aFNlcnZpY2UuZ2V0QXV0aG9yaXphdGlvblRva2VuKClcclxuICAgICAgPyB0aGlzLmF1dGhTZXJ2aWNlLmdldEF1dGhvcml6YXRpb25Ub2tlbigpXHJcbiAgICAgIDogJyc7XHJcbiAgICB0b2tlbiA9ICdCZWFyZXIgJyArIHRva2VuO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIHRva2VuKTtcclxuICAgIHJlcSA9IHJlcS5jbG9uZSh7IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShcclxuICAgICAgdGFwKFxyXG4gICAgICAgIChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgYWZ0ZXIgc3VjY2Vzc1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycjogSHR0cEV2ZW50PGFueT4pID0+IHtcclxuICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgLy8gcmVkaXJlY3QgdG8gbG9naW5cclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2xvZ2luJ10pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVyci5zdGF0dXMgPT09IDQxOSkge1xyXG4gICAgICAgICAgICAgIC8vIHJlZGlyZWN0IHRvIGxvZ291dFxyXG4gICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnbG9nb3V0J10pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkRXJyb3JNZXNzYWdlKGVyci5zdGF0dXMudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICksXHJcbiAgICAgIGZpbmFsaXplKCgpID0+IHsgfSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==