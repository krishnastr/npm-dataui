import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class NotificationService {
    constructor() {
        this.notificationSubject = new BehaviorSubject(null);
        this.notification$ = this.notificationSubject
            .asObservable()
            .pipe(publish(), refCount());
    }
    notify(message) {
        this.notificationSubject.next(message);
    }
}
NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(); };
NotificationService.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2NvbW1vbi9jb3JlL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUtuRCxNQUFNLE9BQU8sbUJBQW1CO0lBTTlCO1FBTFEsd0JBQW1CLEdBQXlCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JFLGtCQUFhLEdBQW9CLElBQUksQ0FBQyxtQkFBbUI7YUFDL0QsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFZixDQUFDO0lBRWpCLE1BQU0sQ0FBQyxPQUFlO1FBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7c0ZBVlUsbUJBQW1COzJEQUFuQixtQkFBbUIsV0FBbkIsbUJBQW1CLG1CQUZsQixNQUFNO3VGQUVQLG1CQUFtQjtjQUgvQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgcHVibGlzaCwgcmVmQ291bnQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBub3RpZmljYXRpb25TdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcbiAgcmVhZG9ubHkgbm90aWZpY2F0aW9uJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5ub3RpZmljYXRpb25TdWJqZWN0XHJcbiAgICAuYXNPYnNlcnZhYmxlKClcclxuICAgIC5waXBlKHB1Ymxpc2goKSwgcmVmQ291bnQoKSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5vdGlmeShtZXNzYWdlOiBvYmplY3QpOiB2b2lkIHtcclxuICAgIHRoaXMubm90aWZpY2F0aW9uU3ViamVjdC5uZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxufVxyXG4iXX0=