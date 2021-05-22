import { Observable, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class DataVizUiService {
    rolesObject$: Subject<any>;
    distributorTaxonomy$: Subject<any>;
    constructor();
    setRoles(roles: any[]): void;
    getRoles(): Observable<any>;
    getTaxonomy(): Observable<any>;
    setTaxonomy(taxonomy: any): void;
    static ɵfac: i0.ɵɵFactoryDef<DataVizUiService, never>;
    static ɵprov: i0.ɵɵInjectableDef<DataVizUiService>;
}
//# sourceMappingURL=data-viz-ui.service.d.ts.map