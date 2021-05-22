import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class DataVizUiService {
    constructor() {
        this.rolesObject$ = new Subject();
        this.distributorTaxonomy$ = new Subject();
    }
    setRoles(roles) {
        this.rolesObject$.next(roles);
    }
    getRoles() {
        return this.rolesObject$.asObservable();
    }
    getTaxonomy() {
        return this.distributorTaxonomy$.asObservable();
    }
    setTaxonomy(taxonomy) {
        this.distributorTaxonomy$.next(taxonomy);
    }
}
DataVizUiService.ɵfac = function DataVizUiService_Factory(t) { return new (t || DataVizUiService)(); };
DataVizUiService.ɵprov = i0.ɵɵdefineInjectable({ token: DataVizUiService, factory: DataVizUiService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS12aXotdWkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvZGF0YS12aXotdWkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFLM0I7UUFIQSxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDbEMseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQUUxQixDQUFDO0lBRWpCLFFBQVEsQ0FBQyxLQUFZO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUFhO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Z0ZBckJVLGdCQUFnQjt3REFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFGZixNQUFNO3VGQUVQLGdCQUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFWaXpVaVNlcnZpY2Uge1xyXG5cclxuICByb2xlc09iamVjdCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgZGlzdHJpYnV0b3JUYXhvbm9teSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHNldFJvbGVzKHJvbGVzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5yb2xlc09iamVjdCQubmV4dChyb2xlcyk7XHJcbiAgfVxyXG5cclxuICBnZXRSb2xlcygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucm9sZXNPYmplY3QkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGF4b25vbXkoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmRpc3RyaWJ1dG9yVGF4b25vbXkkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGF4b25vbXkodGF4b25vbXk6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXN0cmlidXRvclRheG9ub215JC5uZXh0KHRheG9ub215KTtcclxuICB9XHJcbn1cclxuIl19