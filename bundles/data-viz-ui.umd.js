(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@cdx/analytics'), require('jwt-decode'), require('@angular/common'), require('powerbi-models'), require('rxjs/operators'), require('@angular/common/http'), require('powerbi-client'), require('@angular/forms'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('data-viz-ui', ['exports', '@angular/core', 'rxjs', '@cdx/analytics', 'jwt-decode', '@angular/common', 'powerbi-models', 'rxjs/operators', '@angular/common/http', 'powerbi-client', '@angular/forms', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['data-viz-ui'] = {}, global.ng.core, global.rxjs, global.i1, global.jwt_decode, global.ng.common, global.models, global.rxjs.operators, global.ng.common.http, global.pbi, global.ng.forms, global.ng.router));
}(this, (function (exports, i0, rxjs, i1, jwt_decode, i7, models, operators, i1$1, pbi, i6, i2) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var jwt_decode__default = /*#__PURE__*/_interopDefaultLegacy(jwt_decode);

    var DataVizUiService = /** @class */ (function () {
        function DataVizUiService() {
            this.rolesObject$ = new rxjs.Subject();
            this.distributorTaxonomy$ = new rxjs.Subject();
        }
        DataVizUiService.prototype.setRoles = function (roles) {
            this.rolesObject$.next(roles);
        };
        DataVizUiService.prototype.getRoles = function () {
            return this.rolesObject$.asObservable();
        };
        DataVizUiService.prototype.getTaxonomy = function () {
            return this.distributorTaxonomy$.asObservable();
        };
        DataVizUiService.prototype.setTaxonomy = function (taxonomy) {
            this.distributorTaxonomy$.next(taxonomy);
        };
        return DataVizUiService;
    }());
    DataVizUiService.ɵfac = function DataVizUiService_Factory(t) { return new (t || DataVizUiService)(); };
    DataVizUiService.ɵprov = i0.ɵɵdefineInjectable({ token: DataVizUiService, factory: DataVizUiService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();

    var ConfigService = /** @class */ (function () {
        function ConfigService() {
            this.configObject$ = new rxjs.Subject();
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
        ConfigService.prototype.getConfigObject = function () {
            return this.configObject$.asObservable();
        };
        ConfigService.prototype.updateValues = function (values) {
            Object.assign(this.config, values);
            this.configObject$.next(this.config);
        };
        return ConfigService;
    }());
    ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(); };
    ConfigService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfigService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();

    var AnalyticsStructuredEventsMapping = /** @class */ (function () {
        function AnalyticsStructuredEventsMapping() {
        }
        AnalyticsStructuredEventsMapping.fetchCategory = function (category) {
            var categories = this.STRUCTURED_CATEGORY;
            return categories[category] || category;
        };
        AnalyticsStructuredEventsMapping.fetchAction = function (action) {
            var actions = this.STRUCTURED_ACTION;
            return actions[action] || action;
        };
        return AnalyticsStructuredEventsMapping;
    }());
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

    var DataVizUiEnvironmentManager = /** @class */ (function () {
        function DataVizUiEnvironmentManager() {
        }
        DataVizUiEnvironmentManager.setEnvironment = function (environment) {
            DataVizUiEnvironmentManager.environment = environment;
        };
        DataVizUiEnvironmentManager.getEnvironment = function () {
            return DataVizUiEnvironmentManager.environment;
        };
        DataVizUiEnvironmentManager.setTenant = function (tenant) {
            DataVizUiEnvironmentManager.tenant = tenant;
        };
        DataVizUiEnvironmentManager.getTenant = function () {
            return DataVizUiEnvironmentManager.tenant;
        };
        return DataVizUiEnvironmentManager;
    }());

    var AppConfig = /** @class */ (function () {
        function AppConfig() {
        }
        AppConfig.fetchAppEnv = function () {
            this.appEnv = DataVizUiEnvironmentManager.getEnvironment();
            return this.appEnvMapping[this.appEnv] || 'dev';
        };
        AppConfig.environmentFileConstant = function () {
            return ['environment', this.fetchAppEnv(), 'json']
                .filter(Boolean)
                .join('.');
        };
        AppConfig.apiUrl = function () {
            return this.appEnvApiUrlMapping[this.fetchAppEnv()];
        };
        return AppConfig;
    }());
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

    var Config = /** @class */ (function () {
        function Config() {
            this.setConfig();
        }
        Config.prototype.setConfig = function () {
            this.apiConfig = {
                apiUrl: AppConfig.apiUrl(),
                endPoints: {
                    login: 'login',
                    logout: 'logOut',
                    ping: 'ping',
                },
                token: 'jwt-token',
            };
        };
        Config.prototype.getConfig = function () {
            return this.apiConfig;
        };
        return Config;
    }());

    var AuthenticationService = /** @class */ (function () {
        function AuthenticationService() {
            this.redirectUrl = '';
            this.isUserLoggedIn = new rxjs.BehaviorSubject(false);
            this.apiConfig = new Config().getConfig();
        }
        AuthenticationService.prototype.getTenantApiTokenKey = function () {
            return [DataVizUiEnvironmentManager.getTenant(), 'api-token'].join('-');
        };
        AuthenticationService.prototype.getAuthorizationToken = function () {
            return sessionStorage.getItem(this.getTenantApiTokenKey());
        };
        AuthenticationService.prototype.isAuthenticated = function () {
            return sessionStorage.getItem(this.getTenantApiTokenKey()) !== null;
        };
        AuthenticationService.prototype.setRedirectUrl = function (url) {
            this.redirectUrl = url;
        };
        AuthenticationService.prototype.getRedirectUrl = function () {
            return this.redirectUrl || '';
        };
        AuthenticationService.prototype.getUserName = function () {
            return localStorage.getItem('user-name') || '';
        };
        AuthenticationService.prototype.getUserEmail = function () {
            var jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
            if (jwtToken) {
                var decodedToken = jwt_decode__default['default'](jwtToken);
                return decodedToken['email'];
            }
            return '';
        };
        AuthenticationService.prototype.getClientId = function () {
            var jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
            if (jwtToken) {
                var decodedToken = jwt_decode__default['default'](jwtToken);
                return decodedToken['clientId'];
            }
            return '';
        };
        AuthenticationService.prototype.parseUserRole = function (roles) {
            if (roles === null || roles === undefined || roles.length === 0) {
                return '';
            }
            if (roles.some(function (role) { return role.toLowerCase() === 'distributor'; })) {
                return 'DISTRIBUTOR';
            }
            else if (roles.some(function (role) { return role.toLowerCase() === 'manufacturer'; })) {
                return 'MANUFACTURER';
            }
            else {
                return '';
            }
        };
        AuthenticationService.prototype.isAdmin = function () {
            return this.getUserRole() !== '' && this.getUserRole().toLowerCase() === 'admin';
        };
        AuthenticationService.prototype.authenticate = function (token) {
            if (token) {
                sessionStorage.setItem(this.getTenantApiTokenKey(), token);
                this.isUserLoggedIn.next(true);
            }
        };
        AuthenticationService.prototype.getUserRole = function () {
            var jwtToken = sessionStorage.getItem(this.getTenantApiTokenKey());
            if (jwtToken) {
                var decodedToken = jwt_decode__default['default'](jwtToken);
                return this.parseUserRole(decodedToken['roles']);
            }
            return '';
        };
        AuthenticationService.prototype.getRoles = function () {
            var jwtToken = sessionStorage.getItem(this.getTentantApiTokenKey());
            if (jwtToken) {
                var decodedToken = jwt_decode__default['default'](jwtToken);
                return decodedToken['roles'];
            }
            return '';
        };
        AuthenticationService.prototype.getTentantApiTokenKey = function () {
            return this.apiConfig.tenantId + '-api-token';
        };
        AuthenticationService.prototype.login = function () {
            this.signOut();
            var url = this.apiConfig.apiUrl +
                this.apiConfig.endPoints.login +
                '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
                '&redirectTo=' +
                this.getRedirectUrl();
            this.redirect(url); // Redirect user to login page
            // this.redirect('http://localhost:8080/HidaApiGateway/login?redirectTo=/dashboard');
            return false;
        };
        AuthenticationService.prototype.ping = function () {
            this.signOut();
            var url = this.apiConfig.apiUrl +
                this.apiConfig.endPoints.ping +
                '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
                '&redirectTo=' +
                this.getRedirectUrl();
            this.redirect(url); // Redirect user to ping endpoint
            return false;
        };
        AuthenticationService.prototype.logout = function () {
            var url = this.apiConfig.apiUrl +
                this.apiConfig.endPoints.logout +
                '?tenantId=' + DataVizUiEnvironmentManager.getTenant() +
                '&api_token=' +
                sessionStorage.getItem(this.getTenantApiTokenKey());
            this.signOut();
            this.redirect(url); // Redirect user to logout page
            return false;
        };
        AuthenticationService.prototype.redirect = function (url) {
            window.location.replace(url);
        };
        AuthenticationService.prototype.signOut = function () {
            sessionStorage.clear();
        };
        return AuthenticationService;
    }());
    AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(); };
    AuthenticationService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthenticationService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return []; }, null);
    })();

    var SnowplowService = /** @class */ (function () {
        function SnowplowService(analyticsService, authService) {
            this.analyticsService = analyticsService;
            this.authService = authService;
        }
        SnowplowService.prototype.setUserId = function () {
            var userId = this.authService.getUserEmail();
            if (userId) {
                // Since userId represents sensitive information - email, second parameter useHash is set to true
                this.analyticsService.setUserId(userId, true);
            }
        };
        SnowplowService.prototype.setCustomerId = function () {
        };
        SnowplowService.prototype.setAppSessionId = function () {
            var userSessionId = this.authService.getAuthorizationToken();
            if (userSessionId) {
                this.analyticsService.setAppSessionId(userSessionId);
            }
        };
        SnowplowService.prototype.fetchStructuredEventCategory = function (category) {
            return AnalyticsStructuredEventsMapping.fetchCategory(category);
        };
        SnowplowService.prototype.fetchStructuredEventAction = function (action) {
            return AnalyticsStructuredEventsMapping.fetchAction(action);
        };
        SnowplowService.prototype.pageTracking = function (pageName) {
            this.analyticsService.trackPage(pageName);
        };
        SnowplowService.prototype.eventTracking = function (category, action, label, property, value) {
            category = this.fetchStructuredEventCategory(category);
            action = this.fetchStructuredEventAction(action);
            if (label || property || value) {
                this.analyticsService.trackEventFull(category, action, label, property, value);
            }
            else {
                this.analyticsService.trackEvent(category, action);
            }
        };
        return SnowplowService;
    }());
    SnowplowService.ɵfac = function SnowplowService_Factory(t) { return new (t || SnowplowService)(i0.ɵɵinject(i1.AnalyticsService), i0.ɵɵinject(AuthenticationService)); };
    SnowplowService.ɵprov = i0.ɵɵdefineInjectable({ token: SnowplowService, factory: SnowplowService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SnowplowService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: i1.AnalyticsService }, { type: AuthenticationService }]; }, null);
    })();

    var VisualizationService = /** @class */ (function () {
        function VisualizationService(http, apiConfig, configService) {
            this.http = http;
            this.apiConfig = apiConfig;
            this.configService = configService;
        }
        VisualizationService.prototype.getEmbedToken = function (reportName) {
            var _this = this;
            var apiUrl = this.apiConfig.getConfig().apiUrl;
            return this.http
                .get(apiUrl + this.getEmbedTokenUrl(reportName))
                .pipe(operators.map(function (token) {
                operators.catchError(_this.handleError);
                return token;
            }));
        };
        VisualizationService.prototype.getEmbedTokenUrl = function (reportName) {
            console.log(AppConfig.fetchAppEnv());
            console.log(reportName);
            return 'api/embedtoken/v1/api/embedtoken?reportId='
                + this.configService.config.bookmarks.envBasedReportIdsMap[AppConfig.fetchAppEnv()][reportName]
                + this.getEmbedParams(reportName);
        };
        VisualizationService.prototype.getEmbedParams = function (reportName) {
            var params = this.configService.config.bookmarks.embedUrlQueryParamsMap[reportName];
            var url = '';
            if (params) {
                Object.keys(params).forEach(function (param) {
                    url = url + '&' + param + '=' + (params[param].encoded ? encodeURIComponent(params[param].value) : params[param].value);
                });
            }
            return url;
        };
        VisualizationService.prototype.handleError = function (error) {
            var errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = "Error: " + error.error.message;
            }
            else {
                // server-side error
                errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
            }
            window.alert(errorMessage);
            return rxjs.throwError(errorMessage);
        };
        return VisualizationService;
    }());
    VisualizationService.ɵfac = function VisualizationService_Factory(t) { return new (t || VisualizationService)(i0.ɵɵinject(i1$1.HttpClient), i0.ɵɵinject(Config), i0.ɵɵinject(ConfigService)); };
    VisualizationService.ɵprov = i0.ɵɵdefineInjectable({ token: VisualizationService, factory: VisualizationService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VisualizationService, [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], function () { return [{ type: i1$1.HttpClient }, { type: Config }, { type: ConfigService }]; }, null);
    })();

    var VisualizationComponent = /** @class */ (function () {
        function VisualizationComponent(visualizationService, authService, snowplowService, configService) {
            this.visualizationService = visualizationService;
            this.authService = authService;
            this.snowplowService = snowplowService;
            this.configService = configService;
            this.unSubscribe = new rxjs.Subject();
            this.MINUTES_BEFORE_EXPIRATION = 10;
            this.INTERVAL_TIME = 4; // In minutes
            this.tokenExpiration = '';
            this.save = new i0.EventEmitter();
            this.defaultView = new i0.EventEmitter();
        }
        VisualizationComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.configService.getConfigObject().subscribe(function (config) {
                _this.getEmbedToken('new');
            });
            // Grab the reference to the div HTML element that will host the report.
            this.reportsContainer = (document.getElementById('reportsContainer'));
            // Embed the report and display it within the div container.
            this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
            this.powerbi.bootstrap(this.reportsContainer, {
                type: 'report',
                tokenType: models.TokenType.Embed,
                uniqueId: 1,
                embedUrl: '',
                accessToken: '',
                settings: {
                    navContentPaneEnabled: false,
                },
            });
            setInterval(function () { return _this.checkTokenAndUpdate(); }, this.INTERVAL_TIME * 60 * 1000);
            this.getEmbedToken('new');
            // Track load dashboard event
            this.snowplowService.eventTracking('load-dashboard', 'load', 'reportName', '', this.getReportName());
        };
        VisualizationComponent.prototype.getReports = function (embedResponse) {
            var _this = this;
            var config = {
                type: 'report',
                tokenType: models.TokenType.Embed,
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
            this.report.on('loaded', function (e) {
                _this.getBookmarkState('defaultView');
            });
            this.report.on('pageChanged', function (page) {
                // Track page changed event
                _this.snowplowService.eventTracking('page-changed', 'click', 'pageName', '', page.detail.newPage.displayName);
            });
            this.report.on('error', function (event) {
                _this.report.off('error');
            });
        };
        VisualizationComponent.prototype.getBookmarkState = function (type) {
            var state = this.report.bookmarksManager.capture({
                allPages: true,
                personalizeVisuals: true,
            });
            // defaultView will be called only once on initial load of powerbi report
            type === 'defaultView'
                ? this.defaultView.emit(state)
                : this.save.emit(state);
            return state;
        };
        VisualizationComponent.prototype.loadReport = function (bookmark, type) {
            var _this = this;
            // const state = bookmark.bookmarkState ? bookmark.bookmarkState : bookmark.state;
            this.report.bookmarksManager
                .applyState(bookmark.bookmarkState)
                .then(function (appliedState) {
                _this.report.getPages().then(function (pages) {
                    _this.report.setPage(pages[0].name);
                });
            });
        };
        VisualizationComponent.prototype.getEmbedToken = function (type, taxonomy) {
            var _this = this;
            var roles = this.configService.config.roles;
            var reportName = roles ? this.getReportName() : '';
            if (taxonomy) {
                reportName = taxonomy;
            }
            this.visualizationService
                .getEmbedToken(reportName)
                .pipe(operators.takeUntil(this.unSubscribe))
                .subscribe(function (resp) {
                _this.subscribeGetEmbedToken(resp, type);
            });
        };
        VisualizationComponent.prototype.subscribeGetEmbedToken = function (resp, type) {
            this.tokenExpiration = resp['embedToken'].expiration;
            if (type === 'new') {
                this.getReports(resp);
            }
            else {
                this.updateToken(resp);
            }
        };
        VisualizationComponent.prototype.getReportName = function () {
            var reportNameRoleMapping = {
                Distributor: 'DIST',
                Manufacturer: 'MAN'
            };
            var role = this.configService.config.roles;
            if (role && role[0] === 'Distributor') {
                var reportName = localStorage.getItem('distributorTaxonomy');
                if (reportName) {
                    return reportName;
                }
                else {
                    localStorage.setItem('distributorTaxonomy', 'DIST');
                    return 'DIST';
                }
            }
            return reportNameRoleMapping[role[0]] || '';
        };
        VisualizationComponent.prototype.checkTokenAndUpdate = function () {
            // Get the current time
            var currentTime = Date.now();
            var expiration = Date.parse(this.tokenExpiration);
            // Time until token expiration in milliseconds
            var timeUntilExpiration = expiration - currentTime;
            var timeToUpdate = this.MINUTES_BEFORE_EXPIRATION * 60 * 1000;
            // Update the token if it is about to expired
            if (timeUntilExpiration <= timeToUpdate) {
                this.getEmbedToken('update');
            }
        };
        VisualizationComponent.prototype.updateToken = function (resp) {
            // Set the new access token
            this.report.setAccessToken(resp.embedToken.token);
        };
        VisualizationComponent.prototype.ngOnDestroy = function () {
            this.unSubscribe.next();
            this.unSubscribe.complete();
        };
        return VisualizationComponent;
    }());
    VisualizationComponent.ɵfac = function VisualizationComponent_Factory(t) { return new (t || VisualizationComponent)(i0.ɵɵdirectiveInject(VisualizationService), i0.ɵɵdirectiveInject(AuthenticationService), i0.ɵɵdirectiveInject(SnowplowService), i0.ɵɵdirectiveInject(ConfigService)); };
    VisualizationComponent.ɵcmp = i0.ɵɵdefineComponent({ type: VisualizationComponent, selectors: [["lib-visualization"]], outputs: { save: "save", defaultView: "defaultView" }, features: [i0.ɵɵProvidersFeature([VisualizationService])], decls: 1, vars: 0, consts: [["id", "reportsContainer", 2, "width", "100%", "height", "1000px"]], template: function VisualizationComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "div", 0);
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VisualizationComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-visualization',
                        templateUrl: './visualization.component.html',
                        providers: [VisualizationService],
                    }]
            }], function () { return [{ type: VisualizationService }, { type: AuthenticationService }, { type: SnowplowService }, { type: ConfigService }]; }, { save: [{
                    type: i0.Output
                }], defaultView: [{
                    type: i0.Output
                }] });
    })();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var arrayApis = {
        sort: function (array, orderType, ascending, key) {
            return this.sortAlphabetically(array, ascending, key);
        },
        sortAlphabetically: function (array, ascending, key) {
            array.sort(function (a, b) {
                var la = a.bookmarkName.toLowerCase();
                var lb = b.bookmarkName.toLowerCase();
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

    var BookmarkService = /** @class */ (function () {
        function BookmarkService(http, apiConfig, configService, authService) {
            this.http = http;
            this.apiConfig = apiConfig;
            this.configService = configService;
            this.authService = authService;
            this.apiUrl = this.apiConfig.getConfig().apiUrl;
            this.reportName = configService.config['roles'].
                includes('Manufacturer') ? 'MAN' : 'DIST';
            this.tenantId = DataVizUiEnvironmentManager.getTenant();
        }
        BookmarkService.prototype.getBookmarks = function (reportName) {
            if (reportName) {
                this.reportName = reportName;
            }
            return this.http
                .get(this.apiUrl + ("api/bookmarks/v1/api/bookmarks?reportName=" + this.reportName + "&tenantId=" + this.tenantId))
                .pipe(operators.map(function (bookmarks) {
                return bookmarks;
            }), operators.catchError(function (error) { return rxjs.throwError(error); }));
        };
        BookmarkService.prototype.createBookmark = function (bookmark) {
            var _this = this;
            var requestData = {};
            requestData.bookmarkName = bookmark.bookmarkName;
            requestData.bookmarkState = bookmark.state;
            requestData.reportName = this.reportName;
            requestData.tenantId = this.tenantId;
            return this.http
                .post(this.apiUrl + 'api/bookmarks/v1/api/bookmarks', requestData)
                .pipe(operators.map(function (data) {
                operators.catchError(_this.handleError);
                return data;
            }));
        };
        BookmarkService.prototype.updateBookmark = function (editedBookmark) {
            var _this = this;
            var requestData = {};
            requestData.bookmarkName = editedBookmark.bookmarkName;
            requestData.bookmarkState = editedBookmark.bookmarkState;
            requestData.reportName = this.reportName;
            requestData.tenantId = this.tenantId;
            return this.http
                .put(this.apiUrl + 'api/bookmarks/v1/api/bookmarks/' + editedBookmark.bookmarkId, requestData)
                .pipe(operators.map(function (data) {
                operators.catchError(_this.handleError);
                return data;
            }));
        };
        BookmarkService.prototype.updateBookmarkName = function (editedBookmark, newName) {
            var _this = this;
            var requestData = {};
            requestData.bookmarkName = newName;
            requestData.bookmarkState = editedBookmark.bookmarkState;
            requestData.reportName = this.reportName;
            return this.http
                .put(this.apiUrl +
                ("api/bookmarks/v1/api/bookmarks/" + editedBookmark.bookmarkId), requestData)
                .pipe(operators.map(function (data) {
                operators.catchError(_this.handleError);
                return data;
            }));
        };
        BookmarkService.prototype.deleteBookmark = function (bookmark) {
            return this.http
                .delete(this.apiUrl + ("api/bookmarks/v1/api/bookmarks/" + bookmark.bookmarkId), { responseType: 'text' })
                .pipe(operators.map(function (data) {
                // catchError(this.handleError);
                return data;
            }));
        };
        BookmarkService.prototype.handleError = function (error) {
            console.log(error);
            var errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = "Error: " + error.error.message;
            }
            else {
                // server-side error
                errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
            }
            window.alert(errorMessage);
            return rxjs.throwError(errorMessage);
        };
        return BookmarkService;
    }());
    BookmarkService.ɵfac = function BookmarkService_Factory(t) { return new (t || BookmarkService)(i0.ɵɵinject(i1$1.HttpClient), i0.ɵɵinject(Config), i0.ɵɵinject(ConfigService), i0.ɵɵinject(AuthenticationService)); };
    BookmarkService.ɵprov = i0.ɵɵdefineInjectable({ token: BookmarkService, factory: BookmarkService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BookmarkService, [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], function () { return [{ type: i1$1.HttpClient }, { type: Config }, { type: ConfigService }, { type: AuthenticationService }]; }, null);
    })();

    var NotificationService = /** @class */ (function () {
        function NotificationService() {
            this.notificationSubject = new rxjs.BehaviorSubject(null);
            this.notification$ = this.notificationSubject
                .asObservable()
                .pipe(operators.publish(), operators.refCount());
        }
        NotificationService.prototype.notify = function (message) {
            this.notificationSubject.next(message);
        };
        return NotificationService;
    }());
    NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(); };
    NotificationService.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return []; }, null);
    })();

    var _c0 = ["closeButton"];
    var _c1 = ["saveButton"];
    var _c2 = ["deleteButton"];
    var _c3 = ["updateButton"];
    var _c4 = ["modalOverlay"];
    function BookmarksComponent_div_18_Template(rf, ctx) {
        if (rf & 1) {
            var _r13_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 43);
            i0.ɵɵelementStart(1, "input", 44);
            i0.ɵɵlistener("change", function BookmarksComponent_div_18_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r13_1); var state_r11 = ctx.$implicit; var ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.onBookmarkSelect($event, state_r11); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "label", 45);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "slice");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span", 46);
            i0.ɵɵelementStart(6, "a", 47);
            i0.ɵɵlistener("click", function BookmarksComponent_div_18_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r13_1); var state_r11 = ctx.$implicit; var ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.editBookmark(state_r11); });
            i0.ɵɵelement(7, "em", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(8, "| ");
            i0.ɵɵelementStart(9, "a", 49);
            i0.ɵɵlistener("click", function BookmarksComponent_div_18_Template_a_click_9_listener() { i0.ɵɵrestoreView(_r13_1); var state_r11 = ctx.$implicit; var ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.deleteBookmark(state_r11); });
            i0.ɵɵelement(10, "em", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var state_r11 = ctx.$implicit;
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("title", state_r11.bookmarkName);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("id", state_r11.bookmarkName);
            i0.ɵɵproperty("checked", state_r11.bookmarkName === ctx_r1.selectedBookmark.bookmarkName);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("for", state_r11.bookmarkName);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", (state_r11 == null ? null : state_r11.bookmarkName == null ? null : state_r11.bookmarkName.length) > 24 ? i0.ɵɵpipeBind3(4, 7, state_r11 == null ? null : state_r11.bookmarkName, 0, 24) + "..." : state_r11 == null ? null : state_r11.bookmarkName, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("tabindex", state_r11.bookmarkName === ctx_r1.selectedBookmark.bookmarkName ? 0 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("tabindex", state_r11.bookmarkName === ctx_r1.selectedBookmark.bookmarkName ? 0 : -1);
        }
    }
    function BookmarksComponent_span_43_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 51);
            i0.ɵɵtext(1, "Please enter name containing alphabets, numbers and special characters .*-/'. Length should between 3 and 140 characters!");
            i0.ɵɵelementEnd();
        }
    }
    var BookmarksComponent = /** @class */ (function () {
        function BookmarksComponent(bookmarkService, notifier, snowplowService, configService, dvService) {
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
            this.unSubscribe = new rxjs.Subject();
            this.HIDE_SETTINGS_FOR_CLIENT_IDS = ['5'];
            this.closeButton = {};
            this.saveButton = {};
            this.deleteButton = {};
            this.updateButton = {};
            this.modalOverlay = {};
            // @Input() states: PowerbiBookmark[];
            this.visualElem = {};
            this.save = new i0.EventEmitter();
        }
        BookmarksComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.configService.getConfigObject().subscribe(function (config) {
                _this.getBookmarks();
                // TODO: need to verify
                _this.snowplowService.eventTracking('load-bookmarks', 'load');
            });
            this.dvService.getTaxonomy().subscribe(function (distributorTaxonomy) {
                _this.onTaxonomyChange(distributorTaxonomy);
            });
            this.searchBookmark = new i6.FormControl('');
            this.states = [];
            this.bookmarkForm = new i6.FormGroup({
                bookmarkName: new i6.FormControl('', [
                    i6.Validators.required,
                    i6.Validators.pattern('[a-zA-Z0-9.*\'/ -]*'),
                    i6.Validators.minLength(3),
                    i6.Validators.maxLength(140),
                ]),
            });
        };
        BookmarksComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.getBookmarks();
            setTimeout(function () {
                // As first click of dropdown not working .... hint: bootstrap module loaded twice
                var dropdownBtn = document.getElementsByClassName('dropdown-btn')[0];
                dropdownBtn.click();
                dropdownBtn.blur();
                _this.visualElem.defaultView.subscribe(function (value) {
                    value.then(function (bookmark) {
                        _this.defaultViewBookmark = bookmark;
                        _this.defaultViewBookmark.bookmarkState = bookmark.state;
                        _this.getDefaultView();
                    })
                        .catch(function (error) {
                        rxjs.throwError(error);
                    });
                });
            }, 1000);
        };
        BookmarksComponent.prototype.getBookmarks = function (reportName) {
            var _this = this;
            console.log('getBookmarks called');
            this.bookmarkService
                .getBookmarks(reportName)
                .pipe(operators.takeUntil(this.unSubscribe))
                .subscribe(function (bookmarks) {
                _this.sortBookmarks(bookmarks);
            });
        };
        BookmarksComponent.prototype.sortBookmarks = function (bookmarks) {
            if (bookmarks) {
                bookmarks = arrayApis.sort(bookmarks, 'alphabetic', true);
                this.states = bookmarks;
                this.allBookmarks = bookmarks;
            }
        };
        BookmarksComponent.prototype.closeDropdown = function (event) {
            this.resetDropdown();
        };
        BookmarksComponent.prototype.onClick = function (event) {
            if (this.modalOverlay && !this.modalOverlay.nativeElement.contains(event.target)) {
                this.resetDropdown();
            }
        };
        BookmarksComponent.prototype.onTaxonomyChange = function (reportName) {
            this.visualElem.getEmbedToken('new', reportName);
            this.getBookmarks(reportName);
            localStorage.setItem('distributorTaxonomy', reportName);
        };
        BookmarksComponent.prototype.onBookmarkSelect = function (event, state) {
            if (state) {
                this.selectedBookmark = state;
            }
            this.areFiltersChanged = false;
            this.resetDropdown();
            this.visualElem.loadReport(state, 'custom');
            // TODO: need to verify
            this.snowplowService.eventTracking('select-bookmarks', 'click', 'Selected Bookmark Name', '', state.bookmarkName);
        };
        BookmarksComponent.prototype.onSearchBookmark = function (event) {
            var allBookmarks = JSON.parse(JSON.stringify(this.allBookmarks));
            var searchValue = this.searchBookmark.value.toLowerCase();
            if (searchValue !== '') {
                this.states = allBookmarks.filter(function (bookmark) { return bookmark.bookmarkName.toLowerCase().includes(searchValue); });
            }
            else {
                this.states = this.allBookmarks;
            }
        };
        BookmarksComponent.prototype.onBookmarkNameChange = function (name) {
            var _a;
            this.isDuplicate = name.trim() === ((_a = this.duplicateBookmark) === null || _a === void 0 ? void 0 : _a.bookmarkName);
        };
        BookmarksComponent.prototype.saveBookmark = function (data) {
            if (!this.editedBookmark) {
                this.createBookmark();
            }
            else {
                this.updateBookmarkName();
            }
        };
        BookmarksComponent.prototype.createBookmark = function () {
            var _this = this;
            var bookmarkName = this.bookmarkForm.controls.bookmarkName.value;
            var duplicate = this.allBookmarks.find(function (bookmark) { return bookmark.bookmarkName === bookmarkName; });
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
            this.visualElem.getBookmarkState('save').then(function (state) {
                _this.currentState = state;
                _this.currentState.bookmarkName = bookmarkName;
                _this.closeButton.nativeElement.click();
                _this.bookmarkForm.controls.bookmarkName.setValue('');
                _this.bookmarkService
                    .createBookmark(_this.currentState)
                    .pipe(operators.takeUntil(_this.unSubscribe))
                    .subscribe(function (bookmark) {
                    _this.subscribeCreateBookmark(bookmark);
                });
                // Track create bookmark event
                _this.snowplowService.eventTracking('create-bookmark', 'click', 'bookmarkName', '', bookmarkName);
            });
        };
        BookmarksComponent.prototype.subscribeCreateBookmark = function (bookmark) {
            this.states = arrayApis.sort(this.states, 'alphabetic', true);
            this.states.unshift(bookmark);
            this.states = __spread(this.states);
            this.allBookmarks = __spread(this.states);
            if (bookmark) {
                this.selectedBookmark = bookmark;
            }
        };
        BookmarksComponent.prototype.updateBookmark = function () {
            var _this = this;
            this.visualElem.getBookmarkState('save').then(function (bookmark) {
                _this.currentState = JSON.parse(JSON.stringify(_this.selectedBookmark));
                if (bookmark.state) {
                    _this.currentState.bookmarkState = bookmark.state;
                }
                _this.bookmarkService
                    .updateBookmark(_this.currentState)
                    .pipe(operators.takeUntil(_this.unSubscribe))
                    .subscribe(function (bookmarkResp) {
                    _this.subscribeUpdateBookmark(bookmarkResp);
                });
            });
            // Track update bookmark event
            this.snowplowService.eventTracking('update-bookmark', 'click', 'bookmarkName', '', this.selectedBookmark.bookmarkName);
        };
        BookmarksComponent.prototype.subscribeUpdateBookmark = function (bookmark) {
            var _this = this;
            var selectedBookmark = this.allBookmarks.find(function (bkmk) { return bkmk.bookmarkName === _this.selectedBookmark.bookmarkName; });
            if (selectedBookmark) {
                selectedBookmark.bookmarkState = bookmark.bookmarkState;
            }
            this.states = this.allBookmarks;
            this.updateButton.nativeElement.click();
        };
        BookmarksComponent.prototype.updateBookmarkName = function () {
            var _this = this;
            var name = this.bookmarkForm.controls.bookmarkName.value;
            var duplicate = this.allBookmarks.find(function (bookmark) { return bookmark.bookmarkName === name; });
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
            var reqObj = JSON.parse(JSON.stringify(this.editedBookmark));
            reqObj.bookmarkName = name;
            this.bookmarkService
                .updateBookmark(reqObj)
                .pipe(operators.takeUntil(this.unSubscribe))
                .subscribe(function (bookmark) {
                _this.subscribeUpdateBookmarkName(bookmark, name);
            });
            // Track update bookmark event
            this.snowplowService.eventTracking('update-bookmark', 'click', 'bookmarkName', '', reqObj.bookmarkName);
        };
        BookmarksComponent.prototype.subscribeUpdateBookmarkName = function (bookmark, updateName) {
            var _this = this;
            if (this.editedBookmark.bookmarkName ===
                this.selectedBookmark.bookmarkName) {
                this.selectedBookmark.bookmarkName = updateName;
            }
            var editedBookmark = this.allBookmarks.find(function (bkmk) { return bkmk.bookmarkName === _this.editedBookmark.bookmarkName; });
            if (editedBookmark) {
                editedBookmark.bookmarkName = updateName;
            }
            this.states = this.allBookmarks;
            this.closeButton.nativeElement.click();
            this.bookmarkForm.controls.bookmarkName.setValue('');
        };
        BookmarksComponent.prototype.editBookmark = function (bookmark) {
            if (this.bookmarkForm && this.bookmarkForm.controls) {
                this.bookmarkForm.controls.bookmarkName.setValue(bookmark.bookmarkName);
                this.editedBookmark = bookmark;
            }
        };
        BookmarksComponent.prototype.deleteBookmark = function (bookmark) {
            this.currentDeleteBookmark = bookmark;
        };
        BookmarksComponent.prototype.confirmDeleteBookmark = function () {
            var _this = this;
            this.deleteButton.nativeElement.click();
            this.bookmarkService
                .deleteBookmark(this.currentDeleteBookmark)
                .pipe(operators.takeUntil(this.unSubscribe))
                .subscribe(function (bookmarkName) {
                _this.subscribeConfirmDeleteBookmark();
            });
            // Track delete bookmark event
            this.snowplowService.eventTracking('delete-bookmark', 'click', 'bookmarkName', '', this.selectedBookmark.bookmarkName);
        };
        BookmarksComponent.prototype.subscribeConfirmDeleteBookmark = function () {
            var _this = this;
            if (this.currentDeleteBookmark.bookmarkName ===
                this.selectedBookmark.bookmarkName) {
                this.getDefaultView();
            }
            var states = this.states.filter(function (bookmark) { return bookmark.bookmarkName !== _this.currentDeleteBookmark.bookmarkName; });
            this.states = states;
            this.allBookmarks = states;
        };
        BookmarksComponent.prototype.closeModal = function () {
            this.editedBookmark = undefined;
            this.bookmarkForm.reset();
        };
        BookmarksComponent.prototype.resetDropdown = function () {
            var dropdown = document.getElementsByClassName('dropdown-menu')[0];
            dropdown.classList.add('show');
            this.modalOverlay.nativeElement.scrollTop = 0;
            dropdown.classList.remove('show');
            this.searchBookmark.setValue('');
            this.states = this.allBookmarks;
        };
        BookmarksComponent.prototype.getDefaultView = function () {
            this.selectedBookmark = { bookmarkName: 'Default View' };
            this.areFiltersChanged = false;
            this.visualElem.loadReport(this.defaultViewBookmark, 'default');
            var defaultView = document.querySelector('#default');
            defaultView.checked = true;
        };
        BookmarksComponent.prototype.saveView = function () { };
        BookmarksComponent.prototype.ngOnDestroy = function () {
            this.unSubscribe.next();
            this.unSubscribe.complete();
        };
        return BookmarksComponent;
    }());
    BookmarksComponent.ɵfac = function BookmarksComponent_Factory(t) { return new (t || BookmarksComponent)(i0.ɵɵdirectiveInject(BookmarkService), i0.ɵɵdirectiveInject(NotificationService), i0.ɵɵdirectiveInject(SnowplowService), i0.ɵɵdirectiveInject(ConfigService), i0.ɵɵdirectiveInject(DataVizUiService)); };
    BookmarksComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BookmarksComponent, selectors: [["lib-bookmarks"]], viewQuery: function BookmarksComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0, 1);
                i0.ɵɵviewQuery(_c1, 1);
                i0.ɵɵviewQuery(_c2, 1);
                i0.ɵɵviewQuery(_c3, 1);
                i0.ɵɵviewQuery(_c4, 1);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.closeButton = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.saveButton = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.deleteButton = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.updateButton = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.modalOverlay = _t.first);
            }
        }, inputs: { visualElem: "visualElem" }, outputs: { save: "save" }, decls: 85, vars: 12, consts: [[1, "row"], [1, "w-100", "show", "col-xl-12", "bookmark-dropdown"], ["type", "button", "id", "dropdownMenu", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", 1, "btn", "dropdown-btn", "dropdown-toggle", "col-xl-2", "mt10", 3, "title"], ["appDropdownStatusListener", "", "id", "dropdownMenu", "role", "menu", "aria-labelledby", "dropdownMenu", 1, "dropdown-menu", "col-xl-4", 3, "close"], ["modalOverlay", ""], [1, "list-group"], [1, "list-group-item", "custom-control", "custom-radio", "default-view", 3, "click"], ["type", "radio", "id", "default", "name", "filterGroupRadios", "checked", "", 1, "custom-control-input"], ["for", "default", 1, "custom-control-label"], ["placeholder", "Search views", "id", "searchBookmark", "name", "searchBookmark", "type", "text", "aria-describedby", "searchBookmark", "autocomplete", "off", 1, "form-control", 3, "formControl", "keyup"], ["class", "list-group-item custom-control custom-radio", 3, "title", 4, "ngFor", "ngForOf"], ["type", "button", "data-toggle", "modal", "data-target", "#exampleModalCenter", 1, "btn", "btn-success", "mt10", "save-view"], ["saveButton", ""], ["type", "button", "data-toggle", "modal", "data-target", "#updateBookmark", 1, "btn", "btn-secondary", "mt10", "save-view", 3, "disabled"], ["id", "exampleModalCenter", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], ["bookmarkModal", ""], ["role", "document", 1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "bookmark-modal"], ["name", "bookmarkForm", 3, "formGroup", "ngSubmit"], [1, "modal-header"], ["id", "exampleModalCenterTitle", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close", 3, "click"], ["closeButton", ""], ["aria-hidden", "true"], [1, "divider"], [1, "modal-body"], [1, "form-group"], ["for", "exampleInputEmail1"], ["type", "text", "formControlName", "bookmarkName", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", 3, "placeholder", "keyup"], ["name", ""], ["class", "text-error", 4, "ngIf"], [1, "modal-footer"], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["id", "deleteBookmark", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], [1, "modal-content"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["deleteButton", ""], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-secondary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["id", "updateBookmark", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], ["id", "updateBookmark", 1, "modal-title"], ["updateButton", ""], [1, "list-group-item", "custom-control", "custom-radio", 3, "title"], ["type", "radio", "name", "filterGroupRadios", 1, "custom-control-input", 3, "id", "checked", "change"], [1, "custom-control-label", 3, "for"], [1, "pull-right"], ["title", "Edit", 3, "routerLink", "click"], ["data-toggle", "modal", "data-target", "#exampleModalCenter", 1, "fa", "fa-edit"], ["title", "Delete", 3, "routerLink", "click"], ["data-toggle", "modal", "data-target", "#deleteBookmark", 1, "fa", "fa-trash"], [1, "text-error"]], template: function BookmarksComponent_Template(rf, ctx) {
            if (rf & 1) {
                var _r16_1 = i0.ɵɵgetCurrentView();
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelementStart(2, "div", 0);
                i0.ɵɵelementStart(3, "button", 2);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "slice");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(6, "div", 3, 4);
                i0.ɵɵlistener("close", function BookmarksComponent_Template_div_close_6_listener($event) { return ctx.closeDropdown($event); });
                i0.ɵɵelementStart(8, "div", 5);
                i0.ɵɵelementStart(9, "div", 6);
                i0.ɵɵlistener("click", function BookmarksComponent_Template_div_click_9_listener() { return ctx.getDefaultView(); });
                i0.ɵɵelement(10, "input", 7);
                i0.ɵɵelementStart(11, "label", 8);
                i0.ɵɵtext(12, "Default View");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(13, "div", 5);
                i0.ɵɵelementStart(14, "h6");
                i0.ɵɵtext(15, "My Saved Criteria");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(16, "div");
                i0.ɵɵelementStart(17, "input", 9);
                i0.ɵɵlistener("keyup", function BookmarksComponent_Template_input_keyup_17_listener($event) { return ctx.onSearchBookmark($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(18, BookmarksComponent_div_18_Template, 11, 11, "div", 10);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(19, "button", 11, 12);
                i0.ɵɵtext(21, " Save View As ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(22, "button", 13);
                i0.ɵɵtext(23, " Update View ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(24, "div", 14, 15);
                i0.ɵɵelementStart(26, "div", 16);
                i0.ɵɵelementStart(27, "div", 17);
                i0.ɵɵelementStart(28, "form", 18);
                i0.ɵɵlistener("ngSubmit", function BookmarksComponent_Template_form_ngSubmit_28_listener($event) { return ctx.saveBookmark($event); });
                i0.ɵɵelementStart(29, "div", 19);
                i0.ɵɵelementStart(30, "span", 20);
                i0.ɵɵtext(31, "Save current view");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(32, "button", 21, 22);
                i0.ɵɵlistener("click", function BookmarksComponent_Template_button_click_32_listener() { return ctx.closeModal(); });
                i0.ɵɵelementStart(34, "span", 23);
                i0.ɵɵtext(35, "\u00D7");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelement(36, "div", 24);
                i0.ɵɵelementStart(37, "div", 25);
                i0.ɵɵelementStart(38, "div", 26);
                i0.ɵɵelementStart(39, "label", 27);
                i0.ɵɵtext(40, "View name");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(41, "input", 28, 29);
                i0.ɵɵlistener("keyup", function BookmarksComponent_Template_input_keyup_41_listener() { i0.ɵɵrestoreView(_r16_1); var _r5 = i0.ɵɵreference(42); return ctx.onBookmarkNameChange(_r5.value); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(43, BookmarksComponent_span_43_Template, 2, 0, "span", 30);
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(44, "div", 31);
                i0.ɵɵelementStart(45, "button", 32);
                i0.ɵɵlistener("click", function BookmarksComponent_Template_button_click_45_listener() { return ctx.closeModal(); });
                i0.ɵɵtext(46, " Cancel ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(47, "button", 33);
                i0.ɵɵtext(48, " Save ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(49, "div", 34, 15);
                i0.ɵɵelementStart(51, "div", 16);
                i0.ɵɵelementStart(52, "div", 35);
                i0.ɵɵelementStart(53, "div", 19);
                i0.ɵɵelementStart(54, "h5", 20);
                i0.ɵɵtext(55, "Delete View");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(56, "button", 36, 37);
                i0.ɵɵelementStart(58, "span", 23);
                i0.ɵɵtext(59, "\u00D7");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(60, "div", 25);
                i0.ɵɵtext(61, "Are you sure you want to delete this view?");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(62, "div", 31);
                i0.ɵɵelementStart(63, "button", 38);
                i0.ɵɵtext(64, " Cancel ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(65, "button", 39);
                i0.ɵɵlistener("click", function BookmarksComponent_Template_button_click_65_listener() { return ctx.confirmDeleteBookmark(); });
                i0.ɵɵtext(66, " Delete ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(67, "div", 40, 15);
                i0.ɵɵelementStart(69, "div", 16);
                i0.ɵɵelementStart(70, "div", 35);
                i0.ɵɵelementStart(71, "div", 19);
                i0.ɵɵelementStart(72, "h5", 41);
                i0.ɵɵtext(73, "Update View");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(74, "button", 36, 42);
                i0.ɵɵelementStart(76, "span", 23);
                i0.ɵɵtext(77, "\u00D7");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(78, "div", 25);
                i0.ɵɵtext(79, "Are you sure you want to update this view?");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(80, "div", 31);
                i0.ɵɵelementStart(81, "button", 38);
                i0.ɵɵtext(82, " Cancel ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(83, "button", 39);
                i0.ɵɵlistener("click", function BookmarksComponent_Template_button_click_83_listener() { return ctx.updateBookmark(); });
                i0.ɵɵtext(84, " Update ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("title", ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName);
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate1(" ", (ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName == null ? null : ctx.selectedBookmark.bookmarkName.length) > 12 ? i0.ɵɵpipeBind3(5, 8, ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName, 0, 12) + "..." : ctx.selectedBookmark == null ? null : ctx.selectedBookmark.bookmarkName, " ");
                i0.ɵɵadvance(13);
                i0.ɵɵproperty("formControl", ctx.searchBookmark);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.states);
                i0.ɵɵadvance(4);
                i0.ɵɵproperty("disabled", ctx.selectedBookmark.bookmarkName === "Default View");
                i0.ɵɵadvance(6);
                i0.ɵɵproperty("formGroup", ctx.bookmarkForm);
                i0.ɵɵadvance(15);
                i0.ɵɵproperty("ngIf", ctx.bookmarkForm.dirty && !ctx.bookmarkForm.valid);
                i0.ɵɵadvance(4);
                i0.ɵɵproperty("disabled", ctx.bookmarkForm.invalid || ctx.isDuplicate);
            }
        }, directives: [i6.DefaultValueAccessor, i6.NgControlStatus, i6.FormControlDirective, i7.NgForOf, i6.ɵangular_packages_forms_forms_ba, i6.NgControlStatusGroup, i6.FormGroupDirective, i6.FormControlName, i7.NgIf, i2.RouterLinkWithHref], pipes: [i7.SlicePipe], styles: [".bookmark-dropdown[_ngcontent-%COMP%]{margin-left:25px;font-family:Avenir Next W01,sans-serif!important}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{max-height:310px;overflow:scroll;max-width:400px}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar{width:.5em;height:.5em;background-color:hsla(0,0%,100%,.9)}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:rgba(65,16,70,.4);border-radius:3px}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:rgba(45,11,49,.6)}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]:before{content:\"\";display:block;width:0;height:0;position:absolute;border-left:8px solid transparent;border-bottom:8px solid #aca7a7;border-right:8px solid transparent;left:366px;top:-9px}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border:none;padding:.25rem .25rem .25rem 2.5rem}.bookmark-dropdown[_ngcontent-%COMP%]   .custom-control-label[_ngcontent-%COMP%]{min-width:71%;min-height:2.1rem}.bookmark-dropdown[_ngcontent-%COMP%]   .custom-control-label[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{position:absolute;right:0}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;font-weight:700}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%], .bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover   label[_ngcontent-%COMP%]{cursor:pointer}.bookmark-dropdown[_ngcontent-%COMP%]   .default-view[_ngcontent-%COMP%]{margin-bottom:15px;border-bottom:1px solid;padding-left:40px}.bookmark-dropdown[_ngcontent-%COMP%]   .default-view[_ngcontent-%COMP%]   .custom-control-input[_ngcontent-%COMP%]{width:2.25rem;height:2.25rem}.bookmark-dropdown[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin-left:10px;font-weight:600}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-btn[_ngcontent-%COMP%]{background-color:#ccc;color:#323e48;font-size:16px;font-weight:600;letter-spacing:0;line-height:24px;height:40px;width:160px;margin-right:16px;max-width:200px}.bookmark-dropdown[_ngcontent-%COMP%]   .mt10[_ngcontent-%COMP%]{margin-top:6px;margin-bottom:6px}.bookmark-dropdown[_ngcontent-%COMP%]   .save-view[_ngcontent-%COMP%]{border-radius:6px!important;font-size:16px;font-weight:600;letter-spacing:0;line-height:24px;margin-right:15px;padding:0 15px}.bookmark-dropdown[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]{z-index:9999}.bookmark-dropdown[_ngcontent-%COMP%]   .text-error[_ngcontent-%COMP%]{color:#dc3545;position:absolute;font-size:.8rem}.bookmark-dropdown[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], .bookmark-dropdown[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin:5px 10px;color:#9c9ea1;cursor:pointer}.bookmark-dropdown[_ngcontent-%COMP%]   .bookmark-modal[_ngcontent-%COMP%]{height:280px;width:550px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]{border:none}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:18px;font-weight:600;letter-spacing:0;line-height:24px;margin:10px 0}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:28px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]{margin-left:14px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:20px;font-weight:600;letter-spacing:0;line-height:28px;margin-bottom:1.5rem}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:0}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{height:calc(1.5em + .75rem + 8px);width:490px}.bookmark-dropdown[_ngcontent-%COMP%]   input[name=searchBookmark][_ngcontent-%COMP%]{width:98%;margin:1%}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]{border:none}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]{background-color:#f5f6f7;color:#323e48;font-size:16px;font-weight:600;line-height:22px;text-align:center;padding:8px 20px;margin-right:15px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]{background-color:#0199d6;padding:8px 20px;font-size:16px;font-weight:600;line-height:22px;text-align:center;border:1px solid #0199d6}.settings[_ngcontent-%COMP%]{display:inline-block;position:absolute;right:0;max-width:60px}.settings[_ngcontent-%COMP%]   .settings-content[_ngcontent-%COMP%]{padding-left:10px;margin-left:-90px;margin-top:10px}.settings[_ngcontent-%COMP%]   .settings-title[_ngcontent-%COMP%]{font-size:16px;font-weight:700}.settings[_ngcontent-%COMP%]   .taxanomy[_ngcontent-%COMP%]{margin:10px 0 10px 24px}.settings[_ngcontent-%COMP%]   .taxanomy-title[_ngcontent-%COMP%]{font-weight:700;color:#474545}.settings[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{width:370px;margin:10px 15px}.settings[_ngcontent-%COMP%]   .fa-gear[_ngcontent-%COMP%]{margin-top:25px;color:#9f9898}.settings[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{overflow:visible!important}.divider[_ngcontent-%COMP%]{box-sizing:border-box;height:1px;width:510px;border:.5px dotted #979797;margin-left:16px}.custom-control-input[_ngcontent-%COMP%]:checked ~ .custom-control-label[_ngcontent-%COMP%]:before{color:#fff;border-color:#682875;background-color:#682875}@media (min-width:1200px){.settings[_ngcontent-%COMP%]{right:60px}.dropdown-menu[_ngcontent-%COMP%]:before{left:332px!important}}@media (max-width:500px){.dropdown-btn[_ngcontent-%COMP%], .save-view[_ngcontent-%COMP%]{margin-right:11px!important}}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BookmarksComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-bookmarks',
                        templateUrl: './bookmarks.component.html',
                        styleUrls: ['./bookmarks.component.scss']
                    }]
            }], function () { return [{ type: BookmarkService }, { type: NotificationService }, { type: SnowplowService }, { type: ConfigService }, { type: DataVizUiService }]; }, { closeButton: [{
                    type: i0.ViewChild,
                    args: ['closeButton']
                }], saveButton: [{
                    type: i0.ViewChild,
                    args: ['saveButton']
                }], deleteButton: [{
                    type: i0.ViewChild,
                    args: ['deleteButton']
                }], updateButton: [{
                    type: i0.ViewChild,
                    args: ['updateButton']
                }], modalOverlay: [{
                    type: i0.ViewChild,
                    args: ['modalOverlay']
                }], visualElem: [{
                    type: i0.Input
                }], save: [{
                    type: i0.Output
                }] });
    })();

    function HeaderComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵelement(1, "lib-bookmarks", 5);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("visualElem", ctx_r0.visual);
        }
    }
    function HeaderComponent_div_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 6);
        }
        if (rf & 2) {
            var divId_r2 = ctx.$implicit;
            i0.ɵɵproperty("id", divId_r2);
        }
    }
    var HeaderComponent = /** @class */ (function () {
        function HeaderComponent(configService) {
            this.configService = configService;
            this.visual = {};
        }
        HeaderComponent.prototype.uiElementsListing = function () {
            return this.configService.config.uiElements;
        };
        HeaderComponent.prototype.ngOnInit = function () { };
        HeaderComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            setTimeout(function () {
                var elements = _this.configService.config.uiElements;
                _this.appendElements(elements);
            }, 10);
        };
        HeaderComponent.prototype.appendElements = function (elements) {
            elements.forEach(function (elementName) {
                var elementContainer = document.querySelector('#' + elementName);
                var elementHtml = document.querySelector(elementName);
                if (elementContainer && elementHtml) {
                    elementContainer.appendChild(elementHtml);
                }
            });
        };
        return HeaderComponent;
    }());
    HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(i0.ɵɵdirectiveInject(ConfigService)); };
    HeaderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: HeaderComponent, selectors: [["lib-header"]], inputs: { visual: "visual" }, decls: 4, vars: 2, consts: [[1, "header-container"], ["class", "bookmarks-container", 4, "ngIf"], [1, "ui-elements-container"], ["class", "right", 3, "id", 4, "ngFor", "ngForOf"], [1, "bookmarks-container"], [3, "visualElem"], [1, "right", 3, "id"]], template: function HeaderComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, HeaderComponent_div_1_Template, 2, 1, "div", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵtemplate(3, HeaderComponent_div_3_Template, 1, 1, "div", 3);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.configService.config.bookmarks);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngForOf", ctx.configService.config.uiElements);
            }
        }, directives: [i7.NgIf, i7.NgForOf, BookmarksComponent], styles: [".header-container[_ngcontent-%COMP%]{height:56px;width:100%;float:left}.bookmarks-container[_ngcontent-%COMP%]{height:56px;width:40%;float:left}.ui-elements-container[_ngcontent-%COMP%]{height:56px;width:60%;float:left}.ui-elements-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin:10px 20px}.left[_ngcontent-%COMP%]{float:left}.right[_ngcontent-%COMP%]{float:right}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-header',
                        templateUrl: './header.component.html',
                        styleUrls: ['./header.component.scss'],
                    }]
            }], function () { return [{ type: ConfigService }]; }, { visual: [{
                    type: i0.Input
                }] });
    })();

    function DataVizUiComponent_lib_header_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "lib-header", 3);
        }
        if (rf & 2) {
            i0.ɵɵnextContext();
            var _r1 = i0.ɵɵreference(3);
            i0.ɵɵproperty("visual", _r1);
        }
    }
    var DataVizUiComponent = /** @class */ (function () {
        function DataVizUiComponent(configService, snowplowService) {
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
        DataVizUiComponent.prototype.ngOnInit = function () {
            // Set userId in Snowplow
            this.snowplowService.setUserId();
            // Set appSessionId
            this.snowplowService.setAppSessionId();
        };
        DataVizUiComponent.prototype.ngOnChanges = function (changes) {
            Object.keys(changes).forEach(function (key) {
                changes[key] = changes[key].currentValue;
            });
            this.configService.updateValues(changes);
        };
        return DataVizUiComponent;
    }());
    DataVizUiComponent.ɵfac = function DataVizUiComponent_Factory(t) { return new (t || DataVizUiComponent)(i0.ɵɵdirectiveInject(ConfigService), i0.ɵɵdirectiveInject(SnowplowService)); };
    DataVizUiComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DataVizUiComponent, selectors: [["lib-data-viz-ui"]], inputs: { modules: "modules", bookmarks: "bookmarks", uiElements: "uiElements", roles: "roles" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 1, consts: [[1, "app-container"], [3, "visual", 4, "ngIf"], ["visual", ""], [3, "visual"]], template: function DataVizUiComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, DataVizUiComponent_lib_header_1_Template, 1, 1, "lib-header", 1);
                i0.ɵɵelement(2, "lib-visualization", null, 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.configService.config.modules.header);
            }
        }, directives: [i7.NgIf, VisualizationComponent, HeaderComponent], encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-data-viz-ui',
                        templateUrl: './data-viz-ui.component.html',
                        styleUrls: [],
                    }]
            }], function () { return [{ type: ConfigService }, { type: SnowplowService }]; }, { modules: [{
                    type: i0.Input
                }], bookmarks: [{
                    type: i0.Input
                }], uiElements: [{
                    type: i0.Input
                }], roles: [{
                    type: i0.Input
                }] });
    })();

    var AnalyticsConfig = /** @class */ (function () {
        function AnalyticsConfig() {
        }
        return AnalyticsConfig;
    }());
    AnalyticsConfig.SNOWPLOW_ENVIRONMENTS_MAPPING = {
        dev: 'SNAPSHOT',
        qa: 'STABLE',
        prod: 'PROD',
    };
    AnalyticsConfig.SNOWPLOW_PARAMS = {
        appId: 'DATAVIZ',
        options: {
            snowplowEnvironmentProvider: {
                provide: i1.ANALYTICS_ENVIRONMENT,
                useFactory: getEnvironment,
            },
            tracking: {
                inferred: false,
                pageViews: true
            }
        }
    };
    function getEnvironment() {
        var snowplowEnvironment = AnalyticsConfig.SNOWPLOW_ENVIRONMENTS_MAPPING[AppConfig.fetchAppEnv()] || 'SNAPSHOT';
        return snowplowEnvironment;
    }

    var LoginComponent = /** @class */ (function () {
        function LoginComponent(authService, router, route, snowplowService) {
            this.authService = authService;
            this.router = router;
            this.route = route;
            this.snowplowService = snowplowService;
        }
        LoginComponent.prototype.login = function () {
            this.authService.login();
        };
        LoginComponent.prototype.consume = function (apiToken) {
            var redirect = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '';
            this.authService.authenticate(apiToken);
            this.authService.getUserRole();
            this.router.navigate([redirect]);
            this.trackLogin();
        };
        LoginComponent.prototype.consumePing = function (apiToken) {
            var redirect = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '';
            this.authService.authenticate(apiToken);
            this.authService.getUserRole();
            this.router.navigate([redirect]);
        };
        LoginComponent.prototype.trackLogin = function () {
            if (this.authService.isAuthenticated()) {
                this.router.navigate(['']);
                this.snowplowService.eventTracking('login', 'click');
            }
        };
        LoginComponent.prototype.logout = function () {
            this.authService.logout();
        };
        LoginComponent.prototype.validRoute = function () {
            if (this.route && this.route.snapshot && this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path) {
                return this.route.snapshot.routeConfig.path;
            }
            return '/';
        };
        LoginComponent.prototype.ngOnInit = function () {
            var routePath = this.validRoute();
            if (routePath.indexOf('ping-login') > -1) {
                this.ping();
            }
            else if (routePath.indexOf('login') > -1) {
                this.login();
            }
            else if (routePath.indexOf('consumePing') > -1) {
                var consumeToken = this.route.snapshot.queryParams['api_token'];
                this.authService.redirectUrl = this.route.snapshot.queryParams['redirectTo'];
                this.consumePing(consumeToken);
            }
            else if (routePath.indexOf('consume') > -1) {
                var consumeToken = this.route.snapshot.queryParams['api_token'];
                this.authService.redirectUrl = this.route.snapshot.queryParams['redirectTo'];
                this.consume(consumeToken);
            }
            else if (routePath.indexOf('logout') > -1) {
                this.logout();
                this.snowplowService.eventTracking('logout', 'click');
            }
        };
        LoginComponent.prototype.ping = function () {
            this.authService.ping();
        };
        return LoginComponent;
    }());
    LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(i0.ɵɵdirectiveInject(AuthenticationService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(SnowplowService)); };
    LoginComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["lib-login"]], decls: 2, vars: 0, template: function LoginComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "h4");
                i0.ɵɵtext(1, "You are being redirected to the Log In page");
                i0.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-login',
                        templateUrl: './login.component.html',
                    }]
            }], function () { return [{ type: AuthenticationService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: SnowplowService }]; }, null);
    })();

    // import { MessageService } from '../services/message.service';
    var TokenInterceptor = /** @class */ (function () {
        function TokenInterceptor(authService, router) {
            this.authService = authService;
            this.router = router;
        }
        TokenInterceptor.prototype.intercept = function (req, next) {
            var _this = this;
            var token = this.authService.getAuthorizationToken()
                ? this.authService.getAuthorizationToken()
                : '';
            token = 'Bearer ' + token;
            var headers = req.headers.set('Authorization', token);
            req = req.clone({ headers: headers });
            return next.handle(req).pipe(operators.tap(function (event) {
                if (event instanceof i1$1.HttpResponse) {
                    // Do something after success
                }
            }, function (err) {
                if (err instanceof i1$1.HttpErrorResponse) {
                    if (err.status === 401) {
                        // redirect to login
                        _this.router.navigate(['login']);
                    }
                    else if (err.status === 419) {
                        // redirect to logout
                        _this.router.navigate(['logout']);
                    }
                    else {
                        // this.messageService.addErrorMessage(err.status.toString());
                    }
                }
            }), operators.finalize(function () { }));
        };
        return TokenInterceptor;
    }());
    TokenInterceptor.ɵfac = function TokenInterceptor_Factory(t) { return new (t || TokenInterceptor)(i0.ɵɵinject(AuthenticationService), i0.ɵɵinject(i2.Router)); };
    TokenInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: TokenInterceptor, factory: TokenInterceptor.ɵfac });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TokenInterceptor, [{
                type: i0.Injectable
            }], function () { return [{ type: AuthenticationService }, { type: i2.Router }]; }, null);
    })();

    var AuthenticationGuard = /** @class */ (function () {
        function AuthenticationGuard(authService, dataVizUiService, router) {
            this.authService = authService;
            this.dataVizUiService = dataVizUiService;
            this.router = router;
        }
        AuthenticationGuard.prototype.canActivate = function (route, state) {
            return this.checkLogin(state.url);
        };
        AuthenticationGuard.prototype.checkLogin = function (url) {
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
        };
        return AuthenticationGuard;
    }());
    AuthenticationGuard.ɵfac = function AuthenticationGuard_Factory(t) { return new (t || AuthenticationGuard)(i0.ɵɵinject(AuthenticationService), i0.ɵɵinject(DataVizUiService), i0.ɵɵinject(i2.Router)); };
    AuthenticationGuard.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationGuard, factory: AuthenticationGuard.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthenticationGuard, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return [{ type: AuthenticationService }, { type: DataVizUiService }, { type: i2.Router }]; }, null);
    })();

    var UnauthorizedComponent = /** @class */ (function () {
        function UnauthorizedComponent() {
            // ToDo - To be pulled from configuration
            this.mailTo = '';
            this.mailSubject = '';
        }
        UnauthorizedComponent.prototype.ngOnInit = function () { };
        UnauthorizedComponent.prototype.sendEmail = function () {
            document.location.href =
                'mailto:' +
                    this.mailTo +
                    '?subject=' +
                    this.mailSubject;
        };
        return UnauthorizedComponent;
    }());
    UnauthorizedComponent.ɵfac = function UnauthorizedComponent_Factory(t) { return new (t || UnauthorizedComponent)(); };
    UnauthorizedComponent.ɵcmp = i0.ɵɵdefineComponent({ type: UnauthorizedComponent, selectors: [["lib-unauthorized"]], decls: 35, vars: 0, consts: [[1, "auth-main"], [1, "img-wrapper"], ["src", "./../../../../assets/images/subscription-header.png", "alt", "Subscriptions", "width", "100%", 1, "img-responsive"], [1, "img-overlay"], [1, "btn", "btn-success", 3, "click"], [1, "instructions"], [1, "main-header"], [1, "header"], [1, "divider"]], template: function UnauthorizedComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelement(2, "img", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵelementStart(4, "button", 4);
                i0.ɵɵlistener("click", function UnauthorizedComponent_Template_button_click_4_listener() { return ctx.sendEmail(); });
                i0.ɵɵtext(5, "Contact us");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(6, "div", 5);
                i0.ɵɵelementStart(7, "section");
                i0.ɵɵelementStart(8, "span", 6);
                i0.ɵɵtext(9, "Get started tracking sales performance and pricing in the medical supply distribution channel across: ");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(10, "p");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(11, "ul");
                i0.ɵɵelementStart(12, "section");
                i0.ɵɵelementStart(13, "li", 7);
                i0.ɵɵtext(14, "Product SKU");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(15, "p");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(16, "section");
                i0.ɵɵelementStart(17, "li", 7);
                i0.ɵɵtext(18, "ZIP 3 geography");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(19, "p");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(20, "section");
                i0.ɵɵelementStart(21, "li", 7);
                i0.ɵɵtext(22, "UNSPSC Product Category");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(23, "p");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(24, "section");
                i0.ɵɵelementStart(25, "li", 7);
                i0.ɵɵtext(26, "Manufacturer");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(27, "p");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(28, "section");
                i0.ɵɵelementStart(29, "li", 7);
                i0.ɵɵtext(30, " Class-of-Trade (Hospital, ASC, Lab/Diagnostic, Physician Office, Treatment Center, Long-Term Care, Home Care, Retail/Consumer) ");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(31, "p");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelement(32, "div", 8);
                i0.ɵɵelementStart(33, "button", 4);
                i0.ɵɵlistener("click", function UnauthorizedComponent_Template_button_click_33_listener() { return ctx.sendEmail(); });
                i0.ɵɵtext(34, "Contact us");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
        }, styles: [".auth-main[_ngcontent-%COMP%]{margin:50px 10%;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,Liberation Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji!important}.auth-main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .main-header[_ngcontent-%COMP%]{height:38px;width:333px;color:#323e48;font-size:24px;font-weight:600;letter-spacing:0;line-height:38px}.auth-main[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:disc;font-weight:600}.auth-main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#323e48;font-size:14px;font-weight:500;line-height:22px}.auth-main[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{box-sizing:border-box;height:1px;width:100%;border:.5px solid #979797}.auth-main[_ngcontent-%COMP%]   .btn-success[_ngcontent-%COMP%]{background-color:#70a94f!important;margin:20px 0;font-size:1vw}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{position:relative;font-size:1vw;margin-bottom:50px}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-responsive[_ngcontent-%COMP%]{width:100%;height:auto}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:-78%;right:0;text-align:center}.auth-main[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]:before{content:\" \";display:block;height:60%}@media (max-width:768px){.auth-main[_ngcontent-%COMP%]   .btn-success[_ngcontent-%COMP%]{padding:3px 6px}.auth-main[_ngcontent-%COMP%]   .img-overlay[_ngcontent-%COMP%]:before{height:50%!important}}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UnauthorizedComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-unauthorized',
                        templateUrl: './unauthorized.component.html',
                        styleUrls: ['./unauthorized.component.scss'],
                    }]
            }], function () { return []; }, null);
    })();

    function PingComponent_h4_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "h4");
            i0.ɵɵtext(1, "Successful Ping");
            i0.ɵɵelementEnd();
        }
    }
    var PingComponent = /** @class */ (function () {
        function PingComponent(authService, router, route) {
            this.authService = authService;
            this.router = router;
            this.route = route;
            this.isSuccess = true;
        }
        PingComponent.prototype.login = function () { };
        PingComponent.prototype.ngOnInit = function () {
            this.isSuccess = true;
        };
        return PingComponent;
    }());
    PingComponent.ɵfac = function PingComponent_Factory(t) { return new (t || PingComponent)(i0.ɵɵdirectiveInject(AuthenticationService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i2.ActivatedRoute)); };
    PingComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PingComponent, selectors: [["lib-ping"]], decls: 1, vars: 1, consts: [[4, "ngIf"]], template: function PingComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, PingComponent_h4_0_Template, 2, 0, "h4", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.isSuccess);
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PingComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-ping',
                        templateUrl: './ping.component.html',
                    }]
            }], function () { return [{ type: AuthenticationService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, null);
    })();

    var DATA_VIZ_ROUTES = [
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
    var DataVizUiRoutingModule = /** @class */ (function () {
        function DataVizUiRoutingModule() {
        }
        DataVizUiRoutingModule.getRoutes = function () {
            return DATA_VIZ_ROUTES;
        };
        return DataVizUiRoutingModule;
    }());
    DataVizUiRoutingModule.ɵfac = function DataVizUiRoutingModule_Factory(t) { return new (t || DataVizUiRoutingModule)(); };
    DataVizUiRoutingModule.ɵmod = i0.ɵɵdefineNgModule({ type: DataVizUiRoutingModule });
    DataVizUiRoutingModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[i2.RouterModule.forChild(DATA_VIZ_ROUTES)], i2.RouterModule] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DataVizUiRoutingModule, { imports: [i2.RouterModule], exports: [i2.RouterModule] }); })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiRoutingModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.RouterModule.forChild(DATA_VIZ_ROUTES)],
                        exports: [i2.RouterModule],
                    }]
            }], null, null);
    })();

    var DataVizUiModule = /** @class */ (function () {
        function DataVizUiModule() {
        }
        return DataVizUiModule;
    }());
    DataVizUiModule.ɵfac = function DataVizUiModule_Factory(t) { return new (t || DataVizUiModule)(); };
    DataVizUiModule.ɵmod = i0.ɵɵdefineNgModule({ type: DataVizUiModule });
    DataVizUiModule.ɵinj = i0.ɵɵdefineInjector({ providers: [
            Config,
            i1.AnalyticsService,
            DataVizUiService,
            { provide: i1$1.HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        ], imports: [[
                i7.CommonModule,
                i6.ReactiveFormsModule,
                i2.RouterModule,
                i1$1.HttpClientModule,
                DataVizUiRoutingModule,
                i1.AnalyticsModule.forRoot(AnalyticsConfig.SNOWPLOW_PARAMS)
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DataVizUiModule, { declarations: [DataVizUiComponent,
                HeaderComponent,
                BookmarksComponent,
                VisualizationComponent,
                LoginComponent], imports: [i7.CommonModule,
                i6.ReactiveFormsModule,
                i2.RouterModule,
                i1$1.HttpClientModule,
                DataVizUiRoutingModule, i1.AnalyticsModule], exports: [DataVizUiComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataVizUiModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            DataVizUiComponent,
                            HeaderComponent,
                            BookmarksComponent,
                            VisualizationComponent,
                            LoginComponent
                        ],
                        imports: [
                            i7.CommonModule,
                            i6.ReactiveFormsModule,
                            i2.RouterModule,
                            i1$1.HttpClientModule,
                            DataVizUiRoutingModule,
                            i1.AnalyticsModule.forRoot(AnalyticsConfig.SNOWPLOW_PARAMS)
                        ],
                        providers: [
                            Config,
                            i1.AnalyticsService,
                            DataVizUiService,
                            { provide: i1$1.HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
                        ],
                        exports: [
                            DataVizUiComponent,
                        ]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of data-viz-ui
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DataVizUiComponent = DataVizUiComponent;
    exports.DataVizUiEnvironmentManager = DataVizUiEnvironmentManager;
    exports.DataVizUiModule = DataVizUiModule;
    exports.DataVizUiService = DataVizUiService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data-viz-ui.umd.js.map
