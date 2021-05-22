import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class UnauthorizedComponent {
    constructor() {
        // ToDo - To be pulled from configuration
        this.mailTo = '';
        this.mailSubject = '';
    }
    ngOnInit() { }
    sendEmail() {
        document.location.href =
            'mailto:' +
                this.mailTo +
                '?subject=' +
                this.mailSubject;
    }
}
UnauthorizedComponent.ɵfac = function UnauthorizedComponent_Factory(t) { return new (t || UnauthorizedComponent)(); };
UnauthorizedComponent.ɵcmp = i0.ɵɵdefineComponent({ type: UnauthorizedComponent, selectors: [["lib-unauthorized"]], decls: 35, vars: 0, consts: [[1, "auth-main"], [1, "img-wrapper"], ["src", "./../../../../assets/images/subscription-header.png", "alt", "Subscriptions", "width", "100%", 1, "img-responsive"], [1, "img-overlay"], [1, "btn", "btn-success", 3, "click"], [1, "instructions"], [1, "main-header"], [1, "header"], [1, "divider"]], template: function UnauthorizedComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "img", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "button", 4);
        i0.ɵɵlistener("click", function UnauthorizedComponent_Template_button_click_4_listener() { return ctx.sendEmail(); });
        i0.ɵɵtext(5, "Contact us");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 5);
        i0.ɵɵelementStart(7, "section");
        i0.ɵɵelementStart(8, "span", 6);
        i0.ɵɵtext(9, "Get started tracking sales performance and pricing in the medical supply distribution channel across: ");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(10, "p");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "ul");
        i0.ɵɵelementStart(12, "section");
        i0.ɵɵelementStart(13, "li", 7);
        i0.ɵɵtext(14, "Product SKU");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(15, "p");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "section");
        i0.ɵɵelementStart(17, "li", 7);
        i0.ɵɵtext(18, "ZIP 3 geography");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(19, "p");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "section");
        i0.ɵɵelementStart(21, "li", 7);
        i0.ɵɵtext(22, "UNSPSC Product Category");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(23, "p");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "section");
        i0.ɵɵelementStart(25, "li", 7);
        i0.ɵɵtext(26, "Manufacturer");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(27, "p");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "section");
        i0.ɵɵelementStart(29, "li", 7);
        i0.ɵɵtext(30, " Class-of-Trade (Hospital, ASC, Lab/Diagnostic, Physician Office, Treatment Center, Long-Term Care, Home Care, Retail/Consumer) ");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(31, "p");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(32, "div", 8);
        i0.ɵɵelementStart(33, "button", 4);
        i0.ɵɵlistener("click", function UnauthorizedComponent_Template_button_click_33_listener() { return ctx.sendEmail(); });
        i0.ɵɵtext(34, "Contact us");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, styles: [".auth-main[_ngcontent-%COMP%]{margin:50px 10%;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,Liberation Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji!important}.auth-main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .main-header[_ngcontent-%COMP%]{height:38px;width:333px;color:#323e48;font-size:24px;font-weight:600;letter-spacing:0;line-height:38px}.auth-main[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:disc;font-weight:600}.auth-main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#323e48;font-size:14px;font-weight:500;line-height:22px}.auth-main[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{box-sizing:border-box;height:1px;width:100%;border:.5px solid #979797}.auth-main[_ngcontent-%COMP%]   .btn-success[_ngcontent-%COMP%]{background-color:#70a94f!important;margin:20px 0;font-size:1vw}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{position:relative;font-size:1vw;margin-bottom:50px}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-responsive[_ngcontent-%COMP%]{width:100%;height:auto}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:-78%;right:0;text-align:center}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]:before{content:\" \";display:block;height:60%}@media (max-width:768px){.auth-main[_ngcontent-%COMP%]   .btn-success[_ngcontent-%COMP%]{padding:3px 6px}.auth-main[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]:before{height:50%!important}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UnauthorizedComponent, [{
        type: Component,
        args: [{
                selector: 'lib-unauthorized',
                templateUrl: './unauthorized.component.html',
                styleUrls: ['./unauthorized.component.scss'],
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5hdXRob3JpemVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvYXV0aGVudGljYXRpb24vdW5hdXRob3JpemVkL3VuYXV0aG9yaXplZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL3VuYXV0aG9yaXplZC91bmF1dGhvcml6ZWQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7QUFPbEQsTUFBTSxPQUFPLHFCQUFxQjtJQUtoQztRQUpBLHlDQUF5QztRQUN6QyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osZ0JBQVcsR0FBRyxFQUFFLENBQUM7SUFFRCxDQUFDO0lBRWpCLFFBQVEsS0FBVyxDQUFDO0lBRXBCLFNBQVM7UUFDUCxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUk7WUFDcEIsU0FBUztnQkFDVCxJQUFJLENBQUMsTUFBTTtnQkFDWCxXQUFXO2dCQUNYLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7MEZBZlUscUJBQXFCOzBEQUFyQixxQkFBcUI7UUNQbEMsOEJBQXVCO1FBQ3JCLDhCQUF5QjtRQUN2Qix5QkFLRTtRQUNGLDhCQUF5QjtRQUN2QixpQ0FBc0Q7UUFBdEIsa0dBQVMsZUFBVyxJQUFDO1FBQUMsMEJBQVU7UUFBQSxpQkFBUztRQUMzRSxpQkFBTTtRQUNSLGlCQUFNO1FBQ04sOEJBQTBCO1FBQ3hCLCtCQUFTO1FBQ1AsK0JBQ0c7UUFBQSxzSEFFSDtRQUFBLGlCQUFPO1FBQ1AscUJBQU87UUFDVCxpQkFBVTtRQUNWLDJCQUFJO1FBQ0YsZ0NBQVM7UUFDUCw4QkFBbUI7UUFBQSw0QkFBVztRQUFBLGlCQUFLO1FBQ25DLHFCQUFPO1FBQ1QsaUJBQVU7UUFDVixnQ0FBUztRQUNQLDhCQUFtQjtRQUFBLGdDQUFlO1FBQUEsaUJBQUs7UUFDdkMscUJBQU87UUFDVCxpQkFBVTtRQUNWLGdDQUFTO1FBQ1AsOEJBQW1CO1FBQUEsd0NBQXVCO1FBQUEsaUJBQUs7UUFDL0MscUJBQU87UUFDVCxpQkFBVTtRQUNWLGdDQUFTO1FBQ1AsOEJBQW1CO1FBQUEsNkJBQVk7UUFBQSxpQkFBSztRQUNwQyxxQkFBTztRQUNULGlCQUFVO1FBQ1YsZ0NBQVM7UUFDUCw4QkFBbUI7UUFDakIsaUpBRUY7UUFBQSxpQkFBSztRQUNMLHFCQUFPO1FBQ1QsaUJBQVU7UUFDWixpQkFBSztRQUNQLGlCQUFNO1FBQ04sMEJBQTJCO1FBQzNCLGtDQUFzRDtRQUF0QixtR0FBUyxlQUFXLElBQUM7UUFBQywyQkFBVTtRQUFBLGlCQUFTO1FBQzNFLGlCQUFNOzt1RkR6Q08scUJBQXFCO2NBTGpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQzthQUM3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi11bmF1dGhvcml6ZWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91bmF1dGhvcml6ZWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3VuYXV0aG9yaXplZC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVW5hdXRob3JpemVkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAvLyBUb0RvIC0gVG8gYmUgcHVsbGVkIGZyb20gY29uZmlndXJhdGlvblxyXG4gIG1haWxUbyA9ICcnO1xyXG4gIG1haWxTdWJqZWN0ID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQgeyB9XHJcblxyXG4gIHNlbmRFbWFpbCgpOiB2b2lkIHtcclxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPVxyXG4gICAgICAnbWFpbHRvOicgK1xyXG4gICAgICB0aGlzLm1haWxUbyArXHJcbiAgICAgICc/c3ViamVjdD0nICtcclxuICAgICAgdGhpcy5tYWlsU3ViamVjdDtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImF1dGgtbWFpblwiPlxyXG4gIDxkaXYgY2xhc3M9XCJpbWctd3JhcHBlclwiPlxyXG4gICAgPGltZ1xyXG4gICAgICBjbGFzcz1cImltZy1yZXNwb25zaXZlXCJcclxuICAgICAgc3JjPVwiLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3N1YnNjcmlwdGlvbi1oZWFkZXIucG5nXCJcclxuICAgICAgYWx0PVwiU3Vic2NyaXB0aW9uc1wiXHJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImltZy1vdmVybGF5XCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwic2VuZEVtYWlsKClcIj5Db250YWN0IHVzPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+XHJcbiAgICA8c2VjdGlvbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJtYWluLWhlYWRlclwiXHJcbiAgICAgICAgPkdldCBzdGFydGVkIHRyYWNraW5nIHNhbGVzIHBlcmZvcm1hbmNlIGFuZCBwcmljaW5nIGluIHRoZSBtZWRpY2FsXHJcbiAgICAgICAgc3VwcGx5IGRpc3RyaWJ1dGlvbiBjaGFubmVsIGFjcm9zczpcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8cD48L3A+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgICA8dWw+XHJcbiAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImhlYWRlclwiPlByb2R1Y3QgU0tVPC9saT5cclxuICAgICAgICA8cD48L3A+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiaGVhZGVyXCI+WklQIDMgZ2VvZ3JhcGh5PC9saT5cclxuICAgICAgICA8cD48L3A+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiaGVhZGVyXCI+VU5TUFNDIFByb2R1Y3QgQ2F0ZWdvcnk8L2xpPlxyXG4gICAgICAgIDxwPjwvcD5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8c2VjdGlvbj5cclxuICAgICAgICA8bGkgY2xhc3M9XCJoZWFkZXJcIj5NYW51ZmFjdHVyZXI8L2xpPlxyXG4gICAgICAgIDxwPjwvcD5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8c2VjdGlvbj5cclxuICAgICAgICA8bGkgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgICAgIENsYXNzLW9mLVRyYWRlIChIb3NwaXRhbCwgQVNDLCBMYWIvRGlhZ25vc3RpYywgUGh5c2ljaWFuIE9mZmljZSxcclxuICAgICAgICAgIFRyZWF0bWVudCBDZW50ZXIsIExvbmctVGVybSBDYXJlLCBIb21lIENhcmUsIFJldGFpbC9Db25zdW1lcilcclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxwPjwvcD5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC91bD5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiZGl2aWRlclwiPjwvZGl2PlxyXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwic2VuZEVtYWlsKClcIj5Db250YWN0IHVzPC9idXR0b24+XHJcbjwvZGl2PlxyXG4iXX0=