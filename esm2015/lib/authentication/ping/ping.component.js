import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./../authentication.service";
import * as i2 from "@angular/router";
function PingComponent_h4_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h4");
    i0.ɵɵtext(1, "Successful Ping");
    i0.ɵɵelementEnd();
} }
export class PingComponent {
    constructor(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.isSuccess = true;
    }
    login() { }
    ngOnInit() {
        this.isSuccess = true;
    }
}
PingComponent.ɵfac = function PingComponent_Factory(t) { return new (t || PingComponent)(i0.ɵɵdirectiveInject(i1.AuthenticationService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i2.ActivatedRoute)); };
PingComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PingComponent, selectors: [["lib-ping"]], decls: 1, vars: 1, consts: [[4, "ngIf"]], template: function PingComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, PingComponent_h4_0_Template, 2, 0, "h4", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isSuccess);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PingComponent, [{
        type: Component,
        args: [{
                selector: 'lib-ping',
                templateUrl: './ping.component.html',
            }]
    }], function () { return [{ type: i1.AuthenticationService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL3BpbmcvcGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL3BpbmcvcGluZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7OztJQ0FsRCwwQkFBc0I7SUFBQSwrQkFBZTtJQUFBLGlCQUFLOztBRFExQyxNQUFNLE9BQU8sYUFBYTtJQUd4QixZQUNVLFdBQWtDLEVBQ2xDLE1BQWMsRUFDZCxLQUFxQjtRQUZyQixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBTC9CLGNBQVMsR0FBRyxJQUFJLENBQUM7SUFNYixDQUFDO0lBRUwsS0FBSyxLQUFXLENBQUM7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7OzBFQWJVLGFBQWE7a0RBQWIsYUFBYTtRQ1IxQiw0REFBMEM7O1FBQXJDLG9DQUFlOzt1RkRRUCxhQUFhO2NBSnpCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsV0FBVyxFQUFFLHVCQUF1QjthQUNyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItcGluZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3BpbmcuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgaXNTdWNjZXNzID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHsgfVxyXG5cclxuICBsb2dpbigpOiB2b2lkIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNTdWNjZXNzID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiPGg0ICpuZ0lmPVwiaXNTdWNjZXNzXCI+U3VjY2Vzc2Z1bCBQaW5nPC9oND5cclxuIl19