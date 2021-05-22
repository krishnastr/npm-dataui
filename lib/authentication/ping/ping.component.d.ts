import { OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class PingComponent implements OnInit {
    private authService;
    private router;
    private route;
    isSuccess: boolean;
    constructor(authService: AuthenticationService, router: Router, route: ActivatedRoute);
    login(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<PingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<PingComponent, "lib-ping", never, {}, {}, never, never>;
}
//# sourceMappingURL=ping.component.d.ts.map