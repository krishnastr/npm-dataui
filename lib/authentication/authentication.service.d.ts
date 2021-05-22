import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AuthenticationService {
    apiConfig: any;
    redirectUrl: string;
    apiToken: any;
    isUserLoggedIn: BehaviorSubject<boolean>;
    constructor();
    getTenantApiTokenKey(): string;
    getAuthorizationToken(): string | null;
    isAuthenticated(): boolean;
    setRedirectUrl(url: string): void;
    getRedirectUrl(): string;
    getUserName(): string;
    getUserEmail(): string;
    getClientId(): string;
    parseUserRole(roles: string[]): string;
    isAdmin(): boolean;
    authenticate(token: any): void;
    getUserRole(): string;
    getRoles(): any;
    getTentantApiTokenKey(): string;
    login(): boolean;
    ping(): boolean;
    logout(): boolean;
    redirect(url: string): void;
    signOut(): void;
    static ɵfac: i0.ɵɵFactoryDef<AuthenticationService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthenticationService>;
}
//# sourceMappingURL=authentication.service.d.ts.map