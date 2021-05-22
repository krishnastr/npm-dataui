import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../config.service";
import * as i2 from "@angular/common";
import * as i3 from "../bookmarks/bookmarks.component";
function HeaderComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "lib-bookmarks", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("visualElem", ctx_r0.visual);
} }
function HeaderComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
} if (rf & 2) {
    const divId_r2 = ctx.$implicit;
    i0.ɵɵproperty("id", divId_r2);
} }
export class HeaderComponent {
    constructor(configService) {
        this.configService = configService;
        this.visual = {};
    }
    uiElementsListing() {
        return this.configService.config.uiElements;
    }
    ngOnInit() { }
    ngAfterContentInit() {
        setTimeout(() => {
            const elements = this.configService.config.uiElements;
            this.appendElements(elements);
        }, 10);
    }
    appendElements(elements) {
        elements.forEach((elementName) => {
            const elementContainer = document.querySelector('#' + elementName);
            const elementHtml = document.querySelector(elementName);
            if (elementContainer && elementHtml) {
                elementContainer.appendChild(elementHtml);
            }
        });
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(i0.ɵɵdirectiveInject(i1.ConfigService)); };
HeaderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: HeaderComponent, selectors: [["lib-header"]], inputs: { visual: "visual" }, decls: 4, vars: 2, consts: [[1, "header-container"], ["class", "bookmarks-container", 4, "ngIf"], [1, "ui-elements-container"], ["class", "right", 3, "id", 4, "ngFor", "ngForOf"], [1, "bookmarks-container"], [3, "visualElem"], [1, "right", 3, "id"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, HeaderComponent_div_1_Template, 2, 1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtemplate(3, HeaderComponent_div_3_Template, 1, 1, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.configService.config.bookmarks);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.configService.config.uiElements);
    } }, directives: [i2.NgIf, i2.NgForOf, i3.BookmarksComponent], styles: [".header-container[_ngcontent-%COMP%]{height:56px;width:100%;float:left}.bookmarks-container[_ngcontent-%COMP%]{height:56px;width:40%;float:left}.ui-elements-container[_ngcontent-%COMP%]{height:56px;width:60%;float:left}.ui-elements-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin:10px 20px}.left[_ngcontent-%COMP%]{float:left}.right[_ngcontent-%COMP%]{float:right}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderComponent, [{
        type: Component,
        args: [{
                selector: 'lib-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.scss'],
            }]
    }], function () { return [{ type: i1.ConfigService }]; }, { visual: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDOzs7Ozs7SUNKckIsOEJBQXdFO0lBQ3RFLG1DQUFxRDtJQUN2RCxpQkFBTTs7O0lBRFcsZUFBcUI7SUFBckIsMENBQXFCOzs7SUFHcEMseUJBSU87OztJQUZMLDZCQUFZOztBRE9sQixNQUFNLE9BQU8sZUFBZTtJQUcxQixZQUNTLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSDVCLFdBQU0sR0FBMkIsRUFBUyxDQUFDO0lBSWhELENBQUM7SUFFTCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsUUFBUSxLQUFXLENBQUM7SUFFcEIsa0JBQWtCO1FBQ2hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQWtCO1FBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUU7WUFDdkMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQWdCLENBQUM7WUFDbEYsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQWdCLENBQUM7WUFDdkUsSUFBSSxnQkFBZ0IsSUFBSSxXQUFXLEVBQUU7Z0JBQ25DLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OEVBNUJVLGVBQWU7b0RBQWYsZUFBZTtRQ2Q1Qiw4QkFBOEI7UUFDNUIsZ0VBRU07UUFDTiw4QkFBbUM7UUFDakMsZ0VBSU87UUFDVCxpQkFBTTtRQUNSLGlCQUFNOztRQVY4QixlQUFvQztRQUFwQyx5REFBb0M7UUFLaEQsZUFBa0M7UUFBbEMsNkRBQWtDOzt1RkRRN0MsZUFBZTtjQUwzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3ZDO2dFQUVVLE1BQU07a0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Db21wb25lbnQgfSBmcm9tICcuLi92aXN1YWxpemF0aW9uL3Zpc3VhbGl6YXRpb24uY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLWhlYWRlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG4gIEBJbnB1dCgpIHZpc3VhbDogVmlzdWFsaXphdGlvbkNvbXBvbmVudCA9IHt9IGFzIGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIHVpRWxlbWVudHNMaXN0aW5nKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuY29uZmlnLnVpRWxlbWVudHM7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHsgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuY29uZmlnLnVpRWxlbWVudHM7XHJcbiAgICAgIHRoaXMuYXBwZW5kRWxlbWVudHMoZWxlbWVudHMpO1xyXG4gICAgfSwgMTApO1xyXG4gIH1cclxuXHJcbiAgYXBwZW5kRWxlbWVudHMoZWxlbWVudHM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGVsZW1lbnROYW1lKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgY29uc3QgZWxlbWVudEh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnROYW1lKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgaWYgKGVsZW1lbnRDb250YWluZXIgJiYgZWxlbWVudEh0bWwpIHtcclxuICAgICAgICBlbGVtZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnRIdG1sKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJoZWFkZXItY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cImJvb2ttYXJrcy1jb250YWluZXJcIiAqbmdJZj1cImNvbmZpZ1NlcnZpY2UuY29uZmlnLmJvb2ttYXJrc1wiPlxyXG4gICAgPGxpYi1ib29rbWFya3MgW3Zpc3VhbEVsZW1dPVwidmlzdWFsXCI+PC9saWItYm9va21hcmtzPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJ1aS1lbGVtZW50cy1jb250YWluZXJcIj5cclxuICAgIDxkaXZcclxuICAgICAgKm5nRm9yPVwibGV0IGRpdklkIG9mIGNvbmZpZ1NlcnZpY2UuY29uZmlnLnVpRWxlbWVudHNcIlxyXG4gICAgICBbaWRdPVwiZGl2SWRcIlxyXG4gICAgICBjbGFzcz1cInJpZ2h0XCJcclxuICAgID48L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==