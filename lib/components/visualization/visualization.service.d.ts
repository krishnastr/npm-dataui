import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './../../authentication/config';
import { ConfigService } from '../../config.service';
import * as i0 from "@angular/core";
export declare class VisualizationService {
    private http;
    private apiConfig;
    private configService;
    constructor(http: HttpClient, apiConfig: Config, configService: ConfigService);
    getEmbedToken(reportName: string): Observable<object>;
    getEmbedTokenUrl(reportName: string): string;
    getEmbedParams(reportName: string): string;
    handleError(error: any): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDef<VisualizationService, never>;
    static ɵprov: i0.ɵɵInjectableDef<VisualizationService>;
}
//# sourceMappingURL=visualization.service.d.ts.map