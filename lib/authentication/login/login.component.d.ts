import { OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnowplowService } from '../../snowplow/snowplow.service';
import * as i0 from "@angular/core";
export declare class LoginComponent implements OnInit {
    private authService;
    private router;
    private route;
    private snowplowService;
    constructor(authService: AuthenticationService, router: Router, route: ActivatedRoute, snowplowService: SnowplowService);
    login(): void;
    consume(apiToken: any): void;
    consumePing(apiToken: any): void;
    trackLogin(): void;
    logout(): void;
    validRoute(): string;
    ngOnInit(): void;
    ping(): void;
    static ɵfac: i0.ɵɵFactoryDef<LoginComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<LoginComponent, "lib-login", never, {}, {}, never, never>;
}
//# sourceMappingURL=login.component.d.ts.map