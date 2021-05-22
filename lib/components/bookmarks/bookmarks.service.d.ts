import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './../../authentication/config';
import { AuthenticationService } from './../../authentication/authentication.service';
import { ConfigService } from '../../config.service';
import { PowerbiBookmark } from '../visualization/visualization.model';
import * as i0 from "@angular/core";
export declare class BookmarkService {
    private http;
    private apiConfig;
    private configService;
    private authService;
    private apiUrl;
    private reportName;
    private tenantId;
    constructor(http: HttpClient, apiConfig: Config, configService: ConfigService, authService: AuthenticationService);
    getBookmarks(reportName?: string): Observable<any[]>;
    createBookmark(bookmark: PowerbiBookmark): Observable<any>;
    updateBookmark(editedBookmark: PowerbiBookmark): Observable<any>;
    updateBookmarkName(editedBookmark: PowerbiBookmark, newName: string): Observable<any>;
    deleteBookmark(bookmark: PowerbiBookmark): Observable<any>;
    handleError(error: object): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDef<BookmarkService, never>;
    static ɵprov: i0.ɵɵInjectableDef<BookmarkService>;
}
//# sourceMappingURL=bookmarks.service.d.ts.map