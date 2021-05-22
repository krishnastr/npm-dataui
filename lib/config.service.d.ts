import { Observable, Subject } from 'rxjs';
import { Config } from './interfaces/config.interface';
import * as i0 from "@angular/core";
export declare class ConfigService {
    configObject$: Subject<any>;
    config: Config;
    constructor();
    getConfigObject(): Observable<any>;
    updateValues(values: object): void;
    static ɵfac: i0.ɵɵFactoryDef<ConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ConfigService>;
}
//# sourceMappingURL=config.service.d.ts.map