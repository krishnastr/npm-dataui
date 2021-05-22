import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ConfigService {
    constructor() {
        this.configObject$ = new Subject();
        this.config = {
            modules: {
                header: true,
                bookmarks: true,
            },
            bookmarks: {
                envBasedReportIdsMap: {
                    dev: {
                        default: '',
                    },
                    qa: {
                        default: '',
                    },
                    staging: {
                        default: '',
                    },
                    prod: {
                        default: '',
                    }
                },
                embedUrlQueryParamsMap: {
                    default: {}
                }
            },
            uiElements: [],
            roles: [],
        };
    }
    getConfigObject() {
        return this.configObject$.asObservable();
    }
    updateValues(values) {
        Object.assign(this.config, values);
        this.configObject$.next(this.config);
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(); };
ConfigService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfigService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRhLXZpei11aS9zcmMvbGliL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLGFBQWE7SUFpQ3hCO1FBL0JBLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVuQyxXQUFNLEdBQVc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLElBQUk7Z0JBQ1osU0FBUyxFQUFFLElBQUk7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsb0JBQW9CLEVBQUU7b0JBQ3BCLEdBQUcsRUFBRTt3QkFDSCxPQUFPLEVBQUUsRUFBRTtxQkFDWjtvQkFDRCxFQUFFLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLE9BQU8sRUFBRSxFQUFFO3FCQUNaO29CQUNELElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsRUFBRTtxQkFDWjtpQkFDRjtnQkFDRCxzQkFBc0IsRUFBRTtvQkFDdEIsT0FBTyxFQUFFLEVBQ1I7aUJBQ0Y7YUFDRjtZQUNELFVBQVUsRUFBRSxFQUFFO1lBQ2QsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO0lBRWMsQ0FBQztJQUVqQixlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFDRCxZQUFZLENBQUMsTUFBYztRQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OzBFQXpDVSxhQUFhO3FEQUFiLGFBQWEsV0FBYixhQUFhLG1CQUZaLE1BQU07dUZBRVAsYUFBYTtjQUh6QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmZpZy5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XHJcblxyXG4gIGNvbmZpZ09iamVjdCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIGNvbmZpZzogQ29uZmlnID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBoZWFkZXI6IHRydWUsXHJcbiAgICAgIGJvb2ttYXJrczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBib29rbWFya3M6IHtcclxuICAgICAgZW52QmFzZWRSZXBvcnRJZHNNYXA6IHtcclxuICAgICAgICBkZXY6IHtcclxuICAgICAgICAgIGRlZmF1bHQ6ICcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcWE6IHtcclxuICAgICAgICAgIGRlZmF1bHQ6ICcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhZ2luZzoge1xyXG4gICAgICAgICAgZGVmYXVsdDogJycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9kOiB7XHJcbiAgICAgICAgICBkZWZhdWx0OiAnJyxcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVtYmVkVXJsUXVlcnlQYXJhbXNNYXA6IHtcclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdWlFbGVtZW50czogW10sXHJcbiAgICByb2xlczogW10sXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgZ2V0Q29uZmlnT2JqZWN0KCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdPYmplY3QkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuICB1cGRhdGVWYWx1ZXModmFsdWVzOiBvYmplY3QpOiB2b2lkIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHZhbHVlcyk7XHJcbiAgICB0aGlzLmNvbmZpZ09iamVjdCQubmV4dCh0aGlzLmNvbmZpZyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==