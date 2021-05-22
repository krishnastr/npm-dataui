import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵinject, EventEmitter, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵProvidersFeature, ɵɵelement, Component, Output, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵelementEnd, ɵɵtext, ɵɵpipe, ɵɵproperty, ɵɵadvance, ɵɵpropertyInterpolate, ɵɵtextInterpolate1, ɵɵpipeBind3, ɵɵattribute, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵtemplate, ɵɵreference, ViewChild, Input, ɵɵNgOnChangesFeature, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, throwError } from 'rxjs';
import { AnalyticsService, ANALYTICS_ENVIRONMENT, AnalyticsModule } from '@cdx/analytics';
import jwt_decode from 'jwt-decode';
import { NgForOf, NgIf, SlicePipe, CommonModule } from '@angular/common';
import { TokenType } from 'powerbi-models';
import { map, catchError, takeUntil, publish, refCount, tap, finalize } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { service, factories } from 'powerbi-client';
import { FormControl, FormGroup, Validators, DefaultValueAccessor, NgControlStatus, FormControlDirective, ɵangular_packages_forms_forms_ba, NgControlStatusGroup, FormGroupDirective, FormControlName, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref, Router, ActivatedRoute, RouterModule } from '@angular/router';

class DataVizUiService {
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
DataVizUiService.ɵprov = ɵɵdefineInjectable({ token: DataVizUiService, factory: DataVizUiService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(DataVizUiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class ConfigService {
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
ConfigService.ɵprov = ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(ConfigService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class AnalyticsStructuredEventsMapping {
    static fetchCategory(category) {
        const categories = this.STRUCTURED_CATEGORY;
        return categories[category] || category;
    }
    static fetchAction(action) {
        const actions = this.STRUCTURED_ACTION;
        return actions[action] || action;
    }
}
AnalyticsStructuredEventsMapping.STRUCTURED_ACTION = {
    click: 'Click',
    load: 'Page Load'
};
// Structured Events
AnalyticsStructuredEventsMapping.STRUCTURED_CATEGORY = {
    'load-dashboard': 'hida-load-dashboard',
    login: 'hida-login',
    logout: 'hida-logout',
    'create-bookmark': 'hida-create-bookmark',
    'update-bookmark': 'hida-update-bookmark',
    'delete-bookmark': 'hida-delete-bookmark',
    'load-bookmarks': 'hida-load-bookmarks',
    'select-bookmarks': 'hida-select-bookmarks',
    'page-changed': 'hida-page-changed'
};

class DataVizUiEnvironmentManager {
    static setEnvironment(environment) {
        DataVizUiEnvironmentManager.environment = environment;
    }
    static getEnvironment() {
        return DataVizUiEnvironmentManager.environment;
    }
    static setTenant(tenant) {
        DataVizUiEnvironmentManager.tenant = tenant;
    }
    static getTenant() {
        return DataVizUiEnvironmentManager.tenant;
    }
}

class AppConfig {
    static fetchAppEnv() {
        this.appEnv = DataVizUiEnvironmentManager.getEnvironment();
        return this.appEnvMapping[this.appEnv] || 'dev';
    }
    static environmentFileConstant() {
        return ['environment', this.fetchAppEnv(), 'json']
            .filter(Boolean)
            .join('.');
    }
    static apiUrl() {
        return this.appEnvApiUrlMapping[this.fetchAppEnv()];
    }
}
AppConfig.appEnvMapping = {
    dev: 'dev',
    snapshot: 'dev',
    stable: 'stable',
    production: 'production',
};
AppConfig.appEnvApiUrlMapping = {
    dev: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
    stable: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
    production: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
};
AppConfig.appEnv = 'dev';

class Config {
    constructor() {
        this.setConfig();
    }
    setConfig() {
        this.apiConfig = {
            apiUrl: AppConfig.apiUrl(),
            endPoints: {
                login: 'login',
                logout: 'logOut',
                ping: 'ping',
            },
            token: 'jwt-token',
        };
    }
    getConfig() {
        return this.apiConfig;
    }
}

class AuthenticationService {
    constructor() {
        this.redirectUrl = '';
        this.isUserLoggedIn = new BehaviorSubject(false);
        this.apiConfig = new Config().getConfig();
    }
    getTenantApiTokenKey() {
        return [DataVizUiEnvironmentManager.getTenant(), 'api-token'].join('-');
    }
    getAuthorizationToken() {
        return sessionStorage.getItem(this.getTenantApiTokenKey());
    }
    isAuthenticated() {
        return sessionStorage.getItem(this.getTenantApiTokenKey()) !== null;
    }
    setRedirectUrl(url) {
        this.redirectUrl = url;
    }
    getRedirectUrl() {
        return this.redirectUrl || '';
    }
    getUserName() {
        return localStorage.getItem('user-name') || '';
    }
    getUserEmail() {
        const jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return decodedToken['email'];
        }
        return '';
    }
    getClientId() {
        const jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return decodedToken['clientId'];
        }
        return '';
    }
    parseUserRole(roles) {
        if (roles === null || roles === undefined || roles.length === 0) {
            return '';
        }
        if (roles.some(role => role.toLowerCase() === 'distributor')) {
            return 'DISTRIBUTOR';
        }
        else if (roles.some(role => role.toLowerCase() === 'manufacturer')) {
            return 'MANUFACTURER';
        }
        else {
            return '';
        }
    }
    isAdmin() {
        return this.getUserRole() !== '' && this.getUserRole().toLowerCase() === 'admin';
    }
    authenticate(token) {
        if (token) {
            sessionStorage.setItem(this.getTenantApiTokenKey(), token);
            this.isUserLoggedIn.next(true);
        }
    }
    getUserRole() {
        const jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return this.parseUserRole(decodedToken['roles']);
        }
        return '';
    }
    getRoles() {
        const jwtToken = sessionStorage.getItem(this.getTentantApiTokenKey());
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            return decodedToken['roles'];
        }
        return '';
    }
    getTentantApiTokenKey() {
        return this.apiConfig.tenantId + '-api-token';
    }
    login() {
        this.signOut();
        const url = this.apiConfig.apiUrl +
            this.apiConfig.endPoints.login +
            '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
            '&redirectTo=' +
            this.getRedirectUrl();
        this.redirect(url); // Redirect user to login page
        // this.redirect('http://localhost:8080/HidaApiGateway/login?redirectTo=/dashboard');
        return false;
    }
    ping() {
        this.signOut();
        const url = this.apiConfig.apiUrl +
            this.apiConfig.endPoints.ping +
            '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
            '&redirectTo=' +
            this.getRedirectUrl();
        this.redirect(url); // Redirect user to ping endpoint
        return false;
    }
    logout() {
        const url = this.apiConfig.apiUrl +
            this.apiConfig.endPoints.logout +
            '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
            '&api_token=' +
            sessionStorage.getItem(this.getTenantApiTokenKey());
        this.signOut();
        this.redirect(url); // Redirect user to logout page
        return false;
    }
    redirect(url) {
        window.location.replace(url);
    }
    signOut() {
        sessionStorage.clear();
    }
}
AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(); };
AuthenticationService.ɵprov = ɵɵdefineInjectable({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(AuthenticationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();

class SnowplowService {
    constructor(analyticsService, authService) {
        this.analyticsService = analyticsService;
        this.authService = authService;
    }
    setUserId() {
        const userId = this.authService.getUserEmail();
        if (userId) {
            // Since userId represents sensitive information - email, second parameter useHash is set to true
            this.analyticsService.setUserId(userId, true);
        }
    }
    setCustomerId() {
    }
    setAppSessionId() {
        const userSessionId = this.authService.getAuthorizationToken();
        if (userSessionId) {
            this.analyticsService.setAppSessionId(userSessionId);
        }
    }
    fetchStructuredEventCategory(category) {
        return AnalyticsStructuredEventsMapping.fetchCategory(category);
    }
    fetchStructuredEventAction(action) {
        return AnalyticsStructuredEventsMapping.fetchAction(action);
    }
    pageTracking(pageName) {
        this.analyticsService.trackPage(pageName);
    }
    eventTracking(category, action, label, property, value) {
        category = this.fetchStructuredEventCategory(category);
        action = this.fetchStructuredEventAction(action);
        if (label || property || value) {
            this.analyticsService.trackEventFull(category, action, label, property, value);
        }
        else {
            this.analyticsService.trackEvent(category, action);
        }
    }
}
SnowplowService.ɵfac = function SnowplowService_Factory(t) { return new (t || SnowplowService)(ɵɵinject(AnalyticsService), ɵɵinject(AuthenticationService)); };
SnowplowService.ɵprov = ɵɵdefineInjectable({ token: SnowplowService, factory: SnowplowService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(SnowplowService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: AnalyticsService }, { type: AuthenticationService }]; }, null); })();

class VisualizationService {
    constructor(http, apiConfig, configService) {
        this.http = http;
        this.apiConfig = apiConfig;
        this.configService = configService;
    }
    getEmbedToken(reportName) {
        const apiUrl = this.apiConfig.getConfig().apiUrl;
        return this.http
            .get(apiUrl + this.getEmbedTokenUrl(reportName))
            .pipe(map((token) => {
            catchError(this.handleError);
            return token;
        }));
    }
    getEmbedTokenUrl(reportName) {
        console.log(AppConfig.fetchAppEnv());
        console.log(reportName);
        return 'api/embedtoken/v1/api/embedtoken?reportId='
            + this.configService.config.bookmarks.envBasedReportIdsMap[AppConfig.fetchAppEnv()][reportName]
            + this.getEmbedParams(reportName);
    }
    getEmbedParams(reportName) {
        const params = this.configService.config.bookmarks.embedUrlQueryParamsMap[reportName];
        let url = '';
        if (params) {
            Object.keys(params).forEach(param => {
                url = url + '&' + param + '=' + (params[param].encoded ? encodeURIComponent(params[param].value) : params[param].value);
            });
        }
        return url;
    }
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
VisualizationService.ɵfac = function VisualizationService_Factory(t) { return new (t || VisualizationService)(ɵɵinject(HttpClient), ɵɵinject(Config), ɵɵinject(ConfigService)); };
VisualizationService.ɵprov = ɵɵdefineInjectable({ token: VisualizationService, factory: VisualizationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(VisualizationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: HttpClient }, { type: Config }, { type: ConfigService }]; }, null); })();

class VisualizationComponent {
    constructor(visualizationService, authService, snowplowService, configService) {
        this.visualizationService = visualizationService;
        this.authService = authService;
        this.snowplowService = snowplowService;
        this.configService = configService;
        this.unSubscribe = new Subject();
        this.MINUTES_BEFORE_EXPIRATION = 10;
        this.INTERVAL_TIME = 4; // In minutes
        this.tokenExpiration = '';
        this.save = new EventEmitter();
        this.defaultView = new EventEmitter();
    }
    ngOnInit() {
        this.configService.getConfigObject().subscribe(config => {
            this.getEmbedToken('new');
        });
        // Grab the reference to the div HTML element that will host the report.
        this.reportsContainer = (document.getElementById('reportsContainer'));
        // Embed the report and display it within the div container.
        this.powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);
        this.powerbi.bootstrap(this.reportsContainer, {
            type: 'report',
            tokenType: TokenType.Embed,
            uniqueId: 1,
            embedUrl: '',
            accessToken: '',
            settings: {
                navContentPaneEnabled: false,
            },
        });
        setInterval(() => this.checkTokenAndUpdate(), this.INTERVAL_TIME * 60 * 1000);
        this.getEmbedToken('new');
        // Track load dashboard event
        this.snowplowService.eventTracking('load-dashboard', 'load', 'reportName', '', this.getReportName());
    }
    getReports(embedResponse) {
        const config = {
            type: 'report',
            tokenType: TokenType.Embed,
            uniqueId: embedResponse.embedReports[0].reportId,
            embedUrl: embedResponse.embedReports[0].embedUrl,
            accessToken: embedResponse.embedToken.token,
            settings: {
                navContentPaneEnabled: false,
            },
        };
        this.report = this.powerbi.embed(this.reportsContainer, config);
        // Report.off removes a given event handler if it exists.
        this.report.off('loaded');
        // this.report.on will add an event handler which prints to Log window.
        this.report.on('loaded', (e) => {
            this.getBookmarkState('defaultView');
        });
        this.report.on('pageChanged', (page) => {
            // Track page changed event
            this.snowplowService.eventTracking('page-changed', 'click', 'pageName', '', page.detail.newPage.displayName);
        });
        this.report.on('error', (event) => {
            this.report.off('error');
        });
    }
    getBookmarkState(type) {
        const state = this.report.bookmarksManager.capture({
            allPages: true,
            personalizeVisuals: true,
        });
        // defaultView will be called only once on initial load of powerbi report
        type === 'defaultView'
            ? this.defaultView.emit(state)
            : this.save.emit(state);
        return state;
    }
    loadReport(bookmark, type) {
        // const state = bookmark.bookmarkState ? bookmark.bookmarkState : bookmark.state;
        this.report.bookmarksManager
            .applyState(bookmark.bookmarkState)
            .then((appliedState) => {
            this.report.getPages().then((pages) => {
                this.report.setPage(pages[0].name);
            });
        });
    }
    getEmbedToken(type, taxonomy) {
        const roles = this.configService.config.roles;
        let reportName = roles ? this.getReportName() : '';
        if (taxonomy) {
            reportName = taxonomy;
        }
        this.visualizationService
            .getEmbedToken(reportName)
            .pipe(takeUntil(this.unSubscribe))
            .subscribe((resp) => {
            this.subscribeGetEmbedToken(resp, type);
        });
    }
    subscribeGetEmbedToken(resp, type) {
        this.tokenExpiration = resp['embedToken'].expiration;
        if (type === 'new') {
            this.getReports(resp);
        }
        else {
            this.updateToken(resp);
        }
    }
    getReportName() {
        const reportNameRoleMapping = {
            Distributor: 'DIST',
            Manufacturer: 'MAN'
        };
        const role = this.configService.config.roles;
        if (role && role[0] === 'Distributor') {
            const reportName = localStorage.getItem('distributorTaxonomy');
            if (reportName) {
                return reportName;
            }
            else {
                localStorage.setItem('distributorTaxonomy', 'DIST');
                return 'DIST';
            }
        }
        return reportNameRoleMapping[role[0]] || '';
    }
    checkTokenAndUpdate() {
        // Get the current time
        const currentTime = Date.now();
        const expiration = Date.parse(this.tokenExpiration);
        // Time until token expiration in milliseconds
        const timeUntilExpiration = expiration - currentTime;
        const timeToUpdate = this.MINUTES_BEFORE_EXPIRATION * 60 * 1000;
        // Update the token if it is about to expired
        if (timeUntilExpiration <= timeToUpdate) {
            this.getEmbedToken('update');
        }
    }
    updateToken(resp) {
        // Set the new access token
        this.report.setAccessToken(resp.embedToken.token);
    }
    ngOnDestroy() {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }
}
VisualizationComponent.ɵfac = function VisualizationComponent_Factory(t) { return new (t || VisualizationComponent)(ɵɵdirectiveInject(VisualizationService), ɵɵdirectiveInject(AuthenticationService), ɵɵdirectiveInject(SnowplowService), ɵɵdirectiveInject(ConfigService)); };
VisualizationComponent.ɵcmp = ɵɵdefineComponent({ type: VisualizationComponent, selectors: [["lib-visualization"]], outputs: { save: "save", defaultView: "defaultView" }, features: [ɵɵProvidersFeature([VisualizationService])], decls: 1, vars: 0, consts: [["id", "reportsContainer", 2, "width", "100%", "height", "1000px"]], template: function VisualizationComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "div", 0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(VisualizationComponent, [{
        type: Component,
        args: [{
                selector: 'lib-visualization',
                templateUrl: './visualization.component.html',
                providers: [VisualizationService],
            }]
    }], function () { return [{ type: VisualizationService }, { type: AuthenticationService }, { type: SnowplowService }, { type: ConfigService }]; }, { save: [{
            type: Output
        }], defaultView: [{
            type: Output
        }] }); })();

var arrayApis = {
    sort(array, orderType, ascending, key) {
        return this.sortAlphabetically(array, ascending, key);
    },
    sortAlphabetically(array, ascending, key) {
        array.sort((a, b) => {
            const la = a.bookmarkName.toLowerCase();
            const lb = b.bookmarkName.toLowerCase();
            if (la > lb) {
                return 1;
            }
            if (la < lb) {
                return -1;
            }
            return 0;
        });
        return ascending ? array : array.reverse();
    },
};

class BookmarkService {
    constructor(http, apiConfig, configService, authService) {
        this.http = http;
        this.apiConfig = apiConfig;
        this.configService = configService;
        this.authService = authService;
        this.apiUrl = this.apiConfig.getConfig().apiUrl;
        this.reportName = configService.config['roles'].
            includes('Manufacturer') ? 'MAN' : 'DIST';
        this.tenantId = DataVizUiEnvironmentManager.getTenant();
    }
    getBookmarks(reportName) {
        if (reportName) {
            this.reportName = reportName;
        }
        return this.http
            .get(this.apiUrl + `api/bookmarks/v1/api/bookmarks?reportName=${this.reportName}&tenantId=${this.tenantId}`)
            .pipe(map((bookmarks) => {
            return bookmarks;
        }), catchError((error) => throwError(error)));
    }
    createBookmark(bookmark) {
        const requestData = {};
        requestData.bookmarkName = bookmark.bookmarkName;
        requestData.bookmarkState = bookmark.state;
        requestData.reportName = this.reportName;
        requestData.tenantId = this.tenantId;
        return this.http
            .post(this.apiUrl + 'api/bookmarks/v1/api/bookmarks', requestData)
            .pipe(map((data) => {
            catchError(this.handleError);
            return data;
        }));
    }
    updateBookmark(editedBookmark) {
        const requestData = {};
        requestData.bookmarkName = editedBookmark.bookmarkName;
        requestData.bookmarkState = editedBookmark.bookmarkState;
        requestData.reportName = this.reportName;
        requestData.tenantId = this.tenantId;
        return this.http
            .put(this.apiUrl + 'api/bookmarks/v1/api/bookmarks/' + editedBookmark.bookmarkId, requestData)
            .pipe(map((data) => {
            catchError(this.handleError);
            return data;
        }));
    }
    updateBookmarkName(editedBookmark, newName) {
        const requestData = {};
        requestData.bookmarkName = newName;
        requestData.bookmarkState = editedBookmark.bookmarkState;
        requestData.reportName = this.reportName;
        return this.http
            .put(this.apiUrl +
            `api/bookmarks/v1/api/bookmarks/${editedBookmark.bookmarkId}`, requestData)
            .pipe(map((data) => {
            catchError(this.handleError);
            return data;
        }));
    }
    deleteBookmark(bookmark) {
        return this.http
            .delete(this.apiUrl + `api/bookmarks/v1/api/bookmarks/${bookmark.bookmarkId}`, { responseType: 'text' })
            .pipe(map((data) => {
            // catchError(this.handleError);
            return data;
        }));
    }
    handleError(error) {
        console.log(error);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
BookmarkService.ɵfac = function BookmarkService_Factory(t) { return new (t || BookmarkService)(ɵɵinject(HttpClient), ɵɵinject(Config), ɵɵinject(ConfigService), ɵɵinject(AuthenticationService)); };
BookmarkService.ɵprov = ɵɵdefineInjectable({ token: BookmarkService, factory: BookmarkService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(BookmarkService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: HttpClient }, { type: Config }, { type: ConfigService }, { type: AuthenticationService }]; }, null); })();

class NotificationService {
    constructor() {
        this.notificationSubject = new BehaviorSubject(null);
        this.notification$ = this.notificationSubject
            .asObservable()
            .pipe(publish(), refCount());
    }
    notify(message) {
        this.notificationSubject.next(message);
    }
}
NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(); };
NotificationService.ɵprov = ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();

const _c0 = ["closeButton"];
const _c1 = ["saveButton"];
const _c2 = ["deleteButton"];
const _c3 = ["updateButton"];
const _c4 = ["modalOverlay"];
function BookmarksComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 43);
    ɵɵelementStart(1, "input", 44);
    ɵɵlistener("change", function BookmarksComponent_div_18_Template_input_change_1_listener($event) { ɵɵrestoreView(_r13); const state_r11 = ctx.$implicit; const ctx_r12 = ɵɵnextContext(); return ctx_r12.onBookmarkSelect($event, state_r11); });
    ɵɵelementEnd();
    ɵɵelementStart(2, "label", 45);
    ɵɵtext(3);
    ɵɵpipe(4, "slice");
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 46);
    ɵɵelementStart(6, "a", 47);
    ɵɵlistener("click", function BookmarksComponent_div_18_Template_a_click_6_listener() { ɵɵrestoreView(_r13); const state_r11 = ctx.$implicit; const ctx_r14 = ɵɵnextContext(); return ctx_r14.editBookmark(state_r11); });
    ɵɵelement(7, "em", 48);
    ɵɵelementEnd();
    ɵɵtext(8, "| ");
    ɵɵelementStart(9, "a", 49);
    ɵɵlistener("click", function BookmarksComponent_div_18_Template_a_click_9_listener() { ɵɵrestoreView(_r13); const state_r11 = ctx.$implicit; const ctx_r15 = ɵɵnextContext(); return ctx_r15.deleteBookmark(state_r11); });
    ɵɵelement(10, "em", 50);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const state_r11 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("title", state_r11.bookmarkName);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("id", state_r11.bookmarkName);
    ɵɵproperty("checked", state_r11.bookmarkName === ctx_r1.selectedBookmark.bookmarkName);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("for", state_r11.bookmarkName);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", (state_r11 == null ? null : state_r11.bookmarkName == null ? null : state_r11.bookmarkName.length) > 24 ? ɵɵpipeBind3(4, 7, state_r11 == null ? null : state_r11.bookmarkName, 0, 24) + "..." : state_r11 == null ? null : state_r11.bookmarkName, " ");
    ɵɵadvance(3);
    ɵɵattribute("tabindex", state_r11.bookmarkName === ctx_r1.selectedBookmark.bookmarkName ? 0 : -1);
    ɵɵadvance(3);
    ɵɵattribute("tabindex", state_r11.bookmarkName === ctx_r1.selectedBookmark.bookmarkName ? 0 : -1);
} }
function BookmarksComponent_span_43_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 51);
    ɵɵtext(1, "Please enter name containing alphabets, numbers and special characters .*-/'. Length should between 3 and 140 characters!");
    ɵɵelementEnd();
} }
class BookmarksComponent {
    constructor(bookmarkService, notifier, snowplowService, configService, dvService) {
        this.bookmarkService = bookmarkService;
        this.notifier = notifier;
        this.snowplowService = snowplowService;
        this.configService = configService;
        this.dvService = dvService;
        this.selectedBookmark = { bookmarkName: 'Default View' };
        this.title = 'data-viz-ui';
        this.allBookmarks = [];
        this.currentState = {};
        this.editedBookmark = {};
        this.isModalOpen = false;
        this.duplicateBookmark = {};
        this.areFiltersChanged = false;
        this.states = [];
        this.showSettings = false;
        this.unSubscribe = new Subject();
        this.HIDE_SETTINGS_FOR_CLIENT_IDS = ['5'];
        this.closeButton = {};
        this.saveButton = {};
        this.deleteButton = {};
        this.updateButton = {};
        this.modalOverlay = {};
        // @Input() states: PowerbiBookmark[];
        this.visualElem = {};
        this.save = new EventEmitter();
    }
    ngOnInit() {
        this.configService.getConfigObject().subscribe(config => {
            this.getBookmarks();
            // TODO: need to verify
            this.snowplowService.eventTracking('load-bookmarks', 'load');
        });
        this.dvService.getTaxonomy().subscribe((distributorTaxonomy) => {
            this.onTaxonomyChange(distributorTaxonomy);
        });
        this.searchBookmark = new FormControl('');
        this.states = [];
        this.bookmarkForm = new FormGroup({
            bookmarkName: new FormControl('', [
                Validators.required,
                Validators.pattern('[a-zA-Z0-9.*\'/ -]*'),
                Validators.minLength(3),
                Validators.maxLength(140),
            ]),
        });
    }
    ngAfterContentInit() {
        this.getBookmarks();
        setTimeout(() => {
            // As first click of dropdown not working .... hint: bootstrap module loaded twice
            const dropdownBtn = document.getElementsByClassName('dropdown-btn')[0];
            dropdownBtn.click();
            dropdownBtn.blur();
            this.visualElem.defaultView.subscribe((value) => {
                value.then((bookmark) => {
                    this.defaultViewBookmark = bookmark;
                    this.defaultViewBookmark.bookmarkState = bookmark.state;
                    this.getDefaultView();
                })
                    .catch((error) => {
                    throwError(error);
                });
            });
        }, 1000);
    }
    getBookmarks(reportName) {
        console.log('getBookmarks called');
        this.bookmarkService
            .getBookmarks(reportName)
            .pipe(takeUntil(this.unSubscribe))
            .subscribe((bookmarks) => {
            this.sortBookmarks(bookmarks);
        });
    }
    sortBookmarks(bookmarks) {
        if (bookmarks) {
            bookmarks = arrayApis.sort(bookmarks, 'alphabetic', true);
            this.states = bookmarks;
            this.allBookmarks = bookmarks;
        }
    }
    closeDropdown(event) {
        this.resetDropdown();
    }
    onClick(event) {
        if (this.modalOverlay && !this.modalOverlay.nativeElement.contains(event.target)) {
            this.resetDropdown();
        }
    }
    onTaxonomyChange(reportName) {
        this.visualElem.getEmbedToken('new', reportName);
        this.getBookmarks(reportName);
        localStorage.setItem('distributorTaxonomy', reportName);
    }
    onBookmarkSelect(event, state) {
        if (state) {
            this.selectedBookmark = state;
        }
        this.areFiltersChanged = false;
        this.resetDropdown();
        this.visualElem.loadReport(state, 'custom');
        // TODO: need to verify
        this.snowplowService.eventTracking('select-bookmarks', 'click', 'Selected Bookmark Name', '', state.bookmarkName);
    }
    onSearchBookmark(event) {
        const allBookmarks = JSON.parse(JSON.stringify(this.allBookmarks));
        const searchValue = this.searchBookmark.value.toLowerCase();
        if (searchValue !== '') {
            this.states = allBookmarks.filter((bookmark) => bookmark.bookmarkName.toLowerCase().includes(searchValue));
        }
        else {
            this.states = this.allBookmarks;
        }
    }
    onBookmarkNameChange(name) {
        var _a;
        this.isDuplicate = name.trim() === ((_a = this.duplicateBookmark) === null || _a === void 0 ? void 0 : _a.bookmarkName);
    }
    saveBookmark(data) {
        if (!this.editedBookmark) {
            this.createBookmark();
        }
        else {
            this.updateBookmarkName();
        }
    }
    createBookmark() {
        const bookmarkName = this.bookmarkForm.controls.bookmarkName.value;
        const duplicate = this.allBookmarks.find((bookmark) => bookmark.bookmarkName === bookmarkName);
        if (duplicate) {
            this.duplicateBookmark = duplicate;
        }
        if (this.duplicateBookmark) {
            this.isDuplicate = true;
            return this.notifier.notify({
                message: 'Failed to save view. A view with same name already exists!',
                statusCode: 400,
            });
        }
        this.visualElem.getBookmarkState('save').then((state) => {
            this.currentState = state;
            this.currentState.bookmarkName = bookmarkName;
            this.closeButton.nativeElement.click();
            this.bookmarkForm.controls.bookmarkName.setValue('');
            this.bookmarkService
                .createBookmark(this.currentState)
                .pipe(takeUntil(this.unSubscribe))
                .subscribe((bookmark) => {
                this.subscribeCreateBookmark(bookmark);
            });
            // Track create bookmark event
            this.snowplowService.eventTracking('create-bookmark', 'click', 'bookmarkName', '', bookmarkName);
        });
    }
    subscribeCreateBookmark(bookmark) {
        this.states = arrayApis.sort(this.states, 'alphabetic', true);
        this.states.unshift(bookmark);
        this.states = [...this.states];
        this.allBookmarks = [...this.states];
        if (bookmark) {
            this.selectedBookmark = bookmark;
        }
    }
    updateBookmark() {
        this.visualElem.getBookmarkState('save').then((bookmark) => {
            this.currentState = JSON.parse(JSON.stringify(this.selectedBookmark));
            if (bookmark.state) {
                this.currentState.bookmarkState = bookmark.state;
            }
            this.bookmarkService
                .updateBookmark(this.currentState)
                .pipe(takeUntil(this.unSubscribe))
                .subscribe((bookmarkResp) => {
                this.subscribeUpdateBookmark(bookmarkResp);
            });
        });
        // Track update bookmark event
        this.snowplowService.eventTracking('update-bookmark', 'click', 'bookmarkName', '', this.selectedBookmark.bookmarkName);
    }
    subscribeUpdateBookmark(bookmark) {
        const selectedBookmark = this.allBookmarks.find(bkmk => bkmk.bookmarkName === this.selectedBookmark.bookmarkName);
        if (selectedBookmark) {
            selectedBookmark.bookmarkState = bookmark.bookmarkState;
        }
        this.states = this.allBookmarks;
        this.updateButton.nativeElement.click();
    }
    updateBookmarkName() {
        const name = this.bookmarkForm.controls.bookmarkName.value;
        const duplicate = this.allBookmarks.find((bookmark) => bookmark.bookmarkName === name);
        if (duplicate) {
            this.duplicateBookmark = duplicate;
        }
        if (this.duplicateBookmark) {
            this.isDuplicate = true;
            return this.notifier.notify({
                message: 'Failed to update view. A view with same name exists!',
                statusCode: 400,
            });
        }
        const reqObj = JSON.parse(JSON.stringify(this.editedBookmark));
        reqObj.bookmarkName = name;
        this.bookmarkService
            .updateBookmark(reqObj)
            .pipe(takeUntil(this.unSubscribe))
            .subscribe((bookmark) => {
            this.subscribeUpdateBookmarkName(bookmark, name);
        });
        // Track update bookmark event
        this.snowplowService.eventTracking('update-bookmark', 'click', 'bookmarkName', '', reqObj.bookmarkName);
    }
    subscribeUpdateBookmarkName(bookmark, updateName) {
        if (this.editedBookmark.bookmarkName ===
            this.selectedBookmark.bookmarkName) {
            this.selectedBookmark.bookmarkName = updateName;
        }
        const editedBookmark = this.allBookmarks.find(bkmk => bkmk.bookmarkName === this.editedBookmark.bookmarkName);
        if (editedBookmark) {
            editedBookmark.bookmarkName = updateName;
        }
        this.states = this.allBookmarks;
        this.closeButton.nativeElement.click();
        this.bookmarkForm.controls.bookmarkName.setValue('');
    }
    editBookmark(bookmark) {
        if (this.bookmarkForm && this.bookmarkForm.controls) {
            this.bookmarkForm.controls.bookmarkName.setValue(bookmark.bookmarkName);
            this.editedBookmark = bookmark;
        }
    }
    deleteBookmark(bookmark) {
        this.currentDeleteBookmark = bookmark;
    }
    confirmDeleteBookmark() {
        this.deleteButton.nativeElement.click();
        this.bookmarkService
            .deleteBookmark(this.currentDeleteBookmark)
            .pipe(takeUntil(this.unSubscribe))
            .subscribe((bookmarkName) => {
            this.subscribeConfirmDeleteBookmark();
        });
        // Track delete bookmark event
        this.snowplowService.eventTracking('delete-bookmark', 'click', 'bookmarkName', '', this.selectedBookmark.bookmarkName);
    }
    subscribeConfirmDeleteBookmark() {
        if (this.currentDeleteBookmark.bookmarkName ===
            this.selectedBookmark.bookmarkName) {
            this.getDefaultView();
        }
        const states = this.states.filter((bookmark) => bookmark.bookmarkName !== this.currentDeleteBookmark.bookmarkName);
        this.states = states;
        this.allBookmarks = states;
    }
    closeModal() {
        this.editedBookmark = undefined;
        this.bookmarkForm.reset();
    }
    resetDropdown() {
        const dropdown = document.getElementsByClassName('dropdown-menu')[0];
        dropdown.classList.add('show');
        this.modalOverlay.nativeElement.scrollTop = 0;
        dropdown.classList.remove('show');
        this.searchBookmark.setValue('');
        this.states = this.allBookmarks;
    }
    getDefaultView() {
        this.selectedBookmark = { bookmarkName: 'Default View' };
        this.areFiltersChanged = false;
        this.visualElem.loadReport(this.defaultViewBookmark, 'default');
        const defaultView = document.querySelector('#default');
        defaultView.checked = true;
    }
    saveView() { }
    ngOnDestroy() {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }
}
BookmarksComponent.ɵfac = function BookmarksComponent_Factory(t) { return new (t || BookmarksComponent)(ɵɵdirectiveInject(BookmarkService), ɵɵdirectiveInject(NotificationService), ɵɵdirectiveInject(SnowplowService), ɵɵdirectiveInject(ConfigService), ɵɵdirectiveInject(DataVizUiService)); };
BookmarksComponent.ɵcmp = ɵɵdefineComponent({ type: BookmarksComponent, selectors: [["lib-bookmarks"]], viewQuery: function BookmarksComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, 1);
        ɵɵviewQuery(_c1, 1);
        ɵɵviewQuery(_c2, 1);
        ɵɵviewQuery(_c3, 1);
        ɵɵviewQuery(_c4, 1);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeButton = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.saveButton = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.deleteButton = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.updateButton = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.modalOverlay = _t.first);
    } }, inputs: { visualElem: "visualElem" }, outputs: { save: "save" }, decls: 85, vars: 12, consts: [[1, "row"], [1, "w-100", "show", "col-xl-12", "bookmark-dropdown"], ["type", "button", "id", "dropdownMenu", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", 1, "btn", "dropdown-btn", "dropdown-toggle", "col-xl-2", "mt10", 3, "title"], ["appDropdownStatusListener", "", "id", "dropdownMenu", "role", "menu", "aria-labelledby", "dropdownMenu", 1, "dropdown-menu", "col-xl-4", 3, "close"], ["modalOverlay", ""], [1, "list-group"], [1, "list-group-item", "custom-control", "custom-radio", "default-view", 3, "click"], ["type", "radio", "id", "default", "name", "filterGroupRadios", "checked", "", 1, "custom-control-input"], ["for", "default", 1, "custom-control-label"], ["placeholder", "Search views", "id", "searchBookmark", "name", "searchBookmark", "type", "text", "aria-describedby", "searchBookmark", "autocomplete", "off", 1, "form-control", 3, "formControl", "keyup"], ["class", "list-group-item custom-control custom-radio", 3, "title", 4, "ngFor", "ngForOf"], ["type", "button", "data-toggle", "modal", "data-target", "#exampleModalCenter", 1, "btn", "btn-success", "mt10", "save-view"], ["saveButton", ""], ["type", "button", "data-toggle", "modal", "data-target", "#updateBookmark", 1, "btn", "btn-secondary", "mt10", "save-view", 3, "disabled"], ["id", "exampleModalCenter", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], ["bookmarkModal", ""], ["role", "document", 1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "bookmark-modal"], ["name", "bookmarkForm", 3, "formGroup", "ngSubmit"], [1, "modal-header"], ["id", "exampleModalCenterTitle", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close", 3, "click"], ["closeButton", ""], ["aria-hidden", "true"], [1, "divider"], [1, "modal-body"], [1, "form-group"], ["for", "exampleInputEmail1"], ["type", "text", "formControlName", "bookmarkName", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", 3, "placeholder", "keyup"], ["name", ""], ["class", "text-error", 4, "ngIf"], [1, "modal-footer"], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["id", "deleteBookmark", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], [1, "modal-content"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["deleteButton", ""], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-secondary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["id", "updateBookmark", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], ["id", "updateBookmark", 1, "modal-title"], ["updateButton", ""], [1, "list-group-item", "custom-control", "custom-radio", 3, "title"], ["type", "radio", "name", "filterGroupRadios", 1, "custom-control-input", 3, "id", "checked", "change"], [1, "custom-control-label", 3, "for"], [1, "pull-right"], ["title", "Edit", 3, "routerLink", "click"], ["data-toggle", "modal", "data-target", "#exampleModalCenter", 1, "fa", "fa-edit"], ["title", "Delete", 3, "routerLink", "click"], ["data-toggle", "modal", "data-target", "#deleteBookmark", 1, "fa", "fa-trash"], [1, "text-error"]], template: function BookmarksComponent_Template(rf, ctx) { if (rf & 1) {
        const _r16 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "div", 0);
        ɵɵelementStart(3, "button", 2);
        ɵɵtext(4);
        ɵɵpipe(5, "slice");
        ɵɵelementEnd();
        ɵɵelementStart(6, "div", 3, 4);
        ɵɵlistener("close", function BookmarksComponent_Template_div_close_6_listener($event) { return ctx.closeDropdown($event); });
        ɵɵelementStart(8, "div", 5);
        ɵɵelementStart(9, "div", 6);
        ɵɵlistener("click", function BookmarksComponent_Template_div_click_9_listener() { return ctx.getDefaultView(); });
        ɵɵelement(10, "input", 7);
        ɵɵelementStart(11, "label", 8);
        ɵɵtext(12, "Default View");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(13, "div", 5);
        ɵɵelementStart(14, "h6");
        ɵɵtext(15, "My Saved Criteria");
        ɵɵelementEnd();
        ɵɵelementStart(16, "div");
        ɵɵelementStart(17, "input", 9);
        ɵɵlistener("keyup", function BookmarksComponent_Template_input_keyup_17_listener($event) { return ctx.onSearchBookmark($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(18, BookmarksComponent_div_18_Template, 11, 11, "div", 10);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(19, "button", 11, 12);
        ɵɵtext(21, " Save View As ");
        ɵɵelementEnd();
        ɵɵelementStart(22, "button", 13);
        ɵɵtext(23, " Update View ");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(24, "div", 14, 15);
        ɵɵelementStart(26, "div", 16);
        ɵɵelementStart(27, "div", 17);
        ɵɵelementStart(28, "form", 18);
        ɵɵlistener("ngSubmit", function BookmarksComponent_Template_form_ngSubmit_28_listener($event) { return ctx.saveBookmark($event); });
        ɵɵelementStart(29, "div", 19);
        ɵɵelementStart(30, "span", 20);
        ɵɵtext(31, "Save current view");
        ɵɵelementEnd();
        ɵɵelementStart(32, "button", 21, 22);
        ɵɵlistener("click", function BookmarksComponent_Template_button_click_32_listener() { return ctx.closeModal(); });
        ɵɵelementStart(34, "span", 23);
        ɵɵtext(35, "\u00D7");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelement(36, "div", 24);
        ɵɵelementStart(37, "div", 25);
        ɵɵelementStart(38, "div", 26);
        ɵɵelementStart(39, "label", 27);
        ɵɵtext(40, "View name");
        ɵɵelementEnd();
        ɵɵelementStart(41, "input", 28, 29);
        ɵɵlistener("keyup", function BookmarksComponent_Template_input_keyup_41_listener() { ɵɵrestoreView(_r16); const _r5 = ɵɵreference(42); return ctx.onBookmarkNameChange(_r5.value); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(43, BookmarksComponent_span_43_Template, 2, 0, "span", 30);
        ɵɵelementEnd();
        ɵɵelementStart(44, "div", 31);
        ɵɵelementStart(45, "button", 32);
        ɵɵlistener("click", function BookmarksComponent_Template_button_click_45_listener() { return ctx.closeModal(); });
        ɵɵtext(46, " Cancel ");
        ɵɵelementEnd();
        ɵɵelementStart(47, "button", 33);
        ɵɵtext(48, " Save ");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(49, "div", 34, 15);
        ɵɵelementStart(51, "div", 16);
        ɵɵelementStart(52, "div", 35);
        ɵɵelementStart(53, "div", 19);
        ɵɵelementStart(54, "h5", 20);
        ɵɵtext(55, "Delete View");
        ɵɵelementEnd();
        ɵɵelementStart(56, "button", 36, 37);
        ɵɵelementStart(58, "span", 23);
        ɵɵtext(59, "\u00D7");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(60, "div", 25);
        ɵɵtext(61, "Are you sure you want to delete this view?");
        ɵɵelementEnd();
        ɵɵelementStart(62, "div", 31);
        ɵɵelementStart(63, "button", 38);
        ɵɵtext(64, " Cancel ");
        ɵɵelementEnd();
        ɵɵelementStart(65, "button", 39);
        ɵɵlistener("click", function BookmarksComponent_Template_button_click_65_listener() { return ctx.confirmDeleteBookmark(); });
        ɵɵtext(66, " Delete ");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(67, "div", 40, 15);
        ɵɵelementStart(69, "div", 16);
        ɵɵelementStart(70, "div", 35);
        ɵɵelementStart(71, "div", 19);
        ɵɵelementStart(72, "h5", 41);
        ɵɵtext(73, "Update View");
        ɵɵelementEnd();
        ɵɵelementStart(74, "button", 36, 42);
        ɵɵelementStart(76, "span", 23);
        ɵɵtext(77, "\u00D7");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(78, "div", 25);
        ɵɵtext(79, "Are you sure you want to update this view?");
        ɵɵelementEnd();
        ɵɵelementStart(80, "div", 31);
        ɵɵelementStart(81, "button", 38);
        ɵɵtext(82, " Cancel ");
        ɵɵelementEnd();
        ɵɵelementStart(83, "button", 39);
        ɵɵlistener("click", function BookmarksComponent_Template_button_click_83_listener() { return ctx.updateBookmark(); });
        ɵɵtext(84, " Update ");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(3);
        ɵɵproperty("title", ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName);
        ɵɵadvance(1);
        ɵɵtextInterpolate1(" ", (ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName == null ? null : ctx.selectedBookmark.bookmarkName.length) > 12 ? ɵɵpipeBind3(5, 8, ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName, 0, 12) + "..." : ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName, " ");
        ɵɵadvance(13);
        ɵɵproperty("formControl", ctx.searchBookmark);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.states);
        ɵɵadvance(4);
        ɵɵproperty("disabled", ctx.selectedBookmark.bookmarkName === "Default View");
        ɵɵadvance(6);
        ɵɵproperty("formGroup", ctx.bookmarkForm);
        ɵɵadvance(15);
        ɵɵproperty("ngIf", ctx.bookmarkForm.dirty && !ctx.bookmarkForm.valid);
        ɵɵadvance(4);
        ɵɵproperty("disabled", ctx.bookmarkForm.invalid || ctx.isDuplicate);
    } }, directives: [DefaultValueAccessor, NgControlStatus, FormControlDirective, NgForOf, ɵangular_packages_forms_forms_ba, NgControlStatusGroup, FormGroupDirective, FormControlName, NgIf, RouterLinkWithHref], pipes: [SlicePipe], styles: [".bookmark-dropdown[_ngcontent-%COMP%]{margin-left:25px;font-family:Avenir Next W01,sans-serif!important}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{max-height:310px;overflow:scroll;max-width:400px}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar{width:.5em;height:.5em;background-color:hsla(0,0%,100%,.9)}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:rgba(65,16,70,.4);border-radius:3px}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:rgba(45,11,49,.6)}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]:before{content:\"\";display:block;width:0;height:0;position:absolute;border-left:8px solid transparent;border-bottom:8px solid #aca7a7;border-right:8px solid transparent;left:366px;top:-9px}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border:none;padding:.25rem .25rem .25rem 2.5rem}.bookmark-dropdown[_ngcontent-%COMP%]   .custom-control-label[_ngcontent-%COMP%]{min-width:71%;min-height:2.1rem}.bookmark-dropdown[_ngcontent-%COMP%]   .custom-control-label[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{position:absolute;right:0}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;font-weight:700}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%], .bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover   label[_ngcontent-%COMP%]{cursor:pointer}.bookmark-dropdown[_ngcontent-%COMP%]   .default-view[_ngcontent-%COMP%]{margin-bottom:15px;border-bottom:1px solid;padding-left:40px}.bookmark-dropdown[_ngcontent-%COMP%]   .default-view[_ngcontent-%COMP%]   .custom-control-input[_ngcontent-%COMP%]{width:2.25rem;height:2.25rem}.bookmark-dropdown[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin-left:10px;font-weight:600}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-btn[_ngcontent-%COMP%]{background-color:#ccc;color:#323e48;font-size:16px;font-weight:600;letter-spacing:0;line-height:24px;height:40px;width:160px;margin-right:16px;max-width:200px}.bookmark-dropdown[_ngcontent-%COMP%]   .mt10[_ngcontent-%COMP%]{margin-top:6px;margin-bottom:6px}.bookmark-dropdown[_ngcontent-%COMP%]   .save-view[_ngcontent-%COMP%]{border-radius:6px!important;font-size:16px;font-weight:600;letter-spacing:0;line-height:24px;margin-right:15px;padding:0 15px}.bookmark-dropdown[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]{z-index:9999}.bookmark-dropdown[_ngcontent-%COMP%]   .text-error[_ngcontent-%COMP%]{color:#dc3545;position:absolute;font-size:.8rem}.bookmark-dropdown[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], .bookmark-dropdown[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin:5px 10px;color:#9c9ea1;cursor:pointer}.bookmark-dropdown[_ngcontent-%COMP%]   .bookmark-modal[_ngcontent-%COMP%]{height:280px;width:550px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]{border:none}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:18px;font-weight:600;letter-spacing:0;line-height:24px;margin:10px 0}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:28px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]{margin-left:14px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:20px;font-weight:600;letter-spacing:0;line-height:28px;margin-bottom:1.5rem}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:0}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{height:calc(1.5em + .75rem + 8px);width:490px}.bookmark-dropdown[_ngcontent-%COMP%]   input[name=searchBookmark][_ngcontent-%COMP%]{width:98%;margin:1%}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]{border:none}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]{background-color:#f5f6f7;color:#323e48;font-size:16px;font-weight:600;line-height:22px;text-align:center;padding:8px 20px;margin-right:15px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]{background-color:#0199d6;padding:8px 20px;font-size:16px;font-weight:600;line-height:22px;text-align:center;border:1px solid #0199d6}.settings[_ngcontent-%COMP%]{display:inline-block;position:absolute;right:0;max-width:60px}.settings[_ngcontent-%COMP%]   .settings-content[_ngcontent-%COMP%]{padding-left:10px;margin-left:-90px;margin-top:10px}.settings[_ngcontent-%COMP%]   .settings-title[_ngcontent-%COMP%]{font-size:16px;font-weight:700}.settings[_ngcontent-%COMP%]   .taxanomy[_ngcontent-%COMP%]{margin:10px 0 10px 24px}.settings[_ngcontent-%COMP%]   .taxanomy-title[_ngcontent-%COMP%]{font-weight:700;color:#474545}.settings[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{width:370px;margin:10px 15px}.settings[_ngcontent-%COMP%]   .fa-gear[_ngcontent-%COMP%]{margin-top:25px;color:#9f9898}.settings[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{overflow:visible!important}.divider[_ngcontent-%COMP%]{box-sizing:border-box;height:1px;width:510px;border:.5px dotted #979797;margin-left:16px}.custom-control-input[_ngcontent-%COMP%]:checked ~ .custom-control-label[_ngcontent-%COMP%]:before{color:#fff;border-color:#682875;background-color:#682875}@media (min-width:1200px){.settings[_ngcontent-%COMP%]{right:60px}.dropdown-menu[_ngcontent-%COMP%]:before{left:332px!important}}@media (max-width:500px){.dropdown-btn[_ngcontent-%COMP%], .save-view[_ngcontent-%COMP%]{margin-right:11px!important}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(BookmarksComponent, [{
        type: Component,
        args: [{
                selector: 'lib-bookmarks',
                templateUrl: './bookmarks.component.html',
                styleUrls: ['./bookmarks.component.scss']
            }]
    }], function () { return [{ type: BookmarkService }, { type: NotificationService }, { type: SnowplowService }, { type: ConfigService }, { type: DataVizUiService }]; }, { closeButton: [{
            type: ViewChild,
            args: ['closeButton']
        }], saveButton: [{
            type: ViewChild,
            args: ['saveButton']
        }], deleteButton: [{
            type: ViewChild,
            args: ['deleteButton']
        }], updateButton: [{
            type: ViewChild,
            args: ['updateButton']
        }], modalOverlay: [{
            type: ViewChild,
            args: ['modalOverlay']
        }], visualElem: [{
            type: Input
        }], save: [{
            type: Output
        }] }); })();

function HeaderComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵelement(1, "lib-bookmarks", 5);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("visualElem", ctx_r0.visual);
} }
function HeaderComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 6);
} if (rf & 2) {
    const divId_r2 = ctx.$implicit;
    ɵɵproperty("id", divId_r2);
} }
class HeaderComponent {
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
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(ɵɵdirectiveInject(ConfigService)); };
HeaderComponent.ɵcmp = ɵɵdefineComponent({ type: HeaderComponent, selectors: [["lib-header"]], inputs: { visual: "visual" }, decls: 4, vars: 2, consts: [[1, "header-container"], ["class", "bookmarks-container", 4, "ngIf"], [1, "ui-elements-container"], ["class", "right", 3, "id", 4, "ngFor", "ngForOf"], [1, "bookmarks-container"], [3, "visualElem"], [1, "right", 3, "id"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, HeaderComponent_div_1_Template, 2, 1, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵtemplate(3, HeaderComponent_div_3_Template, 1, 1, "div", 3);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.configService.config.bookmarks);
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.configService.config.uiElements);
    } }, directives: [NgIf, NgForOf, BookmarksComponent], styles: [".header-container[_ngcontent-%COMP%]{height:56px;width:100%;float:left}.bookmarks-container[_ngcontent-%COMP%]{height:56px;width:40%;float:left}.ui-elements-container[_ngcontent-%COMP%]{height:56px;width:60%;float:left}.ui-elements-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin:10px 20px}.left[_ngcontent-%COMP%]{float:left}.right[_ngcontent-%COMP%]{float:right}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(HeaderComponent, [{
        type: Component,
        args: [{
                selector: 'lib-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.scss'],
            }]
    }], function () { return [{ type: ConfigService }]; }, { visual: [{
            type: Input
        }] }); })();

function DataVizUiComponent_lib_header_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "lib-header", 3);
} if (rf & 2) {
    ɵɵnextContext();
    const _r1 = ɵɵreference(3);
    ɵɵproperty("visual", _r1);
} }
class DataVizUiComponent {
    constructor(configService, snowplowService) {
        this.configService = configService;
        this.snowplowService = snowplowService;
        this.modules = {
            header: true,
            bookmarks: true,
        };
        this.bookmarks = {};
        this.uiElements = [];
        this.roles = [];
    }
    ngOnInit() {
        // Set userId in Snowplow
        this.snowplowService.setUserId();
        // Set appSessionId
        this.snowplowService.setAppSessionId();
    }
    ngOnChanges(changes) {
        Object.keys(changes).forEach(key => {
            changes[key] = changes[key].currentValue;
        });
        this.configService.updateValues(changes);
    }
}
DataVizUiComponent.ɵfac = function DataVizUiComponent_Factory(t) { return new (t || DataVizUiComponent)(ɵɵdirectiveInject(ConfigService), ɵɵdirectiveInject(SnowplowService)); };
DataVizUiComponent.ɵcmp = ɵɵdefineComponent({ type: DataVizUiComponent, selectors: [["lib-data-viz-ui"]], inputs: { modules: "modules", bookmarks: "bookmarks", uiElements: "uiElements", roles: "roles" }, features: [ɵɵNgOnChangesFeature], decls: 4, vars: 1, consts: [[1, "app-container"], [3, "visual", 4, "ngIf"], ["visual", ""], [3, "visual"]], template: function DataVizUiComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, DataVizUiComponent_lib_header_1_Template, 1, 1, "lib-header", 1);
        ɵɵelement(2, "lib-visualization", null, 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.configService.config.modules.header);
    } }, directives: [NgIf, VisualizationComponent, HeaderComponent], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(DataVizUiComponent, [{
        type: Component,
        args: [{
                selector: 'lib-data-viz-ui',
                templateUrl: './data-viz-ui.component.html',
                styleUrls: [],
            }]
    }], function () { return [{ type: ConfigService }, { type: SnowplowService }]; }, { modules: [{
            type: Input
        }], bookmarks: [{
            type: Input
        }], uiElements: [{
            type: Input
        }], roles: [{
            type: Input
        }] }); })();

class AnalyticsConfig {
}
AnalyticsConfig.SNOWPLOW_ENVIRONMENTS_MAPPING = {
    dev: 'SNAPSHOT',
    qa: 'STABLE',
    prod: 'PROD',
};
AnalyticsConfig.SNOWPLOW_PARAMS = {
    appId: 'DATAVIZ',
    options: {
        snowplowEnvironmentProvider: {
            provide: ANALYTICS_ENVIRONMENT,
            useFactory: getEnvironment,
        },
        tracking: {
            inferred: false,
            pageViews: true
        }
    }
};
function getEnvironment() {
    const snowplowEnvironment = AnalyticsConfig.SNOWPLOW_ENVIRONMENTS_MAPPING[AppConfig.fetchAppEnv()] || 'SNAPSHOT';
    return snowplowEnvironment;
}

class LoginComponent {
    constructor(authService, router, route, snowplowService) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.snowplowService = snowplowService;
    }
    login() {
        this.authService.login();
    }
    consume(apiToken) {
        const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '';
        this.authService.authenticate(apiToken);
        this.authService.getUserRole();
        this.router.navigate([redirect]);
        this.trackLogin();
    }
    consumePing(apiToken) {
        const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '';
        this.authService.authenticate(apiToken);
        this.authService.getUserRole();
        this.router.navigate([redirect]);
    }
    trackLogin() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['']);
            this.snowplowService.eventTracking('login', 'click');
        }
    }
    logout() {
        this.authService.logout();
    }
    validRoute() {
        if (this.route && this.route.snapshot && this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path) {
            return this.route.snapshot.routeConfig.path;
        }
        return '/';
    }
    ngOnInit() {
        const routePath = this.validRoute();
        if (routePath.indexOf('ping-login') > -1) {
            this.ping();
        }
        else if (routePath.indexOf('login') > -1) {
            this.login();
        }
        else if (routePath.indexOf('consumePing') > -1) {
            const consumeToken = this.route.snapshot.queryParams['api_token'];
            this.authService.redirectUrl = this.route.snapshot.queryParams['redirectTo'];
            this.consumePing(consumeToken);
        }
        else if (routePath.indexOf('consume') > -1) {
            const consumeToken = this.route.snapshot.queryParams['api_token'];
            this.authService.redirectUrl = this.route.snapshot.queryParams['redirectTo'];
            this.consume(consumeToken);
        }
        else if (routePath.indexOf('logout') > -1) {
            this.logout();
            this.snowplowService.eventTracking('logout', 'click');
        }
    }
    ping() {
        this.authService.ping();
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(ɵɵdirectiveInject(AuthenticationService), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(ActivatedRoute), ɵɵdirectiveInject(SnowplowService)); };
LoginComponent.ɵcmp = ɵɵdefineComponent({ type: LoginComponent, selectors: [["lib-login"]], decls: 2, vars: 0, template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "h4");
        ɵɵtext(1, "You are being redirected to the Log In page");
        ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{
                selector: 'lib-login',
                templateUrl: './login.component.html',
            }]
    }], function () { return [{ type: AuthenticationService }, { type: Router }, { type: ActivatedRoute }, { type: SnowplowService }]; }, null); })();

// import { MessageService } from '../services/message.service';
class TokenInterceptor {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    intercept(req, next) {
        let token = this.authService.getAuthorizationToken()
            ? this.authService.getAuthorizationToken()
            : '';
        token = 'Bearer ' + token;
        const headers = req.headers.set('Authorization', token);
        req = req.clone({ headers });
        return next.handle(req).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                // Do something after success
            }
        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // redirect to login
                    this.router.navigate(['login']);
                }
                else if (err.status === 419) {
                    // redirect to logout
                    this.router.navigate(['logout']);
                }
                else {
                    // this.messageService.addErrorMessage(err.status.toString());
                }
            }
        }), finalize(() => { }));
    }
}
TokenInterceptor.ɵfac = function TokenInterceptor_Factory(t) { return new (t || TokenInterceptor)(ɵɵinject(AuthenticationService), ɵɵinject(Router)); };
TokenInterceptor.ɵprov = ɵɵdefineInjectable({ token: TokenInterceptor, factory: TokenInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(TokenInterceptor, [{
        type: Injectable
    }], function () { return [{ type: AuthenticationService }, { type: Router }]; }, null); })();

class AuthenticationGuard {
    constructor(authService, dataVizUiService, router) {
        this.authService = authService;
        this.dataVizUiService = dataVizUiService;
        this.router = router;
    }
    canActivate(route, state) {
        return this.checkLogin(state.url);
    }
    checkLogin(url) {
        if (this.authService.isAuthenticated()) {
            // const userRole = this.authService.getUserRole();
            // if (userRole !== 'MANUFACTURER' && userRole !== 'DISTRIBUTOR') {
            //   this.router.navigate(['/unauthorized']);
            // }
            this.dataVizUiService.rolesObject$.next(this.authService.getUserRole());
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.setRedirectUrl(url);
        // Navigate to the login or ping page with extras
        url.includes('ping')
            ? this.router.navigate(['/ping-login'])
            : this.router.navigate(['/login']);
        return false;
    }
}
AuthenticationGuard.ɵfac = function AuthenticationGuard_Factory(t) { return new (t || AuthenticationGuard)(ɵɵinject(AuthenticationService), ɵɵinject(DataVizUiService), ɵɵinject(Router)); };
AuthenticationGuard.ɵprov = ɵɵdefineInjectable({ token: AuthenticationGuard, factory: AuthenticationGuard.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(AuthenticationGuard, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: AuthenticationService }, { type: DataVizUiService }, { type: Router }]; }, null); })();

class UnauthorizedComponent {
    constructor() {
        // ToDo - To be pulled from configuration
        this.mailTo = '';
        this.mailSubject = '';
    }
    ngOnInit() { }
    sendEmail() {
        document.location.href =
            'mailto:' +
                this.mailTo +
                '?subject=' +
                this.mailSubject;
    }
}
UnauthorizedComponent.ɵfac = function UnauthorizedComponent_Factory(t) { return new (t || UnauthorizedComponent)(); };
UnauthorizedComponent.ɵcmp = ɵɵdefineComponent({ type: UnauthorizedComponent, selectors: [["lib-unauthorized"]], decls: 35, vars: 0, consts: [[1, "auth-main"], [1, "img-wrapper"], ["src", "./../../../../assets/images/subscription-header.png", "alt", "Subscriptions", "width", "100%", 1, "img-responsive"], [1, "img-overlay"], [1, "btn", "btn-success", 3, "click"], [1, "instructions"], [1, "main-header"], [1, "header"], [1, "divider"]], template: function UnauthorizedComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelement(2, "img", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "button", 4);
        ɵɵlistener("click", function UnauthorizedComponent_Template_button_click_4_listener() { return ctx.sendEmail(); });
        ɵɵtext(5, "Contact us");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(6, "div", 5);
        ɵɵelementStart(7, "section");
        ɵɵelementStart(8, "span", 6);
        ɵɵtext(9, "Get started tracking sales performance and pricing in the medical supply distribution channel across: ");
        ɵɵelementEnd();
        ɵɵelement(10, "p");
        ɵɵelementEnd();
        ɵɵelementStart(11, "ul");
        ɵɵelementStart(12, "section");
        ɵɵelementStart(13, "li", 7);
        ɵɵtext(14, "Product SKU");
        ɵɵelementEnd();
        ɵɵelement(15, "p");
        ɵɵelementEnd();
        ɵɵelementStart(16, "section");
        ɵɵelementStart(17, "li", 7);
        ɵɵtext(18, "ZIP 3 geography");
        ɵɵelementEnd();
        ɵɵelement(19, "p");
        ɵɵelementEnd();
        ɵɵelementStart(20, "section");
        ɵɵelementStart(21, "li", 7);
        ɵɵtext(22, "UNSPSC Product Category");
        ɵɵelementEnd();
        ɵɵelement(23, "p");
        ɵɵelementEnd();
        ɵɵelementStart(24, "section");
        ɵɵelementStart(25, "li", 7);
        ɵɵtext(26, "Manufacturer");
        ɵɵelementEnd();
        ɵɵelement(27, "p");
        ɵɵelementEnd();
        ɵɵelementStart(28, "section");
        ɵɵelementStart(29, "li", 7);
        ɵɵtext(30, " Class-of-Trade (Hospital, ASC, Lab/Diagnostic, Physician Office, Treatment Center, Long-Term Care, Home Care, Retail/Consumer) ");
        ɵɵelementEnd();
        ɵɵelement(31, "p");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelement(32, "div", 8);
        ɵɵelementStart(33, "button", 4);
        ɵɵlistener("click", function UnauthorizedComponent_Template_button_click_33_listener() { return ctx.sendEmail(); });
        ɵɵtext(34, "Contact us");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } }, styles: [".auth-main[_ngcontent-%COMP%]{margin:50px 10%;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,Liberation Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji!important}.auth-main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .main-header[_ngcontent-%COMP%]{height:38px;width:333px;color:#323e48;font-size:24px;font-weight:600;letter-spacing:0;line-height:38px}.auth-main[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:disc;font-weight:600}.auth-main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#323e48;font-size:14px;font-weight:500;line-height:22px}.auth-main[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{box-sizing:border-box;height:1px;width:100%;border:.5px solid #979797}.auth-main[_ngcontent-%COMP%]   .btn-success[_ngcontent-%COMP%]{background-color:#70a94f!important;margin:20px 0;font-size:1vw}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{position:relative;font-size:1vw;margin-bottom:50px}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-responsive[_ngcontent-%COMP%]{width:100%;height:auto}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:-78%;right:0;text-align:center}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]:before{content:\" \";display:block;height:60%}@media (max-width:768px){.auth-main[_ngcontent-%COMP%]   .btn-success[_ngcontent-%COMP%]{padding:3px 6px}.auth-main[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]:before{height:50%!important}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(UnauthorizedComponent, [{
        type: Component,
        args: [{
                selector: 'lib-unauthorized',
                templateUrl: './unauthorized.component.html',
                styleUrls: ['./unauthorized.component.scss'],
            }]
    }], function () { return []; }, null); })();

function PingComponent_h4_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "h4");
    ɵɵtext(1, "Successful Ping");
    ɵɵelementEnd();
} }
class PingComponent {
    constructor(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.isSuccess = true;
    }
    login() { }
    ngOnInit() {
        this.isSuccess = true;
    }
}
PingComponent.ɵfac = function PingComponent_Factory(t) { return new (t || PingComponent)(ɵɵdirectiveInject(AuthenticationService), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(ActivatedRoute)); };
PingComponent.ɵcmp = ɵɵdefineComponent({ type: PingComponent, selectors: [["lib-ping"]], decls: 1, vars: 1, consts: [[4, "ngIf"]], template: function PingComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, PingComponent_h4_0_Template, 2, 0, "h4", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.isSuccess);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(PingComponent, [{
        type: Component,
        args: [{
                selector: 'lib-ping',
                templateUrl: './ping.component.html',
            }]
    }], function () { return [{ type: AuthenticationService }, { type: Router }, { type: ActivatedRoute }]; }, null); })();

const DATA_VIZ_ROUTES = [
    {
        path: '',
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'login', component: LoginComponent },
    { path: 'consume', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    {
        path: 'ping',
        component: PingComponent,
        canActivate: [AuthenticationGuard],
    },
    { path: 'ping-login', component: LoginComponent },
    { path: 'consumePing', component: LoginComponent },
];
class DataVizUiRoutingModule {
    static getRoutes() {
        return DATA_VIZ_ROUTES;
    }
}
DataVizUiRoutingModule.ɵfac = function DataVizUiRoutingModule_Factory(t) { return new (t || DataVizUiRoutingModule)(); };
DataVizUiRoutingModule.ɵmod = ɵɵdefineNgModule({ type: DataVizUiRoutingModule });
DataVizUiRoutingModule.ɵinj = ɵɵdefineInjector({ imports: [[RouterModule.forChild(DATA_VIZ_ROUTES)], RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(DataVizUiRoutingModule, { imports: [RouterModule], exports: [RouterModule] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(DataVizUiRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(DATA_VIZ_ROUTES)],
                exports: [RouterModule],
            }]
    }], null, null); })();

class DataVizUiModule {
}
DataVizUiModule.ɵfac = function DataVizUiModule_Factory(t) { return new (t || DataVizUiModule)(); };
DataVizUiModule.ɵmod = ɵɵdefineNgModule({ type: DataVizUiModule });
DataVizUiModule.ɵinj = ɵɵdefineInjector({ providers: [
        Config,
        AnalyticsService,
        DataVizUiService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ], imports: [[
            CommonModule,
            ReactiveFormsModule,
            RouterModule,
            HttpClientModule,
            DataVizUiRoutingModule,
            AnalyticsModule.forRoot(AnalyticsConfig.SNOWPLOW_PARAMS)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(DataVizUiModule, { declarations: [DataVizUiComponent,
        HeaderComponent,
        BookmarksComponent,
        VisualizationComponent,
        LoginComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        DataVizUiRoutingModule, AnalyticsModule], exports: [DataVizUiComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(DataVizUiModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    DataVizUiComponent,
                    HeaderComponent,
                    BookmarksComponent,
                    VisualizationComponent,
                    LoginComponent
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterModule,
                    HttpClientModule,
                    DataVizUiRoutingModule,
                    AnalyticsModule.forRoot(AnalyticsConfig.SNOWPLOW_PARAMS)
                ],
                providers: [
                    Config,
                    AnalyticsService,
                    DataVizUiService,
                    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
                ],
                exports: [
                    DataVizUiComponent,
                ]
            }]
    }], null, null); })();

/*
 * Public API Surface of data-viz-ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DataVizUiComponent, DataVizUiEnvironmentManager, DataVizUiModule, DataVizUiService };
//# sourceMappingURL=data-viz-ui.js.map
