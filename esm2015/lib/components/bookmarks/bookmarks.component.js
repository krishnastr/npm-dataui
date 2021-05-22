import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as arrayApis from './../../common/useful-apis/array-apis';
import { Subject, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./bookmarks.service";
import * as i2 from "./../../common/core/notification.service";
import * as i3 from "./../../snowplow/snowplow.service";
import * as i4 from "./../../config.service";
import * as i5 from "./../../data-viz-ui.service";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
import * as i8 from "@angular/router";
const _c0 = ["closeButton"];
const _c1 = ["saveButton"];
const _c2 = ["deleteButton"];
const _c3 = ["updateButton"];
const _c4 = ["modalOverlay"];
function BookmarksComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelementStart(1, "input", 44);
    i0.ɵɵlistener("change", function BookmarksComponent_div_18_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r13); const state_r11 = ctx.$implicit; const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.onBookmarkSelect($event, state_r11); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 45);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 46);
    i0.ɵɵelementStart(6, "a", 47);
    i0.ɵɵlistener("click", function BookmarksComponent_div_18_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r13); const state_r11 = ctx.$implicit; const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.editBookmark(state_r11); });
    i0.ɵɵelement(7, "em", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, "| ");
    i0.ɵɵelementStart(9, "a", 49);
    i0.ɵɵlistener("click", function BookmarksComponent_div_18_Template_a_click_9_listener() { i0.ɵɵrestoreView(_r13); const state_r11 = ctx.$implicit; const ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.deleteBookmark(state_r11); });
    i0.ɵɵelement(10, "em", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const state_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
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
} }
function BookmarksComponent_span_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 51);
    i0.ɵɵtext(1, "Please enter name containing alphabets, numbers and special characters .*-/'. Length should between 3 and 140 characters!");
    i0.ɵɵelementEnd();
} }
export class BookmarksComponent {
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
            bookmarks = arrayApis.default.sort(bookmarks, 'alphabetic', true);
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
        this.states = arrayApis.default.sort(this.states, 'alphabetic', true);
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
BookmarksComponent.ɵfac = function BookmarksComponent_Factory(t) { return new (t || BookmarksComponent)(i0.ɵɵdirectiveInject(i1.BookmarkService), i0.ɵɵdirectiveInject(i2.NotificationService), i0.ɵɵdirectiveInject(i3.SnowplowService), i0.ɵɵdirectiveInject(i4.ConfigService), i0.ɵɵdirectiveInject(i5.DataVizUiService)); };
BookmarksComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BookmarksComponent, selectors: [["lib-bookmarks"]], viewQuery: function BookmarksComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 1);
        i0.ɵɵviewQuery(_c1, 1);
        i0.ɵɵviewQuery(_c2, 1);
        i0.ɵɵviewQuery(_c3, 1);
        i0.ɵɵviewQuery(_c4, 1);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.closeButton = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.saveButton = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.deleteButton = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.updateButton = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.modalOverlay = _t.first);
    } }, inputs: { visualElem: "visualElem" }, outputs: { save: "save" }, decls: 85, vars: 12, consts: [[1, "row"], [1, "w-100", "show", "col-xl-12", "bookmark-dropdown"], ["type", "button", "id", "dropdownMenu", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", 1, "btn", "dropdown-btn", "dropdown-toggle", "col-xl-2", "mt10", 3, "title"], ["appDropdownStatusListener", "", "id", "dropdownMenu", "role", "menu", "aria-labelledby", "dropdownMenu", 1, "dropdown-menu", "col-xl-4", 3, "close"], ["modalOverlay", ""], [1, "list-group"], [1, "list-group-item", "custom-control", "custom-radio", "default-view", 3, "click"], ["type", "radio", "id", "default", "name", "filterGroupRadios", "checked", "", 1, "custom-control-input"], ["for", "default", 1, "custom-control-label"], ["placeholder", "Search views", "id", "searchBookmark", "name", "searchBookmark", "type", "text", "aria-describedby", "searchBookmark", "autocomplete", "off", 1, "form-control", 3, "formControl", "keyup"], ["class", "list-group-item custom-control custom-radio", 3, "title", 4, "ngFor", "ngForOf"], ["type", "button", "data-toggle", "modal", "data-target", "#exampleModalCenter", 1, "btn", "btn-success", "mt10", "save-view"], ["saveButton", ""], ["type", "button", "data-toggle", "modal", "data-target", "#updateBookmark", 1, "btn", "btn-secondary", "mt10", "save-view", 3, "disabled"], ["id", "exampleModalCenter", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], ["bookmarkModal", ""], ["role", "document", 1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "bookmark-modal"], ["name", "bookmarkForm", 3, "formGroup", "ngSubmit"], [1, "modal-header"], ["id", "exampleModalCenterTitle", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close", 3, "click"], ["closeButton", ""], ["aria-hidden", "true"], [1, "divider"], [1, "modal-body"], [1, "form-group"], ["for", "exampleInputEmail1"], ["type", "text", "formControlName", "bookmarkName", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", 3, "placeholder", "keyup"], ["name", ""], ["class", "text-error", 4, "ngIf"], [1, "modal-footer"], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["id", "deleteBookmark", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], [1, "modal-content"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["deleteButton", ""], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-secondary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["id", "updateBookmark", "aria-modal", "true", "role", "dialog", 1, "modal", "fade"], ["id", "updateBookmark", 1, "modal-title"], ["updateButton", ""], [1, "list-group-item", "custom-control", "custom-radio", 3, "title"], ["type", "radio", "name", "filterGroupRadios", 1, "custom-control-input", 3, "id", "checked", "change"], [1, "custom-control-label", 3, "for"], [1, "pull-right"], ["title", "Edit", 3, "routerLink", "click"], ["data-toggle", "modal", "data-target", "#exampleModalCenter", 1, "fa", "fa-edit"], ["title", "Delete", 3, "routerLink", "click"], ["data-toggle", "modal", "data-target", "#deleteBookmark", 1, "fa", "fa-trash"], [1, "text-error"]], template: function BookmarksComponent_Template(rf, ctx) { if (rf & 1) {
        const _r16 = i0.ɵɵgetCurrentView();
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
        i0.ɵɵlistener("keyup", function BookmarksComponent_Template_input_keyup_41_listener() { i0.ɵɵrestoreView(_r16); const _r5 = i0.ɵɵreference(42); return ctx.onBookmarkNameChange(_r5.value); });
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
    } if (rf & 2) {
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
    } }, directives: [i6.DefaultValueAccessor, i6.NgControlStatus, i6.FormControlDirective, i7.NgForOf, i6.ɵangular_packages_forms_forms_ba, i6.NgControlStatusGroup, i6.FormGroupDirective, i6.FormControlName, i7.NgIf, i8.RouterLinkWithHref], pipes: [i7.SlicePipe], styles: [".bookmark-dropdown[_ngcontent-%COMP%]{margin-left:25px;font-family:Avenir Next W01,sans-serif!important}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{max-height:310px;overflow:scroll;max-width:400px}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar{width:.5em;height:.5em;background-color:hsla(0,0%,100%,.9)}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:rgba(65,16,70,.4);border-radius:3px}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:rgba(45,11,49,.6)}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]:before{content:\"\";display:block;width:0;height:0;position:absolute;border-left:8px solid transparent;border-bottom:8px solid #aca7a7;border-right:8px solid transparent;left:366px;top:-9px}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border:none;padding:.25rem .25rem .25rem 2.5rem}.bookmark-dropdown[_ngcontent-%COMP%]   .custom-control-label[_ngcontent-%COMP%]{min-width:71%;min-height:2.1rem}.bookmark-dropdown[_ngcontent-%COMP%]   .custom-control-label[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{position:absolute;right:0}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;font-weight:700}.bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%], .bookmark-dropdown[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:hover   label[_ngcontent-%COMP%]{cursor:pointer}.bookmark-dropdown[_ngcontent-%COMP%]   .default-view[_ngcontent-%COMP%]{margin-bottom:15px;border-bottom:1px solid;padding-left:40px}.bookmark-dropdown[_ngcontent-%COMP%]   .default-view[_ngcontent-%COMP%]   .custom-control-input[_ngcontent-%COMP%]{width:2.25rem;height:2.25rem}.bookmark-dropdown[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin-left:10px;font-weight:600}.bookmark-dropdown[_ngcontent-%COMP%]   .dropdown-btn[_ngcontent-%COMP%]{background-color:#ccc;color:#323e48;font-size:16px;font-weight:600;letter-spacing:0;line-height:24px;height:40px;width:160px;margin-right:16px;max-width:200px}.bookmark-dropdown[_ngcontent-%COMP%]   .mt10[_ngcontent-%COMP%]{margin-top:6px;margin-bottom:6px}.bookmark-dropdown[_ngcontent-%COMP%]   .save-view[_ngcontent-%COMP%]{border-radius:6px!important;font-size:16px;font-weight:600;letter-spacing:0;line-height:24px;margin-right:15px;padding:0 15px}.bookmark-dropdown[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]{z-index:9999}.bookmark-dropdown[_ngcontent-%COMP%]   .text-error[_ngcontent-%COMP%]{color:#dc3545;position:absolute;font-size:.8rem}.bookmark-dropdown[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], .bookmark-dropdown[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin:5px 10px;color:#9c9ea1;cursor:pointer}.bookmark-dropdown[_ngcontent-%COMP%]   .bookmark-modal[_ngcontent-%COMP%]{height:280px;width:550px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]{border:none}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:18px;font-weight:600;letter-spacing:0;line-height:24px;margin:10px 0}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:28px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]{margin-left:14px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:20px;font-weight:600;letter-spacing:0;line-height:28px;margin-bottom:1.5rem}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:0}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{height:calc(1.5em + .75rem + 8px);width:490px}.bookmark-dropdown[_ngcontent-%COMP%]   input[name=searchBookmark][_ngcontent-%COMP%]{width:98%;margin:1%}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]{border:none}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]{background-color:#f5f6f7;color:#323e48;font-size:16px;font-weight:600;line-height:22px;text-align:center;padding:8px 20px;margin-right:15px}.bookmark-dropdown[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]{background-color:#0199d6;padding:8px 20px;font-size:16px;font-weight:600;line-height:22px;text-align:center;border:1px solid #0199d6}.settings[_ngcontent-%COMP%]{display:inline-block;position:absolute;right:0;max-width:60px}.settings[_ngcontent-%COMP%]   .settings-content[_ngcontent-%COMP%]{padding-left:10px;margin-left:-90px;margin-top:10px}.settings[_ngcontent-%COMP%]   .settings-title[_ngcontent-%COMP%]{font-size:16px;font-weight:700}.settings[_ngcontent-%COMP%]   .taxanomy[_ngcontent-%COMP%]{margin:10px 0 10px 24px}.settings[_ngcontent-%COMP%]   .taxanomy-title[_ngcontent-%COMP%]{font-weight:700;color:#474545}.settings[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{width:370px;margin:10px 15px}.settings[_ngcontent-%COMP%]   .fa-gear[_ngcontent-%COMP%]{margin-top:25px;color:#9f9898}.settings[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{overflow:visible!important}.divider[_ngcontent-%COMP%]{box-sizing:border-box;height:1px;width:510px;border:.5px dotted #979797;margin-left:16px}.custom-control-input[_ngcontent-%COMP%]:checked ~ .custom-control-label[_ngcontent-%COMP%]:before{color:#fff;border-color:#682875;background-color:#682875}@media (min-width:1200px){.settings[_ngcontent-%COMP%]{right:60px}.dropdown-menu[_ngcontent-%COMP%]:before{left:332px!important}}@media (max-width:500px){.dropdown-btn[_ngcontent-%COMP%], .save-view[_ngcontent-%COMP%]{margin-right:11px!important}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BookmarksComponent, [{
        type: Component,
        args: [{
                selector: 'lib-bookmarks',
                templateUrl: './bookmarks.component.html',
                styleUrls: ['./bookmarks.component.scss']
            }]
    }], function () { return [{ type: i1.BookmarkService }, { type: i2.NotificationService }, { type: i3.SnowplowService }, { type: i4.ConfigService }, { type: i5.DataVizUiService }]; }, { closeButton: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmtzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvY29tcG9uZW50cy9ib29rbWFya3MvYm9va21hcmtzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvY29tcG9uZW50cy9ib29rbWFya3MvYm9va21hcmtzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXBFLE9BQU8sS0FBSyxTQUFTLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3dDakMsK0JBSUM7SUFDQyxpQ0FPRTtJQURBLHlQQUEwQztJQU41QyxpQkFPRTtJQUNGLGlDQUFtRTtJQUNqRSxZQUtGOztJQUFBLGlCQUFRO0lBQ1IsZ0NBQXlCO0lBQ3ZCLDZCQU9DO0lBSkMsaU9BQTZCO0lBSzdCLHlCQUlNO0lBQUMsaUJBQ1I7SUFBQSxrQkFDRDtJQUFBLDZCQU9DO0lBSkMsbU9BQStCO0lBSy9CLDBCQUlNO0lBQ1IsaUJBQUk7SUFDTixpQkFBTztJQUNULGlCQUFNOzs7O0lBL0NKLDhDQUE0QjtJQUkxQixlQUE2QjtJQUE3QixzREFBNkI7SUFDN0IseUZBQWdFO0lBSzlCLGVBQThCO0lBQTlCLHVEQUE4QjtJQUNoRSxlQUtGO0lBTEUscVJBS0Y7SUFN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NkQvQixlQUE2RDtRQUE3RCwrRUFBNkQ7UUFxQnpELGVBQTBCO1FBQTFCLDRDQUEwQjtRQW1DckIsZ0JBQStDO1FBQS9DLHdFQUErQztRQWlCaEQsZUFBZ0Q7UUFBaEQsc0VBQWdEOzt1RkR0S25ELGtCQUFrQjtjQUw5QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQzFDOzZMQXFCMkIsV0FBVztrQkFBcEMsU0FBUzttQkFBQyxhQUFhO1lBQ0MsVUFBVTtrQkFBbEMsU0FBUzttQkFBQyxZQUFZO1lBQ0ksWUFBWTtrQkFBdEMsU0FBUzttQkFBQyxjQUFjO1lBQ0UsWUFBWTtrQkFBdEMsU0FBUzttQkFBQyxjQUFjO1lBQ0UsWUFBWTtrQkFBdEMsU0FBUzttQkFBQyxjQUFjO1lBRWhCLFVBQVU7a0JBQWxCLEtBQUs7WUFDSSxJQUFJO2tCQUFiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFBvd2VyYmlCb29rbWFyayB9IGZyb20gJy4vLi4vLi4vY29tcG9uZW50cy9ib29rbWFya3MvYm9va21hcmtzLm1vZGVsJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQm9va21hcmtTZXJ2aWNlIH0gZnJvbSAnLi9ib29rbWFya3Muc2VydmljZSc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Db21wb25lbnQgfSBmcm9tICcuLy4uL3Zpc3VhbGl6YXRpb24vdmlzdWFsaXphdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb21tb24vY29yZS9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGFycmF5QXBpcyBmcm9tICcuLy4uLy4uL2NvbW1vbi91c2VmdWwtYXBpcy9hcnJheS1hcGlzJztcclxuaW1wb3J0IHsgU3ViamVjdCwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFNub3dwbG93U2VydmljZSB9IGZyb20gJy4vLi4vLi4vc25vd3Bsb3cvc25vd3Bsb3cuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVZpelVpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vZGF0YS12aXotdWkuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1ib29rbWFya3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ib29rbWFya3MuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Jvb2ttYXJrcy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb29rbWFya3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgc2VsZWN0ZWRCb29rbWFyazogUG93ZXJiaUJvb2ttYXJrID0geyBib29rbWFya05hbWU6ICdEZWZhdWx0IFZpZXcnIH0gYXMgUG93ZXJiaUJvb2ttYXJrO1xyXG4gIHNlYXJjaEJvb2ttYXJrOiBhbnk7XHJcbiAgdGl0bGUgPSAnZGF0YS12aXotdWknO1xyXG4gIGFsbEJvb2ttYXJrczogUG93ZXJiaUJvb2ttYXJrW10gPSBbXSBhcyBQb3dlcmJpQm9va21hcmtbXTtcclxuICBkZWZhdWx0Vmlld0Jvb2ttYXJrOiBhbnk7XHJcbiAgY3VycmVudFN0YXRlOiBQb3dlcmJpQm9va21hcmsgPSB7fSBhcyBQb3dlcmJpQm9va21hcms7XHJcbiAgZWRpdGVkQm9va21hcms6IFBvd2VyYmlCb29rbWFyayA9IHt9IGFzIFBvd2VyYmlCb29rbWFyaztcclxuICBjdXJyZW50RGVsZXRlQm9va21hcms6IGFueTtcclxuICBib29rbWFya0Zvcm06IGFueTtcclxuICBpc01vZGFsT3BlbiA9IGZhbHNlO1xyXG4gIGR1cGxpY2F0ZUJvb2ttYXJrOiBQb3dlcmJpQm9va21hcmsgPSB7fSBhcyBQb3dlcmJpQm9va21hcms7XHJcbiAgaXNEdXBsaWNhdGU6IGFueTtcclxuICBhcmVGaWx0ZXJzQ2hhbmdlZCA9IGZhbHNlO1xyXG4gIHVzZXI6IGFueTtcclxuICByb3V0ZWRFbGVtZW50OiBhbnk7XHJcbiAgc3RhdGVzOiBQb3dlcmJpQm9va21hcmtbXSA9IFtdO1xyXG4gIHNob3dTZXR0aW5ncyA9IGZhbHNlO1xyXG4gIHVuU3Vic2NyaWJlID0gbmV3IFN1YmplY3QoKTtcclxuICBISURFX1NFVFRJTkdTX0ZPUl9DTElFTlRfSURTID0gWyc1J107XHJcbiAgQFZpZXdDaGlsZCgnY2xvc2VCdXR0b24nKSBjbG9zZUJ1dHRvbiA9IHt9IGFzIGFueTtcclxuICBAVmlld0NoaWxkKCdzYXZlQnV0dG9uJykgc2F2ZUJ1dHRvbiA9IHt9IGFzIGFueTtcclxuICBAVmlld0NoaWxkKCdkZWxldGVCdXR0b24nKSBkZWxldGVCdXR0b24gPSB7fSBhcyBhbnk7XHJcbiAgQFZpZXdDaGlsZCgndXBkYXRlQnV0dG9uJykgdXBkYXRlQnV0dG9uID0ge30gYXMgYW55O1xyXG4gIEBWaWV3Q2hpbGQoJ21vZGFsT3ZlcmxheScpIG1vZGFsT3ZlcmxheTogRWxlbWVudFJlZiA9IHt9IGFzIGFueTtcclxuICAvLyBASW5wdXQoKSBzdGF0ZXM6IFBvd2VyYmlCb29rbWFya1tdO1xyXG4gIEBJbnB1dCgpIHZpc3VhbEVsZW06IFZpc3VhbGl6YXRpb25Db21wb25lbnQgPSB7fSBhcyBhbnk7XHJcbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBib29rbWFya1NlcnZpY2U6IEJvb2ttYXJrU2VydmljZSxcclxuICAgIHByaXZhdGUgbm90aWZpZXI6IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNub3dwbG93U2VydmljZTogU25vd3Bsb3dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHVibGljIGR2U2VydmljZTogRGF0YVZpelVpU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ09iamVjdCgpLnN1YnNjcmliZShjb25maWcgPT4ge1xyXG4gICAgICB0aGlzLmdldEJvb2ttYXJrcygpO1xyXG4gICAgICAvLyBUT0RPOiBuZWVkIHRvIHZlcmlmeVxyXG4gICAgICB0aGlzLnNub3dwbG93U2VydmljZS5ldmVudFRyYWNraW5nKCdsb2FkLWJvb2ttYXJrcycsICdsb2FkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmR2U2VydmljZS5nZXRUYXhvbm9teSgpLnN1YnNjcmliZSgoZGlzdHJpYnV0b3JUYXhvbm9teTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMub25UYXhvbm9teUNoYW5nZShkaXN0cmlidXRvclRheG9ub215KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWFyY2hCb29rbWFyayA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XHJcbiAgICB0aGlzLnN0YXRlcyA9IFtdO1xyXG4gICAgdGhpcy5ib29rbWFya0Zvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgYm9va21hcmtOYW1lOiBuZXcgRm9ybUNvbnRyb2woJycsIFtcclxuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgIFZhbGlkYXRvcnMucGF0dGVybignW2EtekEtWjAtOS4qXFwnLyAtXSonKSxcclxuICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKSxcclxuICAgICAgICBWYWxpZGF0b3JzLm1heExlbmd0aCgxNDApLFxyXG4gICAgICBdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5nZXRCb29rbWFya3MoKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAvLyBBcyBmaXJzdCBjbGljayBvZiBkcm9wZG93biBub3Qgd29ya2luZyAuLi4uIGhpbnQ6IGJvb3RzdHJhcCBtb2R1bGUgbG9hZGVkIHR3aWNlXHJcbiAgICAgIGNvbnN0IGRyb3Bkb3duQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcclxuICAgICAgICAnZHJvcGRvd24tYnRuJ1xyXG4gICAgICApWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBkcm9wZG93bkJ0bi5jbGljaygpO1xyXG4gICAgICBkcm9wZG93bkJ0bi5ibHVyKCk7XHJcbiAgICAgIHRoaXMudmlzdWFsRWxlbS5kZWZhdWx0Vmlldy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdmFsdWUudGhlbigoYm9va21hcms6IFBvd2VyYmlCb29rbWFyaykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kZWZhdWx0Vmlld0Jvb2ttYXJrID0gYm9va21hcms7XHJcbiAgICAgICAgICB0aGlzLmRlZmF1bHRWaWV3Qm9va21hcmsuYm9va21hcmtTdGF0ZSA9IGJvb2ttYXJrLnN0YXRlO1xyXG4gICAgICAgICAgdGhpcy5nZXREZWZhdWx0VmlldygpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhyb3dFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9XHJcblxyXG4gIGdldEJvb2ttYXJrcyhyZXBvcnROYW1lPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnZ2V0Qm9va21hcmtzIGNhbGxlZCcpO1xyXG4gICAgdGhpcy5ib29rbWFya1NlcnZpY2VcclxuICAgICAgLmdldEJvb2ttYXJrcyhyZXBvcnROYW1lKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy51blN1YnNjcmliZSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGJvb2ttYXJrczogUG93ZXJiaUJvb2ttYXJrW10pID0+IHtcclxuICAgICAgICB0aGlzLnNvcnRCb29rbWFya3MoYm9va21hcmtzKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBzb3J0Qm9va21hcmtzKGJvb2ttYXJrczogUG93ZXJiaUJvb2ttYXJrW10pOiB2b2lkIHtcclxuICAgIGlmIChib29rbWFya3MpIHtcclxuICAgICAgYm9va21hcmtzID0gYXJyYXlBcGlzLmRlZmF1bHQuc29ydChib29rbWFya3MsICdhbHBoYWJldGljJywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuc3RhdGVzID0gYm9va21hcmtzO1xyXG4gICAgICB0aGlzLmFsbEJvb2ttYXJrcyA9IGJvb2ttYXJrcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsb3NlRHJvcGRvd24oZXZlbnQ6IG9iamVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubW9kYWxPdmVybGF5ICYmICF0aGlzLm1vZGFsT3ZlcmxheS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblRheG9ub215Q2hhbmdlKHJlcG9ydE5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy52aXN1YWxFbGVtLmdldEVtYmVkVG9rZW4oJ25ldycsIHJlcG9ydE5hbWUpO1xyXG4gICAgdGhpcy5nZXRCb29rbWFya3MocmVwb3J0TmFtZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGlzdHJpYnV0b3JUYXhvbm9teScsIHJlcG9ydE5hbWUpO1xyXG4gIH1cclxuXHJcbiAgb25Cb29rbWFya1NlbGVjdChldmVudDogYW55LCBzdGF0ZTogUG93ZXJiaUJvb2ttYXJrKTogdm9pZCB7XHJcbiAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEJvb2ttYXJrID0gc3RhdGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFyZUZpbHRlcnNDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLnJlc2V0RHJvcGRvd24oKTtcclxuICAgIHRoaXMudmlzdWFsRWxlbS5sb2FkUmVwb3J0KHN0YXRlLCAnY3VzdG9tJyk7XHJcbiAgICAvLyBUT0RPOiBuZWVkIHRvIHZlcmlmeVxyXG4gICAgdGhpcy5zbm93cGxvd1NlcnZpY2UuZXZlbnRUcmFja2luZygnc2VsZWN0LWJvb2ttYXJrcycsICdjbGljaycsICdTZWxlY3RlZCBCb29rbWFyayBOYW1lJywgJycsIHN0YXRlLmJvb2ttYXJrTmFtZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgb25TZWFyY2hCb29rbWFyayhldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGFsbEJvb2ttYXJrcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxCb29rbWFya3MpKTtcclxuICAgIGNvbnN0IHNlYXJjaFZhbHVlID0gdGhpcy5zZWFyY2hCb29rbWFyay52YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKHNlYXJjaFZhbHVlICE9PSAnJykge1xyXG4gICAgICB0aGlzLnN0YXRlcyA9IGFsbEJvb2ttYXJrcy5maWx0ZXIoKGJvb2ttYXJrOiBQb3dlcmJpQm9va21hcmspID0+XHJcbiAgICAgICAgYm9va21hcmsuYm9va21hcmtOYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVmFsdWUpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuYWxsQm9va21hcmtzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Cb29rbWFya05hbWVDaGFuZ2UobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRHVwbGljYXRlID0gbmFtZS50cmltKCkgPT09IHRoaXMuZHVwbGljYXRlQm9va21hcms/LmJvb2ttYXJrTmFtZTtcclxuICB9XHJcblxyXG4gIHNhdmVCb29rbWFyayhkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5lZGl0ZWRCb29rbWFyaykge1xyXG4gICAgICB0aGlzLmNyZWF0ZUJvb2ttYXJrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwZGF0ZUJvb2ttYXJrTmFtZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQm9va21hcmsoKTogdm9pZCB7XHJcbiAgICBjb25zdCBib29rbWFya05hbWUgPSB0aGlzLmJvb2ttYXJrRm9ybS5jb250cm9scy5ib29rbWFya05hbWUudmFsdWU7XHJcbiAgICBjb25zdCBkdXBsaWNhdGUgPSB0aGlzLmFsbEJvb2ttYXJrcy5maW5kKFxyXG4gICAgICAoYm9va21hcmspID0+IGJvb2ttYXJrLmJvb2ttYXJrTmFtZSA9PT0gYm9va21hcmtOYW1lXHJcbiAgICApO1xyXG4gICAgaWYgKGR1cGxpY2F0ZSkge1xyXG4gICAgICB0aGlzLmR1cGxpY2F0ZUJvb2ttYXJrID0gZHVwbGljYXRlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZHVwbGljYXRlQm9va21hcmspIHtcclxuICAgICAgdGhpcy5pc0R1cGxpY2F0ZSA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vdGlmaWVyLm5vdGlmeSh7XHJcbiAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBzYXZlIHZpZXcuIEEgdmlldyB3aXRoIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0cyEnLFxyXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpc3VhbEVsZW0uZ2V0Qm9va21hcmtTdGF0ZSgnc2F2ZScpLnRoZW4oKHN0YXRlOiBQb3dlcmJpQm9va21hcmspID0+IHtcclxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUuYm9va21hcmtOYW1lID0gYm9va21hcmtOYW1lO1xyXG4gICAgICB0aGlzLmNsb3NlQnV0dG9uLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcclxuICAgICAgdGhpcy5ib29rbWFya0Zvcm0uY29udHJvbHMuYm9va21hcmtOYW1lLnNldFZhbHVlKCcnKTtcclxuICAgICAgdGhpcy5ib29rbWFya1NlcnZpY2VcclxuICAgICAgICAuY3JlYXRlQm9va21hcmsodGhpcy5jdXJyZW50U3RhdGUpXHJcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMudW5TdWJzY3JpYmUpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKGJvb2ttYXJrOiBQb3dlcmJpQm9va21hcmspID0+IHtcclxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlQ3JlYXRlQm9va21hcmsoYm9va21hcmspO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAvLyBUcmFjayBjcmVhdGUgYm9va21hcmsgZXZlbnRcclxuICAgICAgdGhpcy5zbm93cGxvd1NlcnZpY2UuZXZlbnRUcmFja2luZygnY3JlYXRlLWJvb2ttYXJrJywgJ2NsaWNrJywgJ2Jvb2ttYXJrTmFtZScsICcnLCBib29rbWFya05hbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVDcmVhdGVCb29rbWFyayhib29rbWFyazogUG93ZXJiaUJvb2ttYXJrKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YXRlcyA9IGFycmF5QXBpcy5kZWZhdWx0LnNvcnQodGhpcy5zdGF0ZXMsICdhbHBoYWJldGljJywgdHJ1ZSk7XHJcbiAgICB0aGlzLnN0YXRlcy51bnNoaWZ0KGJvb2ttYXJrKTtcclxuICAgIHRoaXMuc3RhdGVzID0gWy4uLnRoaXMuc3RhdGVzXTtcclxuICAgIHRoaXMuYWxsQm9va21hcmtzID0gWy4uLnRoaXMuc3RhdGVzXTtcclxuICAgIGlmIChib29rbWFyaykge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQm9va21hcmsgPSBib29rbWFyaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUJvb2ttYXJrKCk6IHZvaWQge1xyXG4gICAgdGhpcy52aXN1YWxFbGVtLmdldEJvb2ttYXJrU3RhdGUoJ3NhdmUnKS50aGVuKChib29rbWFyazogUG93ZXJiaUJvb2ttYXJrKSA9PiB7XHJcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkQm9va21hcmspKTtcclxuICAgICAgaWYgKGJvb2ttYXJrLnN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUuYm9va21hcmtTdGF0ZSA9IGJvb2ttYXJrLnN0YXRlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYm9va21hcmtTZXJ2aWNlXHJcbiAgICAgICAgLnVwZGF0ZUJvb2ttYXJrKHRoaXMuY3VycmVudFN0YXRlKVxyXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLnVuU3Vic2NyaWJlKSlcclxuICAgICAgICAuc3Vic2NyaWJlKChib29rbWFya1Jlc3A6IFBvd2VyYmlCb29rbWFyaykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVVcGRhdGVCb29rbWFyayhib29rbWFya1Jlc3ApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyBUcmFjayB1cGRhdGUgYm9va21hcmsgZXZlbnRcclxuICAgIHRoaXMuc25vd3Bsb3dTZXJ2aWNlLmV2ZW50VHJhY2tpbmcoJ3VwZGF0ZS1ib29rbWFyaycsICdjbGljaycsICdib29rbWFya05hbWUnLCAnJywgdGhpcy5zZWxlY3RlZEJvb2ttYXJrLmJvb2ttYXJrTmFtZSk7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVVcGRhdGVCb29rbWFyayhib29rbWFyazogUG93ZXJiaUJvb2ttYXJrKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEJvb2ttYXJrID0gdGhpcy5hbGxCb29rbWFya3MuZmluZChia21rID0+IGJrbWsuYm9va21hcmtOYW1lID09PSB0aGlzLnNlbGVjdGVkQm9va21hcmsuYm9va21hcmtOYW1lKTtcclxuICAgIGlmIChzZWxlY3RlZEJvb2ttYXJrKSB7XHJcbiAgICAgIHNlbGVjdGVkQm9va21hcmsuYm9va21hcmtTdGF0ZSA9IGJvb2ttYXJrLmJvb2ttYXJrU3RhdGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlcyA9IHRoaXMuYWxsQm9va21hcmtzO1xyXG4gICAgdGhpcy51cGRhdGVCdXR0b24ubmF0aXZlRWxlbWVudC5jbGljaygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQm9va21hcmtOYW1lKCk6IHZvaWQge1xyXG4gICAgY29uc3QgbmFtZSA9IHRoaXMuYm9va21hcmtGb3JtLmNvbnRyb2xzLmJvb2ttYXJrTmFtZS52YWx1ZTtcclxuICAgIGNvbnN0IGR1cGxpY2F0ZSA9IHRoaXMuYWxsQm9va21hcmtzLmZpbmQoXHJcbiAgICAgIChib29rbWFyaykgPT4gYm9va21hcmsuYm9va21hcmtOYW1lID09PSBuYW1lXHJcbiAgICApO1xyXG4gICAgaWYgKGR1cGxpY2F0ZSkge1xyXG4gICAgICB0aGlzLmR1cGxpY2F0ZUJvb2ttYXJrID0gZHVwbGljYXRlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZHVwbGljYXRlQm9va21hcmspIHtcclxuICAgICAgdGhpcy5pc0R1cGxpY2F0ZSA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vdGlmaWVyLm5vdGlmeSh7XHJcbiAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byB1cGRhdGUgdmlldy4gQSB2aWV3IHdpdGggc2FtZSBuYW1lIGV4aXN0cyEnLFxyXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXFPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZWRpdGVkQm9va21hcmspKTtcclxuICAgIHJlcU9iai5ib29rbWFya05hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib29rbWFya1NlcnZpY2VcclxuICAgICAgLnVwZGF0ZUJvb2ttYXJrKHJlcU9iailcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMudW5TdWJzY3JpYmUpKVxyXG4gICAgICAuc3Vic2NyaWJlKChib29rbWFyazogUG93ZXJiaUJvb2ttYXJrKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVVcGRhdGVCb29rbWFya05hbWUoYm9va21hcmssIG5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgIC8vIFRyYWNrIHVwZGF0ZSBib29rbWFyayBldmVudFxyXG4gICAgdGhpcy5zbm93cGxvd1NlcnZpY2UuZXZlbnRUcmFja2luZygndXBkYXRlLWJvb2ttYXJrJywgJ2NsaWNrJywgJ2Jvb2ttYXJrTmFtZScsICcnLCByZXFPYmouYm9va21hcmtOYW1lKTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZVVwZGF0ZUJvb2ttYXJrTmFtZShib29rbWFyazogUG93ZXJiaUJvb2ttYXJrLCB1cGRhdGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5lZGl0ZWRCb29rbWFyay5ib29rbWFya05hbWUgPT09XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRCb29rbWFyay5ib29rbWFya05hbWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQm9va21hcmsuYm9va21hcmtOYW1lID0gdXBkYXRlTmFtZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGVkaXRlZEJvb2ttYXJrID0gdGhpcy5hbGxCb29rbWFya3MuZmluZChia21rID0+IGJrbWsuYm9va21hcmtOYW1lID09PSB0aGlzLmVkaXRlZEJvb2ttYXJrLmJvb2ttYXJrTmFtZSk7XHJcbiAgICBpZiAoZWRpdGVkQm9va21hcmspIHtcclxuICAgICAgZWRpdGVkQm9va21hcmsuYm9va21hcmtOYW1lID0gdXBkYXRlTmFtZTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGVzID0gdGhpcy5hbGxCb29rbWFya3M7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcclxuICAgIHRoaXMuYm9va21hcmtGb3JtLmNvbnRyb2xzLmJvb2ttYXJrTmFtZS5zZXRWYWx1ZSgnJyk7XHJcbiAgfVxyXG5cclxuICBlZGl0Qm9va21hcmsoYm9va21hcms6IFBvd2VyYmlCb29rbWFyayk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYm9va21hcmtGb3JtICYmIHRoaXMuYm9va21hcmtGb3JtLmNvbnRyb2xzKSB7XHJcbiAgICAgIHRoaXMuYm9va21hcmtGb3JtLmNvbnRyb2xzLmJvb2ttYXJrTmFtZS5zZXRWYWx1ZShib29rbWFyay5ib29rbWFya05hbWUpO1xyXG4gICAgICB0aGlzLmVkaXRlZEJvb2ttYXJrID0gYm9va21hcms7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVCb29rbWFyayhib29rbWFyazogUG93ZXJiaUJvb2ttYXJrKTogdm9pZCB7XHJcbiAgICB0aGlzLmN1cnJlbnREZWxldGVCb29rbWFyayA9IGJvb2ttYXJrO1xyXG4gIH1cclxuICBjb25maXJtRGVsZXRlQm9va21hcmsoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlbGV0ZUJ1dHRvbi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XHJcbiAgICB0aGlzLmJvb2ttYXJrU2VydmljZVxyXG4gICAgICAuZGVsZXRlQm9va21hcmsodGhpcy5jdXJyZW50RGVsZXRlQm9va21hcmspXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLnVuU3Vic2NyaWJlKSlcclxuICAgICAgLnN1YnNjcmliZSgoYm9va21hcmtOYW1lOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZUNvbmZpcm1EZWxldGVCb29rbWFyaygpO1xyXG4gICAgICB9KTtcclxuICAgIC8vIFRyYWNrIGRlbGV0ZSBib29rbWFyayBldmVudFxyXG4gICAgdGhpcy5zbm93cGxvd1NlcnZpY2UuZXZlbnRUcmFja2luZygnZGVsZXRlLWJvb2ttYXJrJywgJ2NsaWNrJywgJ2Jvb2ttYXJrTmFtZScsICcnLCB0aGlzLnNlbGVjdGVkQm9va21hcmsuYm9va21hcmtOYW1lKTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZUNvbmZpcm1EZWxldGVCb29rbWFyaygpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5jdXJyZW50RGVsZXRlQm9va21hcmsuYm9va21hcmtOYW1lID09PVxyXG4gICAgICB0aGlzLnNlbGVjdGVkQm9va21hcmsuYm9va21hcmtOYW1lXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5nZXREZWZhdWx0VmlldygpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhdGVzID0gdGhpcy5zdGF0ZXMuZmlsdGVyKFxyXG4gICAgICAoYm9va21hcmspID0+XHJcbiAgICAgICAgYm9va21hcmsuYm9va21hcmtOYW1lICE9PSB0aGlzLmN1cnJlbnREZWxldGVCb29rbWFyay5ib29rbWFya05hbWVcclxuICAgICk7XHJcbiAgICB0aGlzLnN0YXRlcyA9IHN0YXRlcztcclxuICAgIHRoaXMuYWxsQm9va21hcmtzID0gc3RhdGVzO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VNb2RhbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWRpdGVkQm9va21hcmsgPSB1bmRlZmluZWQgYXMgYW55O1xyXG4gICAgdGhpcy5ib29rbWFya0Zvcm0ucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0RHJvcGRvd24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBkcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Ryb3Bkb3duLW1lbnUnKVswXTtcclxuICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHRoaXMubW9kYWxPdmVybGF5Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcclxuICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIHRoaXMuc2VhcmNoQm9va21hcmsuc2V0VmFsdWUoJycpO1xyXG4gICAgdGhpcy5zdGF0ZXMgPSB0aGlzLmFsbEJvb2ttYXJrcztcclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWaWV3KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZEJvb2ttYXJrID0geyBib29rbWFya05hbWU6ICdEZWZhdWx0IFZpZXcnIH0gYXMgUG93ZXJiaUJvb2ttYXJrO1xyXG4gICAgdGhpcy5hcmVGaWx0ZXJzQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy52aXN1YWxFbGVtLmxvYWRSZXBvcnQodGhpcy5kZWZhdWx0Vmlld0Jvb2ttYXJrLCAnZGVmYXVsdCcpO1xyXG4gICAgY29uc3QgZGVmYXVsdFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVmYXVsdCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBkZWZhdWx0Vmlldy5jaGVja2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHNhdmVWaWV3KCk6IHZvaWQgeyB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy51blN1YnNjcmliZS5uZXh0KCk7XHJcbiAgICB0aGlzLnVuU3Vic2NyaWJlLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICA8ZGl2IGNsYXNzPVwidy0xMDAgc2hvdyBjb2wteGwtMTIgYm9va21hcmstZHJvcGRvd25cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzPVwiYnRuIGRyb3Bkb3duLWJ0biBkcm9wZG93bi10b2dnbGUgY29sLXhsLTIgbXQxMFwiXHJcbiAgICAgICAgaWQ9XCJkcm9wZG93bk1lbnVcIlxyXG4gICAgICAgIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxyXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcclxuICAgICAgICBbdGl0bGVdPVwic2VsZWN0ZWRCb29rbWFyaz8uYm9va21hcmtOYW1lXCJcclxuICAgICAgICBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXHJcbiAgICAgID5cclxuICAgICAgICB7e1xyXG4gICAgICAgICAgc2VsZWN0ZWRCb29rbWFyaz8uYm9va21hcmtOYW1lPy5sZW5ndGghID4gMTJcclxuICAgICAgICAgICAgPyAoc2VsZWN0ZWRCb29rbWFyaz8uYm9va21hcmtOYW1lISB8IHNsaWNlOiAwOjEyKSArIFwiLi4uXCJcclxuICAgICAgICAgICAgOiBzZWxlY3RlZEJvb2ttYXJrPy5ib29rbWFya05hbWUhXHJcbiAgICAgICAgfX1cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBhcHBEcm9wZG93blN0YXR1c0xpc3RlbmVyXHJcbiAgICAgICAgKGNsb3NlKT1cImNsb3NlRHJvcGRvd24oJGV2ZW50KVwiXHJcbiAgICAgICAgaWQ9XCJkcm9wZG93bk1lbnVcIlxyXG4gICAgICAgICNtb2RhbE92ZXJsYXlcclxuICAgICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnUgY29sLXhsLTRcIlxyXG4gICAgICAgIHJvbGU9XCJtZW51XCJcclxuICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gY3VzdG9tLWNvbnRyb2wgY3VzdG9tLXJhZGlvIGRlZmF1bHQtdmlld1wiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJnZXREZWZhdWx0VmlldygpXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcclxuICAgICAgICAgICAgICBpZD1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgIG5hbWU9XCJmaWx0ZXJHcm91cFJhZGlvc1wiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiXHJcbiAgICAgICAgICAgICAgY2hlY2tlZFxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbFwiIGZvcj1cImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgID5EZWZhdWx0IFZpZXc8L2xhYmVsXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XHJcbiAgICAgICAgICA8aDY+TXkgU2F2ZWQgQ3JpdGVyaWE8L2g2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cInNlYXJjaEJvb2ttYXJrXCJcclxuICAgICAgICAgICAgICAoa2V5dXApPVwib25TZWFyY2hCb29rbWFyaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCB2aWV3c1wiXHJcbiAgICAgICAgICAgICAgaWQ9XCJzZWFyY2hCb29rbWFya1wiXHJcbiAgICAgICAgICAgICAgbmFtZT1cInNlYXJjaEJvb2ttYXJrXCJcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJzZWFyY2hCb29rbWFya1wiXHJcbiAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBjdXN0b20tY29udHJvbCBjdXN0b20tcmFkaW9cIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgc3RhdGUgb2Ygc3RhdGVzXCJcclxuICAgICAgICAgICAgW3RpdGxlXT1cInN0YXRlLmJvb2ttYXJrTmFtZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXHJcbiAgICAgICAgICAgICAgaWQ9XCJ7eyBzdGF0ZS5ib29rbWFya05hbWUgfX1cIlxyXG4gICAgICAgICAgICAgIFtjaGVja2VkXT1cInN0YXRlLmJvb2ttYXJrTmFtZSA9PT0gc2VsZWN0ZWRCb29rbWFyay5ib29rbWFya05hbWVcIlxyXG4gICAgICAgICAgICAgIG5hbWU9XCJmaWx0ZXJHcm91cFJhZGlvc1wiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiXHJcbiAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkJvb2ttYXJrU2VsZWN0KCRldmVudCwgc3RhdGUpXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtbGFiZWxcIiBmb3I9XCJ7eyBzdGF0ZS5ib29rbWFya05hbWUgfX1cIj5cclxuICAgICAgICAgICAgICB7e1xyXG4gICAgICAgICAgICAgICAgc3RhdGU/LmJvb2ttYXJrTmFtZT8ubGVuZ3RoISA+IDI0XHJcbiAgICAgICAgICAgICAgICAgID8gKHN0YXRlPy5ib29rbWFya05hbWUhIHwgc2xpY2U6IDA6MjQpICsgXCIuLi5cIlxyXG4gICAgICAgICAgICAgICAgICA6IHN0YXRlPy5ib29rbWFya05hbWUhXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cIlwiXHJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIkVkaXRcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImVkaXRCb29rbWFyayhzdGF0ZSlcIlxyXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXRlLmJvb2ttYXJrTmFtZSA9PT0gc2VsZWN0ZWRCb29rbWFyay5ib29rbWFya05hbWUgPyAwIDogLTFcclxuICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGVtXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZmEgZmEtZWRpdFwiXHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIlxyXG4gICAgICAgICAgICAgICAgICBkYXRhLXRhcmdldD1cIiNleGFtcGxlTW9kYWxDZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgPjwvZW0+IDwvYVxyXG4gICAgICAgICAgICAgID58XHJcbiAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cIlwiXHJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIkRlbGV0ZVwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiZGVsZXRlQm9va21hcmsoc3RhdGUpXCJcclxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIlxyXG4gICAgICAgICAgICAgICAgICBzdGF0ZS5ib29rbWFya05hbWUgPT09IHNlbGVjdGVkQm9va21hcmsuYm9va21hcmtOYW1lID8gMCA6IC0xXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxlbVxyXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImZhIGZhLXRyYXNoXCJcclxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJtb2RhbFwiXHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtdGFyZ2V0PVwiI2RlbGV0ZUJvb2ttYXJrXCJcclxuICAgICAgICAgICAgICAgID48L2VtPlxyXG4gICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgbXQxMCBzYXZlLXZpZXdcIlxyXG4gICAgICAgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIlxyXG4gICAgICAgIGRhdGEtdGFyZ2V0PVwiI2V4YW1wbGVNb2RhbENlbnRlclwiXHJcbiAgICAgICAgI3NhdmVCdXR0b25cclxuICAgICAgPlxyXG4gICAgICAgIFNhdmUgVmlldyBBc1xyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIFtkaXNhYmxlZF09XCJzZWxlY3RlZEJvb2ttYXJrLmJvb2ttYXJrTmFtZSA9PT0gJ0RlZmF1bHQgVmlldydcIlxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgbXQxMCBzYXZlLXZpZXdcIlxyXG4gICAgICAgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIlxyXG4gICAgICAgIGRhdGEtdGFyZ2V0PVwiI3VwZGF0ZUJvb2ttYXJrXCJcclxuICAgICAgPlxyXG4gICAgICAgIFVwZGF0ZSBWaWV3XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tIFNhdmUgYm9va21hcmsgcmVsYXRlZCBtb2RhbCAtLT5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJtb2RhbCBmYWRlXCJcclxuICAgICAgaWQ9XCJleGFtcGxlTW9kYWxDZW50ZXJcIlxyXG4gICAgICAjYm9va21hcmtNb2RhbFxyXG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXHJcbiAgICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZFwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IGJvb2ttYXJrLW1vZGFsXCI+XHJcbiAgICAgICAgICA8Zm9ybVxyXG4gICAgICAgICAgICBuYW1lPVwiYm9va21hcmtGb3JtXCJcclxuICAgICAgICAgICAgW2Zvcm1Hcm91cF09XCJib29rbWFya0Zvcm1cIlxyXG4gICAgICAgICAgICAobmdTdWJtaXQpPVwic2F2ZUJvb2ttYXJrKCRldmVudClcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsQ2VudGVyVGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgPlNhdmUgY3VycmVudCB2aWV3PC9zcGFuXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjbG9zZVwiXHJcbiAgICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2VcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiXHJcbiAgICAgICAgICAgICAgICAjY2xvc2VCdXR0b25cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpdmlkZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImV4YW1wbGVJbnB1dEVtYWlsMVwiPlZpZXcgbmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAjbmFtZVxyXG4gICAgICAgICAgICAgICAgICAoa2V5dXApPVwib25Cb29rbWFya05hbWVDaGFuZ2UobmFtZS52YWx1ZSlcIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImJvb2ttYXJrTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgIGlkPVwiZXhhbXBsZUlucHV0RW1haWwxXCJcclxuICAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cImVtYWlsSGVscFwiXHJcbiAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1lcnJvclwiXHJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImJvb2ttYXJrRm9ybS5kaXJ0eSAmJiAhYm9va21hcmtGb3JtLnZhbGlkXCJcclxuICAgICAgICAgICAgICAgID5QbGVhc2UgZW50ZXIgbmFtZSBjb250YWluaW5nIGFscGhhYmV0cywgbnVtYmVycyBhbmQgc3BlY2lhbFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVycyAuKi0vJy4gTGVuZ3RoIHNob3VsZCBiZXR3ZWVuIDMgYW5kIDE0MFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVycyE8L3NwYW5cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjbG9zZU1vZGFsKClcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImJvb2ttYXJrRm9ybS5pbnZhbGlkIHx8IGlzRHVwbGljYXRlXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICBTYXZlXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwibW9kYWwgZmFkZVwiXHJcbiAgICBpZD1cImRlbGV0ZUJvb2ttYXJrXCJcclxuICAgICNib29rbWFya01vZGFsXHJcbiAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXHJcbiAgICByb2xlPVwiZGlhbG9nXCJcclxuICA+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZFwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxDZW50ZXJUaXRsZVwiPkRlbGV0ZSBWaWV3PC9oNT5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiY2xvc2VcIlxyXG4gICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJDbG9zZVwiXHJcbiAgICAgICAgICAgICNkZWxldGVCdXR0b25cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+QXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHZpZXc/PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcbiAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJjb25maXJtRGVsZXRlQm9va21hcmsoKVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIERlbGV0ZVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJtb2RhbCBmYWRlXCJcclxuICAgIGlkPVwidXBkYXRlQm9va21hcmtcIlxyXG4gICAgI2Jvb2ttYXJrTW9kYWxcclxuICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcclxuICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gID5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgPGg1IGNsYXNzPVwibW9kYWwtdGl0bGVcIiBpZD1cInVwZGF0ZUJvb2ttYXJrXCI+VXBkYXRlIFZpZXc8L2g1PlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJjbG9zZVwiXHJcbiAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkNsb3NlXCJcclxuICAgICAgICAgICAgI3VwZGF0ZUJ1dHRvblxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gdXBkYXRlIHRoaXMgdmlldz88L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cInVwZGF0ZUJvb2ttYXJrKClcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICBVcGRhdGVcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19