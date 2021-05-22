import { AnalyticsService } from '@cdx/analytics';
import { AuthenticationService } from '../authentication/authentication.service';
import * as i0 from "@angular/core";
export declare class SnowplowService {
    private analyticsService;
    private authService;
    constructor(analyticsService: AnalyticsService, authService: AuthenticationService);
    setUserId(): void;
    setCustomerId(): void;
    setAppSessionId(): void;
    fetchStructuredEventCategory(category: string): string;
    fetchStructuredEventAction(action: string): string;
    pageTracking(pageName: string): void;
    eventTracking(category: string, action: string, label?: string, property?: string, value?: string): void;
    static ɵfac: i0.ɵɵFactoryDef<SnowplowService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SnowplowService>;
}
//# sourceMappingURL=snowplow.service.d.ts.map