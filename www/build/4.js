webpackJsonp([4,108],{

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu", function() { return Menu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu_button", function() { return MenuButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu_controller", function() { return MenuController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_menu_toggle", function() { return MenuToggle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chunk_1074393c_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chunk_ba834eff_js__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index_3a9dcfed_js__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__ = __webpack_require__(765);
var _this = this;






var Menu = /** @class */ (function () {
    function Menu(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.lastOnEnd = 0;
        this.blocker = __WEBPACK_IMPORTED_MODULE_4__index_3a9dcfed_js__["GESTURE_CONTROLLER"].createBlocker({ disableScroll: true });
        this.mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        this.isAnimating = false;
        this._isOpen = false;
        this.isPaneVisible = false;
        this.isEndSide = false;
        /**
         * If `true`, the menu is disabled.
         */
        this.disabled = false;
        /**
         * Which side of the view the menu should be placed.
         */
        this.side = 'start';
        /**
         * If `true`, swiping the menu is enabled.
         */
        this.swipeGesture = true;
        /**
         * The edge threshold for dragging the menu open.
         * If a drag/swipe happens over this value, the menu is not triggered.
         */
        this.maxEdgeStart = 50;
        this.ionWillOpen = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionWillOpen", 7);
        this.ionWillClose = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionWillClose", 7);
        this.ionDidOpen = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionDidOpen", 7);
        this.ionDidClose = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionDidClose", 7);
        this.ionMenuChange = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionMenuChange", 7);
        this.lazyMenuCtrl = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["l" /* k */])(this, "ion-menu-controller");
    }
    Menu.prototype.typeChanged = function (type, oldType) {
        var contentEl = this.contentEl;
        if (contentEl) {
            if (oldType !== undefined) {
                contentEl.classList.remove("menu-content-" + oldType);
            }
            contentEl.classList.add("menu-content-" + type);
            contentEl.removeAttribute('style');
        }
        if (this.menuInnerEl) {
            // Remove effects of previous animations
            this.menuInnerEl.removeAttribute('style');
        }
        this.animation = undefined;
    };
    Menu.prototype.disabledChanged = function () {
        this.updateState();
        this.ionMenuChange.emit({
            disabled: this.disabled,
            open: this._isOpen
        });
    };
    Menu.prototype.sideChanged = function () {
        this.isEndSide = Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["h" /* i */])(this.side);
    };
    Menu.prototype.swipeGestureChanged = function () {
        this.updateState();
    };
    Menu.prototype.componentWillLoad = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuCtrl, _a, el, parent, content, _b;
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.type === undefined) {
                            this.type = __WEBPACK_IMPORTED_MODULE_2__chunk_1074393c_js__["b"].get('menuType', this.mode === 'ios' ? 'reveal' : 'overlay');
                        }
                        _a = this;
                        return [4 /*yield*/, this.lazyMenuCtrl.componentOnReady().then(function (p) { return p._getInstance(); })];
                    case 1:
                        menuCtrl = _a.menuCtrl = _c.sent();
                        el = this.el;
                        parent = el.parentNode;
                        content = this.contentId !== undefined
                            ? document.getElementById(this.contentId)
                            : parent && parent.querySelector && parent.querySelector('[main]');
                        if (!content || !content.tagName) {
                            // requires content element
                            console.error('Menu: must have a "content" element to listen for drag events on.');
                            return [2 /*return*/];
                        }
                        this.contentEl = content;
                        // add menu's content classes
                        content.classList.add('menu-content');
                        this.typeChanged(this.type, undefined);
                        this.sideChanged();
                        // register this menu with the app's menu controller
                        menuCtrl._register(this);
                        _b = this;
                        return [4 /*yield*/, new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 766))];
                    case 2:
                        _b.gesture = (_c.sent()).createGesture({
                            el: document,
                            gestureName: 'menu-swipe',
                            gesturePriority: 30,
                            threshold: 10,
                            canStart: function (ev) { return _this.canStart(ev); },
                            onWillStart: function () { return _this.onWillStart(); },
                            onStart: function () { return _this.onStart(); },
                            onMove: function (ev) { return _this.onMove(ev); },
                            onEnd: function (ev) { return _this.onEnd(ev); },
                        });
                        this.updateState();
                        return [2 /*return*/];
                }
            });
        });
    };
    Menu.prototype.componentDidLoad = function () {
        this.ionMenuChange.emit({ disabled: this.disabled, open: this._isOpen });
    };
    Menu.prototype.componentDidUnload = function () {
        this.blocker.destroy();
        this.menuCtrl._unregister(this);
        if (this.animation) {
            this.animation.destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        this.animation = undefined;
        this.contentEl = this.backdropEl = this.menuInnerEl = undefined;
    };
    Menu.prototype.onSplitPaneChanged = function (ev) {
        this.isPaneVisible = ev.detail.isPane(this.el);
        this.updateState();
    };
    Menu.prototype.onBackdropClick = function (ev) {
        if (this._isOpen && this.lastOnEnd < ev.timeStamp - 100) {
            var shouldClose = (ev.composedPath)
                ? !ev.composedPath().includes(this.menuInnerEl)
                : false;
            if (shouldClose) {
                ev.preventDefault();
                ev.stopPropagation();
                this.close();
            }
        }
    };
    /**
     * Returns `true` is the menu is open.
     */
    Menu.prototype.isOpen = function () {
        return Promise.resolve(this._isOpen);
    };
    /**
     * Returns `true` is the menu is active.
     *
     * A menu is active when it can be opened or closed, meaning it's enabled
     * and it's not part of a `ion-split-pane`.
     */
    Menu.prototype.isActive = function () {
        return Promise.resolve(this._isActive());
    };
    /**
     * Opens the menu. If the menu is already open or it can't be opened,
     * it returns `false`.
     */
    Menu.prototype.open = function (animated) {
        if (animated === void 0) { animated = true; }
        return this.setOpen(true, animated);
    };
    /**
     * Closes the menu. If the menu is already closed or it can't be closed,
     * it returns `false`.
     */
    Menu.prototype.close = function (animated) {
        if (animated === void 0) { animated = true; }
        return this.setOpen(false, animated);
    };
    /**
     * Toggles the menu. If the menu is already open, it will try to close, otherwise it will try to open it.
     * If the operation can't be completed successfully, it returns `false`.
     */
    Menu.prototype.toggle = function (animated) {
        if (animated === void 0) { animated = true; }
        return this.setOpen(!this._isOpen, animated);
    };
    /**
     * Opens or closes the button.
     * If the operation can't be completed successfully, it returns `false`.
     */
    Menu.prototype.setOpen = function (shouldOpen, animated) {
        if (animated === void 0) { animated = true; }
        return this.menuCtrl._setOpen(this, shouldOpen, animated);
    };
    Menu.prototype._setOpen = function (shouldOpen, animated) {
        if (animated === void 0) { animated = true; }
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If the menu is disabled or it is currently being animated, let's do nothing
                        if (!this._isActive() || this.isAnimating || shouldOpen === this._isOpen) {
                            return [2 /*return*/, false];
                        }
                        this.beforeAnimation(shouldOpen);
                        return [4 /*yield*/, this.loadAnimation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.startAnimation(shouldOpen, animated)];
                    case 2:
                        _a.sent();
                        this.afterAnimation(shouldOpen);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Menu.prototype.loadAnimation = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var width, _a;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        width = this.menuInnerEl.offsetWidth;
                        if (width === this.width && this.animation !== undefined) {
                            return [2 /*return*/];
                        }
                        this.width = width;
                        // Destroy existing animation
                        if (this.animation) {
                            this.animation.destroy();
                            this.animation = undefined;
                        }
                        // Create new animation
                        _a = this;
                        return [4 /*yield*/, this.menuCtrl._createAnimation(this.type, this)];
                    case 1:
                        // Create new animation
                        _a.animation = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Menu.prototype.startAnimation = function (shouldOpen, animated) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var ani;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ani = this.animation.reverse(!shouldOpen);
                        if (!animated) return [3 /*break*/, 2];
                        return [4 /*yield*/, ani.playAsync()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ani.playSync();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Menu.prototype._isActive = function () {
        return !this.disabled && !this.isPaneVisible;
    };
    Menu.prototype.canSwipe = function () {
        return this.swipeGesture && !this.isAnimating && this._isActive();
    };
    Menu.prototype.canStart = function (detail) {
        if (!this.canSwipe()) {
            return false;
        }
        if (this._isOpen) {
            return true;
            // TODO error
        }
        else if (this.menuCtrl.getOpenSync()) {
            return false;
        }
        return checkEdgeSide(window, detail.currentX, this.isEndSide, this.maxEdgeStart);
    };
    Menu.prototype.onWillStart = function () {
        this.beforeAnimation(!this._isOpen);
        return this.loadAnimation();
    };
    Menu.prototype.onStart = function () {
        if (!this.isAnimating || !this.animation) {
            Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["b"])(false, 'isAnimating has to be true');
            return;
        }
        // the cloned animation should not use an easing curve during seek
        this.animation.reverse(this._isOpen).progressStart();
    };
    Menu.prototype.onMove = function (detail) {
        if (!this.isAnimating || !this.animation) {
            Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["b"])(false, 'isAnimating has to be true');
            return;
        }
        var delta = computeDelta(detail.deltaX, this._isOpen, this.isEndSide);
        var stepValue = delta / this.width;
        this.animation.progressStep(stepValue);
    };
    Menu.prototype.onEnd = function (detail) {
        var _this = this;
        if (!this.isAnimating || !this.animation) {
            Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["b"])(false, 'isAnimating has to be true');
            return;
        }
        var isOpen = this._isOpen;
        var isEndSide = this.isEndSide;
        var delta = computeDelta(detail.deltaX, isOpen, isEndSide);
        var width = this.width;
        var stepValue = delta / width;
        var velocity = detail.velocityX;
        var z = width / 2.0;
        var shouldCompleteRight = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        var shouldCompleteLeft = velocity <= 0 && (velocity < -0.2 || detail.deltaX < -z);
        var shouldComplete = isOpen
            ? isEndSide ? shouldCompleteRight : shouldCompleteLeft
            : isEndSide ? shouldCompleteLeft : shouldCompleteRight;
        var shouldOpen = !isOpen && shouldComplete;
        if (isOpen && !shouldComplete) {
            shouldOpen = true;
        }
        var missing = shouldComplete ? 1 - stepValue : stepValue;
        var missingDistance = missing * width;
        var realDur = 0;
        if (missingDistance > 5) {
            var dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        this.lastOnEnd = detail.timeStamp;
        this.animation
            .onFinish(function () { return _this.afterAnimation(shouldOpen); }, {
            clearExistingCallbacks: true,
            oneTimeCallback: true
        })
            .progressEnd(shouldComplete, stepValue, realDur);
    };
    Menu.prototype.beforeAnimation = function (shouldOpen) {
        Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["b"])(!this.isAnimating, '_before() should not be called while animating');
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        this.el.classList.add(SHOW_MENU);
        if (this.backdropEl) {
            this.backdropEl.classList.add(SHOW_BACKDROP);
        }
        this.blocker.block();
        this.isAnimating = true;
        if (shouldOpen) {
            this.ionWillOpen.emit();
        }
        else {
            this.ionWillClose.emit();
        }
    };
    Menu.prototype.afterAnimation = function (isOpen) {
        Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["b"])(this.isAnimating, '_before() should be called while animating');
        // keep opening/closing the menu disabled for a touch more yet
        // only add listeners/css if it's enabled and isOpen
        // and only remove listeners/css if it's not open
        // emit opened/closed events
        this._isOpen = isOpen;
        this.isAnimating = false;
        if (!this._isOpen) {
            this.blocker.unblock();
        }
        if (isOpen) {
            // add css class
            if (this.contentEl) {
                this.contentEl.classList.add(MENU_CONTENT_OPEN);
            }
            // emit open event
            this.ionDidOpen.emit();
        }
        else {
            // remove css classes
            this.el.classList.remove(SHOW_MENU);
            if (this.contentEl) {
                this.contentEl.classList.remove(MENU_CONTENT_OPEN);
            }
            if (this.backdropEl) {
                this.backdropEl.classList.remove(SHOW_BACKDROP);
            }
            // emit close event
            this.ionDidClose.emit();
        }
    };
    Menu.prototype.updateState = function () {
        var isActive = this._isActive();
        if (this.gesture) {
            this.gesture.setDisabled(!isActive || !this.swipeGesture);
        }
        // Close menu immediately
        if (!isActive && this._isOpen) {
            // close if this menu is open, and should not be enabled
            this.forceClosing();
        }
        if (!this.disabled && this.menuCtrl) {
            this.menuCtrl._setActiveMenu(this);
        }
        Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["b"])(!this.isAnimating, 'can not be animating');
    };
    Menu.prototype.forceClosing = function () {
        Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["b"])(this._isOpen, 'menu cannot be closed');
        this.isAnimating = true;
        var ani = this.animation.reverse(true);
        ani.playSync();
        this.afterAnimation(false);
    };
    Menu.prototype.hostData = function () {
        var _a;
        var _b = this, isEndSide = _b.isEndSide, type = _b.type, disabled = _b.disabled, isPaneVisible = _b.isPaneVisible;
        return {
            role: 'navigation',
            class: (_a = {},
                _a["" + this.mode] = true,
                _a["menu-type-" + type] = true,
                _a['menu-enabled'] = !disabled,
                _a['menu-side-end'] = isEndSide,
                _a['menu-side-start'] = !isEndSide,
                _a['menu-pane-visible'] = isPaneVisible,
                _a)
        };
    };
    Menu.prototype.__stencil_render = function () {
        var _this = this;
        return [
            Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("div", { class: "menu-inner", ref: function (el) { return _this.menuInnerEl = el; } }, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("slot", null)),
            Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-backdrop", { ref: function (el) { return _this.backdropEl = el; }, class: "menu-backdrop", tappable: false, stopPropagation: false })
        ];
    };
    Object.defineProperty(Menu.prototype, "el", {
        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["f" /* e */])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu, "watchers", {
        get: function () {
            return {
                "type": ["typeChanged"],
                "disabled": ["disabledChanged"],
                "side": ["sideChanged"],
                "swipeGesture": ["swipeGestureChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Menu.prototype.render = function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Menu, "style", {
        get: function () { return ":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color,#fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,0,0);transform:translate3d(-9999px,0,0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}:host-context([dir=rtl]) .menu-inner,[dir=rtl] .menu-inner{left:unset;right:unset;left:auto;right:0;-webkit-transform:translate3d(calc(-1 * -9999px),0,0);transform:translate3d(calc(-1 * -9999px),0,0)}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;right:auto;left:0}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;right:0;left:auto}ion-backdrop{display:none;opacity:.01;z-index:-1}\@media (max-width:340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translateZ(0);transform:translateZ(0)}:host(.menu-type-overlay){z-index:80}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none!important;transform:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}:host(.menu-pane-visible) ion-backdrop{display:hidden!important}:host(.menu-type-push){z-index:80}:host(.menu-type-push) .show-backdrop{display:block}"; },
        enumerable: true,
        configurable: true
    });
    return Menu;
}());
var computeDelta = function (deltaX, isOpen, isEndSide) {
    return Math.max(0, isOpen !== isEndSide ? -deltaX : deltaX);
};
var checkEdgeSide = function (win, posX, isEndSide, maxEdgeStart) {
    if (isEndSide) {
        return posX >= win.innerWidth - maxEdgeStart;
    }
    else {
        return posX <= maxEdgeStart;
    }
};
var SHOW_MENU = 'show-menu';
var SHOW_BACKDROP = 'show-backdrop';
var MENU_CONTENT_OPEN = 'menu-content-open';
// Get the menu controller element
var getMenuController = function (doc) {
    var menuControllerElement = doc.querySelector('ion-menu-controller');
    if (!menuControllerElement) {
        return Promise.resolve(undefined);
    }
    return menuControllerElement.componentOnReady();
};
// Given a menu, toggle it
var toggleMenu = function (menu) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var menuCtrl, menuEl;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getMenuController(document)];
            case 1:
                menuCtrl = _a.sent();
                if (!menuCtrl) return [3 /*break*/, 3];
                return [4 /*yield*/, menuCtrl.get(menu)];
            case 2:
                menuEl = _a.sent();
                if (menuEl) {
                    menuCtrl.toggle(menu);
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Given a menu, return whether or not the menu toggle should be visible
var updateVisibility = function (menu) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var menuCtrl, menuEl, _a;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getMenuController(document)];
            case 1:
                menuCtrl = _b.sent();
                if (!menuCtrl) return [3 /*break*/, 5];
                return [4 /*yield*/, menuCtrl.get(menu)];
            case 2:
                menuEl = _b.sent();
                _a = menuEl;
                if (!_a) return [3 /*break*/, 4];
                return [4 /*yield*/, menuEl.isActive()];
            case 3:
                _a = (_b.sent());
                _b.label = 4;
            case 4:
                if (_a) {
                    return [2 /*return*/, true];
                }
                _b.label = 5;
            case 5: return [2 /*return*/, false];
        }
    });
}); };
var MenuButton = /** @class */ (function () {
    function MenuButton(hostRef) {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.visible = false;
        /**
         * If `true`, the user cannot interact with the menu button.
         */
        this.disabled = false;
        /**
         * Automatically hides the menu button when the corresponding menu is not active
         */
        this.autoHide = true;
        /**
         * The type of the button.
         */
        this.type = 'button';
        this.setVisibility = function () { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
            var _a;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, updateVisibility(this.menu)];
                    case 1:
                        _a.visible = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.onClick = function () { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toggleMenu(this.menu)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    MenuButton.prototype.componentDidLoad = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setVisibility()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuButton.prototype.visibilityChanged = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setVisibility()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuButton.prototype.render = function () {
        var _a;
        var _b = this, color = _b.color, disabled = _b.disabled;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        var menuIcon = __WEBPACK_IMPORTED_MODULE_2__chunk_1074393c_js__["b"].get('menuIcon', 'menu');
        var hidden = this.autoHide && !this.visible;
        var attrs = {
            type: this.type
        };
        return (Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], { onClick: this.onClick, "aria-disabled": disabled ? 'true' : null, "aria-hidden": hidden ? 'true' : null, class: Object.assign((_a = {}, _a[mode] = true, _a), Object(__WEBPACK_IMPORTED_MODULE_3__chunk_ba834eff_js__["a" /* c */])(color), { 'button': true, 'menu-button-hidden': hidden, 'menu-button-disabled': disabled, 'ion-activatable': true, 'ion-focusable': true }) }, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("button", Object.assign({}, attrs, { disabled: this.disabled, class: "button-native" }), Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("slot", null, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-icon", { icon: menuIcon, mode: mode, lazy: false })), mode === 'md' && Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-ripple-effect", { type: "unbounded" }))));
    };
    Object.defineProperty(MenuButton, "style", {
        get: function () { return ":host{--background:transparent;--color-focused:var(--color);--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:.5;pointer-events:none}\@media (any-hover:hover){:host(:hover) .button-native{background:var(--background-hover);color:var(--color-hover)}}:host(.ion-focused) .button-native{background:var(--background-focused);color:var(--color-focused)}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host-context(ion-toolbar:not(.ion-color)){color:var(--ion-toolbar-color,var(--color))}:host{--background-focused:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--border-radius:4px;--color:var(--ion-color-primary,#3880ff);--padding-start:5px;--padding-end:5px;height:32px;font-size:31px}:host(.activated){opacity:.4}\@media (any-hover:hover){:host(:hover){opacity:.6}}:host(.ion-color.ion-focused) .button-native{background:rgba(var(--ion-color-base-rgb),.1)}"; },
        enumerable: true,
        configurable: true
    });
    return MenuButton;
}());
/**
 * baseAnimation
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */
var baseAnimation = function (AnimationC) {
    // https://material.io/guidelines/motion/movement.html#movement-movement-in-out-of-screen-bounds
    // https://material.io/guidelines/motion/duration-easing.html#duration-easing-natural-easing-curves
    // "Apply the sharp curve to items temporarily leaving the screen that may return
    // from the same exit point. When they return, use the deceleration curve. On mobile,
    // this transition typically occurs over 300ms" -- MD Motion Guide
    return Promise.resolve(new AnimationC()
        .easing('cubic-bezier(0.0, 0.0, 0.2, 1)') // Deceleration curve (Entering the screen)
        .easingReverse('cubic-bezier(0.4, 0.0, 0.6, 1)') // Sharp curve (Temporarily leaving the screen)
        .duration(300));
};
var BOX_SHADOW_WIDTH = 8;
/**
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */
var menuOverlayAnimation = function (AnimationC, _, menu) {
    var closedX;
    var openedX;
    var width = menu.width + BOX_SHADOW_WIDTH;
    if (menu.isEndSide) {
        // right side
        closedX = width + 'px';
        openedX = '0px';
    }
    else {
        // left side
        closedX = -width + 'px';
        openedX = '0px';
    }
    var menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', closedX, openedX);
    var backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(function (animation) {
        return animation.add(menuAnimation)
            .add(backdropAnimation);
    });
};
/**
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */
var menuPushAnimation = function (AnimationC, _, menu) {
    var contentOpenedX;
    var menuClosedX;
    var width = menu.width;
    if (menu.isEndSide) {
        contentOpenedX = -width + 'px';
        menuClosedX = width + 'px';
    }
    else {
        contentOpenedX = width + 'px';
        menuClosedX = -width + 'px';
    }
    var menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', menuClosedX, '0px');
    var contentAnimation = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', contentOpenedX);
    var backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(function (animation) {
        return animation.add(menuAnimation)
            .add(backdropAnimation)
            .add(contentAnimation);
    });
};
/**
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */
var menuRevealAnimation = function (AnimationC, _, menu) {
    var openedX = (menu.width * (menu.isEndSide ? -1 : 1)) + 'px';
    var contentOpen = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', openedX);
    return baseAnimation(AnimationC).then(function (animation) {
        return animation.add(contentOpen);
    });
};
var MenuController = /** @class */ (function () {
    function MenuController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.menus = [];
        this.menuAnimations = new Map();
        this.registerAnimation('reveal', menuRevealAnimation);
        this.registerAnimation('push', menuPushAnimation);
        this.registerAnimation('overlay', menuOverlayAnimation);
    }
    /**
     * Open the menu. If a menu is not provided then it will open the first
     * menu found. If the specified menu is `start` or `end`, then it will open
     * the enabled menu on that side. Otherwise, it will try to find the menu
     * using the menu's `id` property. If a menu is not found then it will
     * return `false`.
     *
     * @param menu The menuId or side of the menu to open.
     */
    MenuController.prototype.open = function (menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            return [2 /*return*/, menuEl.open()];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Close the menu. If a menu is specified, it will close that menu.
     * If no menu is specified, then it will close any menu that is open.
     * If it does not find any open menus, it will return `false`.
     *
     * @param menu The menuId or side of the menu to close.
     */
    MenuController.prototype.close = function (menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (menu !== undefined ? this.get(menu) : this.getOpen())];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl !== undefined) {
                            return [2 /*return*/, menuEl.close()];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Toggle the menu open or closed. If the menu is already open, it will try to
     * close the menu, otherwise it will try to open it. Returns `false` if
     * a menu is not found.
     *
     * @param menu The menuId or side of the menu to toggle.
     */
    MenuController.prototype.toggle = function (menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            return [2 /*return*/, menuEl.toggle()];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Enable or disable a menu. Disabling a menu will not allow gestures
     * for that menu or any calls to open it. This is useful when there are
     * multiple menus on the same side and only one of them should be allowed
     * to open. Enabling a menu will automatically disable all other menus
     * on that side.
     *
     * @param enable If `true`, the menu should be enabled.
     * @param menu The menuId or side of the menu to enable or disable.
     */
    MenuController.prototype.enable = function (enable, menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            menuEl.disabled = !enable;
                        }
                        return [2 /*return*/, menuEl];
                }
            });
        });
    };
    /**
     * Enable or disable the ability to swipe open the menu.
     *
     * @param enable If `true`, the menu swipe gesture should be enabled.
     * @param menu The menuId or side of the menu to enable or disable the swipe gesture on.
     */
    MenuController.prototype.swipeGesture = function (enable, menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            menuEl.swipeGesture = enable;
                        }
                        return [2 /*return*/, menuEl];
                }
            });
        });
    };
    /**
     * Get whether or not the menu is open. Returns `true` if the specified
     * menu is open. If a menu is not specified, it will return `true` if
     * any menu is currently open.
     *
     * @param menu The menuId or side of the menu that is being checked.
     */
    MenuController.prototype.isOpen = function (menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuEl, menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(menu != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        return [2 /*return*/, (menuEl !== undefined && menuEl.isOpen())];
                    case 2: return [4 /*yield*/, this.getOpen()];
                    case 3:
                        menuEl = _a.sent();
                        return [2 /*return*/, menuEl !== undefined];
                }
            });
        });
    };
    /**
     * Get whether or not the menu is enabled. Returns `true` if the
     * specified menu is enabled. Returns `false` if a menu is disabled
     * or not found.
     *
     * @param menu The menuId or side of the menu that is being checked.
     */
    MenuController.prototype.isEnabled = function (menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(menu)];
                    case 1:
                        menuEl = _a.sent();
                        if (menuEl) {
                            return [2 /*return*/, !menuEl.disabled];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Get a menu instance. If a menu is not provided then it will return the first
     * menu found. If the specified menu is `start` or `end`, then it will return the
     * enabled menu on that side. Otherwise, it will try to find the menu using the menu's
     * `id` property. If a menu is not found then it will return `null`.
     *
     * @param menu The menuId or side of the menu.
     */
    MenuController.prototype.get = function (menu) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var menuRef, menuEl;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        if (menu === 'start' || menu === 'end') {
                            menuRef = this.find(function (m) { return m.side === menu && !m.disabled; });
                            if (menuRef) {
                                return [2 /*return*/, menuRef];
                            }
                            // didn't find a menu side that is enabled
                            // so try to get the first menu side found
                            return [2 /*return*/, this.find(function (m) { return m.side === menu; })];
                        }
                        else if (menu != null) {
                            // the menuId was not left or right
                            // so try to get the menu by its "id"
                            return [2 /*return*/, this.find(function (m) { return m.menuId === menu; })];
                        }
                        menuEl = this.find(function (m) { return !m.disabled; });
                        if (menuEl) {
                            return [2 /*return*/, menuEl];
                        }
                        // get the first menu in the array, if one exists
                        return [2 /*return*/, this.menus.length > 0 ? this.menus[0].el : undefined];
                }
            });
        });
    };
    /**
     * Get the instance of the opened menu. Returns `null` if a menu is not found.
     */
    MenuController.prototype.getOpen = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getOpenSync()];
                }
            });
        });
    };
    /**
     * Get all menu instances.
     */
    MenuController.prototype.getMenus = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getMenusSync()];
                }
            });
        });
    };
    /**
     * Get whether or not a menu is animating. Returns `true` if any
     * menu is currently animating.
     */
    MenuController.prototype.isAnimating = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitUntilReady()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.isAnimatingSync()];
                }
            });
        });
    };
    /**
     * Registers a new animation that can be used with any `ion-menu` by
     * passing the name of the animation in its `type` property.
     *
     * @param name The name of the animation to register.
     * @param animation The animation function to register.
     */
    MenuController.prototype.registerAnimation = function (name, animation) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                this.menuAnimations.set(name, animation);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @internal
     */
    MenuController.prototype._getInstance = function () {
        return Promise.resolve(this);
    };
    MenuController.prototype._register = function (menu) {
        var menus = this.menus;
        if (menus.indexOf(menu) < 0) {
            if (!menu.disabled) {
                this._setActiveMenu(menu);
            }
            menus.push(menu);
        }
    };
    MenuController.prototype._unregister = function (menu) {
        var index = this.menus.indexOf(menu);
        if (index > -1) {
            this.menus.splice(index, 1);
        }
    };
    MenuController.prototype._setActiveMenu = function (menu) {
        // if this menu should be enabled
        // then find all the other menus on this same side
        // and automatically disable other same side menus
        var side = menu.side;
        this.menus
            .filter(function (m) { return m.side === side && m !== menu; })
            .forEach(function (m) { return m.disabled = true; });
    };
    MenuController.prototype._setOpen = function (menu, shouldOpen, animated) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var openedMenu;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isAnimatingSync()) {
                            return [2 /*return*/, false];
                        }
                        if (!shouldOpen) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getOpen()];
                    case 1:
                        openedMenu = _a.sent();
                        if (!(openedMenu && menu.el !== openedMenu)) return [3 /*break*/, 3];
                        return [4 /*yield*/, openedMenu.setOpen(false, false)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, menu._setOpen(shouldOpen, animated)];
                }
            });
        });
    };
    MenuController.prototype._createAnimation = function (type, menuCmp) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var animationBuilder, animation;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        animationBuilder = this.menuAnimations.get(type);
                        if (!animationBuilder) {
                            throw new Error('animation not registered');
                        }
                        return [4 /*yield*/, __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 657))
                                .then(function (mod) { return mod.create(animationBuilder, null, menuCmp); })];
                    case 1:
                        animation = _a.sent();
                        if (!__WEBPACK_IMPORTED_MODULE_2__chunk_1074393c_js__["b"].getBoolean('animated', true)) {
                            animation.duration(0);
                        }
                        return [2 /*return*/, animation];
                }
            });
        });
    };
    MenuController.prototype.getOpenSync = function () {
        return this.find(function (m) { return m._isOpen; });
    };
    MenuController.prototype.getMenusSync = function () {
        return this.menus.map(function (menu) { return menu.el; });
    };
    MenuController.prototype.isAnimatingSync = function () {
        return this.menus.some(function (menu) { return menu.isAnimating; });
    };
    MenuController.prototype.find = function (predicate) {
        var instance = this.menus.find(predicate);
        if (instance !== undefined) {
            return instance.el;
        }
        return undefined;
    };
    MenuController.prototype.waitUntilReady = function () {
        return Promise.all(Array.from(document.querySelectorAll('ion-menu'))
            .map(function (menu) { return menu.componentOnReady(); }));
    };
    Object.defineProperty(MenuController, "style", {
        get: function () { return ".menu-content{-webkit-transform:translateZ(0);transform:translateZ(0)}.menu-content-open{cursor:pointer;-ms-touch-action:manipulation;touch-action:manipulation;pointer-events:none}.ios .menu-content-reveal{-webkit-box-shadow:-8px 0 42px rgba(0,0,0,.08);box-shadow:-8px 0 42px rgba(0,0,0,.08)}[dir=rtl].ios .menu-content-reveal{-webkit-box-shadow:8px 0 42px rgba(0,0,0,.08);box-shadow:8px 0 42px rgba(0,0,0,.08)}.md .menu-content-push,.md .menu-content-reveal{-webkit-box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18);box-shadow:0 2px 22px 0 rgba(0,0,0,.09),4px 0 16px 0 rgba(0,0,0,.18)}"; },
        enumerable: true,
        configurable: true
    });
    return MenuController;
}());
var MenuToggle = /** @class */ (function () {
    function MenuToggle(hostRef) {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.visible = false;
        /**
         * Automatically hides the content when the corresponding menu is not active.
         *
         * By default, it's `true`. Change it to `false` in order to
         * keep `ion-menu-toggle` always visible regardless the state of the menu.
         */
        this.autoHide = true;
        this.setVisibility = function () { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
            var _a;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, updateVisibility(this.menu)];
                    case 1:
                        _a.visible = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.onClick = function () { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toggleMenu(this.menu)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    MenuToggle.prototype.componentDidLoad = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setVisibility()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuToggle.prototype.visibilityChanged = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setVisibility()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuToggle.prototype.render = function () {
        var _a;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        var hidden = this.autoHide && !this.visible;
        return (Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], { onClick: this.onClick, "aria-hidden": hidden ? 'true' : null, class: (_a = {},
                _a[mode] = true,
                _a['menu-toggle-hidden'] = hidden,
                _a) }, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("slot", null)));
    };
    Object.defineProperty(MenuToggle, "style", {
        get: function () { return ":host(.menu-toggle-hidden){display:none}"; },
        enumerable: true,
        configurable: true
    });
    return MenuToggle;
}());



/***/ }),

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return openURL; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
var _this = this;

var hostContext = function (selector, el) {
    return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
var createColorClasses = function (color) {
    var _a;
    return (typeof color === 'string' && color.length > 0) ? (_a = {
            'ion-color': true
        },
        _a["ion-color-" + color] = true,
        _a) : undefined;
};
var getClassList = function (classes) {
    if (classes !== undefined) {
        var array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(function (c) { return c != null; })
            .map(function (c) { return c.trim(); })
            .filter(function (c) { return c !== ''; });
    }
    return [];
};
var getClassMap = function (classes) {
    var map = {};
    getClassList(classes).forEach(function (c) { return map[c] = true; });
    return map;
};
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
var openURL = function (url, ev, direction) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var router;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(url != null && url[0] !== '#' && !SCHEME.test(url))) return [3 /*break*/, 2];
                router = document.querySelector('ion-router');
                if (!router) return [3 /*break*/, 2];
                if (ev != null) {
                    ev.preventDefault();
                }
                return [4 /*yield*/, router.componentOnReady()];
            case 1:
                _a.sent();
                return [2 /*return*/, router.push(url, direction)];
            case 2: return [2 /*return*/, false];
        }
    });
}); };



/***/ }),

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return debounceEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return findItemLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return hasShadowDom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isEndSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return pointerCoord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return renderHiddenInput; });
var rIC = function (callback) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
    }
    else {
        setTimeout(callback, 32);
    }
};
var hasShadowDom = function (el) {
    return !!el.shadowRoot && !!el.attachShadow;
};
var findItemLabel = function (componentEl) {
    var itemEl = componentEl.closest('ion-item');
    if (itemEl) {
        return itemEl.querySelector('ion-label');
    }
    return null;
};
var renderHiddenInput = function (always, container, name, value, disabled) {
    if (always || hasShadowDom(container)) {
        var input = container.querySelector('input.aux-input');
        if (!input) {
            input = container.ownerDocument.createElement('input');
            input.type = 'hidden';
            input.classList.add('aux-input');
            container.appendChild(input);
        }
        input.disabled = disabled;
        input.name = name;
        input.value = value || '';
    }
};
var clamp = function (min, n, max) {
    return Math.max(min, Math.min(n, max));
};
var assert = function (actual, reason) {
    if (!actual) {
        var message = 'ASSERT: ' + reason;
        console.error(message);
        debugger; // tslint:disable-line
        throw new Error(message);
    }
};
var now = function (ev) {
    return ev.timeStamp || Date.now();
};
var pointerCoord = function (ev) {
    // get X coordinates for either a mouse click
    // or a touch depending on the given event
    if (ev) {
        var changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            var touch = changedTouches[0];
            return { x: touch.clientX, y: touch.clientY };
        }
        if (ev.pageX !== undefined) {
            return { x: ev.pageX, y: ev.pageY };
        }
    }
    return { x: 0, y: 0 };
};
/**
 * @hidden
 * Given a side, return if it should be on the end
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 */
var isEndSide = function (side) {
    var isRTL = document.dir === 'rtl';
    switch (side) {
        case 'start': return isRTL;
        case 'end': return !isRTL;
        default:
            throw new Error("\"" + side + "\" is not a valid value for [side]. Use \"start\" or \"end\" instead.");
    }
};
var debounceEvent = function (event, wait) {
    var original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    };
};
var debounce = function (func, wait) {
    if (wait === void 0) { wait = 0; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = setTimeout.apply(void 0, [func, wait].concat(args));
    };
};



/***/ }),

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GESTURE_CONTROLLER", function() { return GESTURE_CONTROLLER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGesture", function() { return createGesture; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_1074393c_js__ = __webpack_require__(83);


var GestureController = /** @class */ (function () {
    function GestureController() {
        this.gestureId = 0;
        this.requestedStart = new Map();
        this.disabledGestures = new Map();
        this.disabledScroll = new Set();
    }
    /**
     * Creates a gesture delegate based on the GestureConfig passed
     */
    GestureController.prototype.createGesture = function (config) {
        return new GestureDelegate(this, this.newID(), config.name, config.priority || 0, !!config.disableScroll);
    };
    /**
     * Creates a blocker that will block any other gesture events from firing. Set in the ion-gesture component.
     */
    GestureController.prototype.createBlocker = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new BlockerDelegate(this, this.newID(), opts.disable, !!opts.disableScroll);
    };
    GestureController.prototype.start = function (gestureName, id, priority) {
        if (!this.canStart(gestureName)) {
            this.requestedStart.delete(id);
            return false;
        }
        this.requestedStart.set(id, priority);
        return true;
    };
    GestureController.prototype.capture = function (gestureName, id, priority) {
        if (!this.start(gestureName, id, priority)) {
            return false;
        }
        var requestedStart = this.requestedStart;
        var maxPriority = -10000;
        requestedStart.forEach(function (value) {
            maxPriority = Math.max(maxPriority, value);
        });
        if (maxPriority === priority) {
            this.capturedId = id;
            requestedStart.clear();
            var event = new CustomEvent('ionGestureCaptured', { detail: { gestureName: gestureName } });
            document.dispatchEvent(event);
            return true;
        }
        requestedStart.delete(id);
        return false;
    };
    GestureController.prototype.release = function (id) {
        this.requestedStart.delete(id);
        if (this.capturedId === id) {
            this.capturedId = undefined;
        }
    };
    GestureController.prototype.disableGesture = function (gestureName, id) {
        var set = this.disabledGestures.get(gestureName);
        if (set === undefined) {
            set = new Set();
            this.disabledGestures.set(gestureName, set);
        }
        set.add(id);
    };
    GestureController.prototype.enableGesture = function (gestureName, id) {
        var set = this.disabledGestures.get(gestureName);
        if (set !== undefined) {
            set.delete(id);
        }
    };
    GestureController.prototype.disableScroll = function (id) {
        this.disabledScroll.add(id);
        if (this.disabledScroll.size === 1) {
            document.body.classList.add(BACKDROP_NO_SCROLL);
        }
    };
    GestureController.prototype.enableScroll = function (id) {
        this.disabledScroll.delete(id);
        if (this.disabledScroll.size === 0) {
            document.body.classList.remove(BACKDROP_NO_SCROLL);
        }
    };
    GestureController.prototype.canStart = function (gestureName) {
        if (this.capturedId !== undefined) {
            // a gesture already captured
            return false;
        }
        if (this.isDisabled(gestureName)) {
            return false;
        }
        return true;
    };
    GestureController.prototype.isCaptured = function () {
        return this.capturedId !== undefined;
    };
    GestureController.prototype.isScrollDisabled = function () {
        return this.disabledScroll.size > 0;
    };
    GestureController.prototype.isDisabled = function (gestureName) {
        var disabled = this.disabledGestures.get(gestureName);
        if (disabled && disabled.size > 0) {
            return true;
        }
        return false;
    };
    GestureController.prototype.newID = function () {
        this.gestureId++;
        return this.gestureId;
    };
    return GestureController;
}());
var GestureDelegate = /** @class */ (function () {
    function GestureDelegate(ctrl, id, name, priority, disableScroll) {
        this.id = id;
        this.name = name;
        this.disableScroll = disableScroll;
        this.priority = priority * 1000000 + id;
        this.ctrl = ctrl;
    }
    GestureDelegate.prototype.canStart = function () {
        if (!this.ctrl) {
            return false;
        }
        return this.ctrl.canStart(this.name);
    };
    GestureDelegate.prototype.start = function () {
        if (!this.ctrl) {
            return false;
        }
        return this.ctrl.start(this.name, this.id, this.priority);
    };
    GestureDelegate.prototype.capture = function () {
        if (!this.ctrl) {
            return false;
        }
        var captured = this.ctrl.capture(this.name, this.id, this.priority);
        if (captured && this.disableScroll) {
            this.ctrl.disableScroll(this.id);
        }
        return captured;
    };
    GestureDelegate.prototype.release = function () {
        if (this.ctrl) {
            this.ctrl.release(this.id);
            if (this.disableScroll) {
                this.ctrl.enableScroll(this.id);
            }
        }
    };
    GestureDelegate.prototype.destroy = function () {
        this.release();
        this.ctrl = undefined;
    };
    return GestureDelegate;
}());
var BlockerDelegate = /** @class */ (function () {
    function BlockerDelegate(ctrl, id, disable, disableScroll) {
        this.id = id;
        this.disable = disable;
        this.disableScroll = disableScroll;
        this.ctrl = ctrl;
    }
    BlockerDelegate.prototype.block = function () {
        if (!this.ctrl) {
            return;
        }
        if (this.disable) {
            for (var _i = 0, _a = this.disable; _i < _a.length; _i++) {
                var gesture = _a[_i];
                this.ctrl.disableGesture(gesture, this.id);
            }
        }
        if (this.disableScroll) {
            this.ctrl.disableScroll(this.id);
        }
    };
    BlockerDelegate.prototype.unblock = function () {
        if (!this.ctrl) {
            return;
        }
        if (this.disable) {
            for (var _i = 0, _a = this.disable; _i < _a.length; _i++) {
                var gesture = _a[_i];
                this.ctrl.enableGesture(gesture, this.id);
            }
        }
        if (this.disableScroll) {
            this.ctrl.enableScroll(this.id);
        }
    };
    BlockerDelegate.prototype.destroy = function () {
        this.unblock();
        this.ctrl = undefined;
    };
    return BlockerDelegate;
}());
var BACKDROP_NO_SCROLL = 'backdrop-no-scroll';
var GESTURE_CONTROLLER = new GestureController();
var addEventListener = function (el, eventName, callback, opts) {
    // use event listener options when supported
    // otherwise it's just a boolean for the "capture" arg
    var listenerOpts = supportsPassive(el) ? {
        'capture': !!opts.capture,
        'passive': !!opts.passive,
    } : !!opts.capture;
    var add;
    var remove;
    if (el['__zone_symbol__addEventListener']) {
        add = '__zone_symbol__addEventListener';
        remove = '__zone_symbol__removeEventListener';
    }
    else {
        add = 'addEventListener';
        remove = 'removeEventListener';
    }
    el[add](eventName, callback, listenerOpts);
    return function () {
        el[remove](eventName, callback, listenerOpts);
    };
};
var supportsPassive = function (node) {
    if (_sPassive === undefined) {
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    _sPassive = true;
                }
            });
            node.addEventListener('optsTest', function () { return; }, opts);
        }
        catch (e) {
            _sPassive = false;
        }
    }
    return !!_sPassive;
};
var _sPassive;
var MOUSE_WAIT = 2000;
var createPointerEvents = function (el, pointerDown, pointerMove, pointerUp, options) {
    var rmTouchStart;
    var rmTouchMove;
    var rmTouchEnd;
    var rmTouchCancel;
    var rmMouseStart;
    var rmMouseMove;
    var rmMouseUp;
    var lastTouchEvent = 0;
    var handleTouchStart = function (ev) {
        lastTouchEvent = Date.now() + MOUSE_WAIT;
        if (!pointerDown(ev)) {
            return;
        }
        if (!rmTouchMove && pointerMove) {
            rmTouchMove = addEventListener(el, 'touchmove', pointerMove, options);
        }
        if (!rmTouchEnd) {
            rmTouchEnd = addEventListener(el, 'touchend', handleTouchEnd, options);
        }
        if (!rmTouchCancel) {
            rmTouchCancel = addEventListener(el, 'touchcancel', handleTouchEnd, options);
        }
    };
    var handleMouseDown = function (ev) {
        if (lastTouchEvent > Date.now()) {
            return;
        }
        if (!pointerDown(ev)) {
            return;
        }
        if (!rmMouseMove && pointerMove) {
            rmMouseMove = addEventListener(getDocument(el), 'mousemove', pointerMove, options);
        }
        if (!rmMouseUp) {
            rmMouseUp = addEventListener(getDocument(el), 'mouseup', handleMouseUp, options);
        }
    };
    var handleTouchEnd = function (ev) {
        stopTouch();
        if (pointerUp) {
            pointerUp(ev);
        }
    };
    var handleMouseUp = function (ev) {
        stopMouse();
        if (pointerUp) {
            pointerUp(ev);
        }
    };
    var stopTouch = function () {
        if (rmTouchMove) {
            rmTouchMove();
        }
        if (rmTouchEnd) {
            rmTouchEnd();
        }
        if (rmTouchCancel) {
            rmTouchCancel();
        }
        rmTouchMove = rmTouchEnd = rmTouchCancel = undefined;
    };
    var stopMouse = function () {
        if (rmMouseMove) {
            rmMouseMove();
        }
        if (rmMouseUp) {
            rmMouseUp();
        }
        rmMouseMove = rmMouseUp = undefined;
    };
    var stop = function () {
        stopTouch();
        stopMouse();
    };
    var setDisabled = function (disabled) {
        if (disabled) {
            if (rmTouchStart) {
                rmTouchStart();
            }
            if (rmMouseStart) {
                rmMouseStart();
            }
            rmTouchStart = rmMouseStart = undefined;
            stop();
        }
        else {
            if (!rmTouchStart) {
                rmTouchStart = addEventListener(el, 'touchstart', handleTouchStart, options);
            }
            if (!rmMouseStart) {
                rmMouseStart = addEventListener(el, 'mousedown', handleMouseDown, options);
            }
        }
    };
    var destroy = function () {
        setDisabled(true);
        pointerUp = pointerMove = pointerDown = undefined;
    };
    return {
        setDisabled: setDisabled,
        stop: stop,
        destroy: destroy
    };
};
var getDocument = function (node) {
    return node instanceof Document ? node : node.ownerDocument;
};
var createPanRecognizer = function (direction, thresh, maxAngle) {
    var radians = maxAngle * (Math.PI / 180);
    var isDirX = direction === 'x';
    var maxCosine = Math.cos(radians);
    var threshold = thresh * thresh;
    var startX = 0;
    var startY = 0;
    var dirty = false;
    var isPan = 0;
    return {
        start: function (x, y) {
            startX = x;
            startY = y;
            isPan = 0;
            dirty = true;
        },
        detect: function (x, y) {
            if (!dirty) {
                return false;
            }
            var deltaX = (x - startX);
            var deltaY = (y - startY);
            var distance = deltaX * deltaX + deltaY * deltaY;
            if (distance < threshold) {
                return false;
            }
            var hypotenuse = Math.sqrt(distance);
            var cosine = (isDirX ? deltaX : deltaY) / hypotenuse;
            if (cosine > maxCosine) {
                isPan = 1;
            }
            else if (cosine < -maxCosine) {
                isPan = -1;
            }
            else {
                isPan = 0;
            }
            dirty = false;
            return true;
        },
        isGesture: function () {
            return isPan !== 0;
        },
        getDirection: function () {
            return isPan;
        }
    };
};
var createGesture = function (config) {
    var hasCapturedPan = false;
    var hasStartedPan = false;
    var hasFiredStart = true;
    var isMoveQueued = false;
    var finalConfig = Object.assign({ disableScroll: false, direction: 'x', gesturePriority: 0, passive: true, maxAngle: 40, threshold: 10 }, config);
    var canStart = finalConfig.canStart;
    var onWillStart = finalConfig.onWillStart;
    var onStart = finalConfig.onStart;
    var onEnd = finalConfig.onEnd;
    var notCaptured = finalConfig.notCaptured;
    var onMove = finalConfig.onMove;
    var threshold = finalConfig.threshold;
    var detail = {
        type: 'pan',
        startX: 0,
        startY: 0,
        startTimeStamp: 0,
        currentX: 0,
        currentY: 0,
        velocityX: 0,
        velocityY: 0,
        deltaX: 0,
        deltaY: 0,
        timeStamp: 0,
        event: undefined,
        data: undefined
    };
    var pan = createPanRecognizer(finalConfig.direction, finalConfig.threshold, finalConfig.maxAngle);
    var gesture = GESTURE_CONTROLLER.createGesture({
        name: config.gestureName,
        priority: config.gesturePriority,
        disableScroll: config.disableScroll
    });
    var pointerDown = function (ev) {
        var timeStamp = now(ev);
        if (hasStartedPan || !hasFiredStart) {
            return false;
        }
        updateDetail(ev, detail);
        detail.startX = detail.currentX;
        detail.startY = detail.currentY;
        detail.startTimeStamp = detail.timeStamp = timeStamp;
        detail.velocityX = detail.velocityY = detail.deltaX = detail.deltaY = 0;
        detail.event = ev;
        // Check if gesture can start
        if (canStart && canStart(detail) === false) {
            return false;
        }
        // Release fallback
        gesture.release();
        // Start gesture
        if (!gesture.start()) {
            return false;
        }
        hasStartedPan = true;
        if (threshold === 0) {
            return tryToCapturePan();
        }
        pan.start(detail.startX, detail.startY);
        return true;
    };
    var pointerMove = function (ev) {
        // fast path, if gesture is currently captured
        // do minimum job to get user-land even dispatched
        if (hasCapturedPan) {
            if (!isMoveQueued && hasFiredStart) {
                isMoveQueued = true;
                calcGestureData(detail, ev);
                Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["n" /* w */])(fireOnMove);
            }
            return;
        }
        // gesture is currently being detected
        calcGestureData(detail, ev);
        if (pan.detect(detail.currentX, detail.currentY)) {
            if (!pan.isGesture() || !tryToCapturePan()) {
                abortGesture();
            }
        }
    };
    var fireOnMove = function () {
        // Since fireOnMove is called inside a RAF, onEnd() might be called,
        // we must double check hasCapturedPan
        if (!hasCapturedPan) {
            return;
        }
        isMoveQueued = false;
        if (onMove) {
            onMove(detail);
        }
    };
    var tryToCapturePan = function () {
        if (gesture && !gesture.capture()) {
            return false;
        }
        hasCapturedPan = true;
        hasFiredStart = false;
        // reset start position since the real user-land event starts here
        // If the pan detector threshold is big, not resetting the start position
        // will cause a jump in the animation equal to the detector threshold.
        // the array of positions used to calculate the gesture velocity does not
        // need to be cleaned, more points in the positions array always results in a
        // more accurate value of the velocity.
        detail.startX = detail.currentX;
        detail.startY = detail.currentY;
        detail.startTimeStamp = detail.timeStamp;
        if (onWillStart) {
            onWillStart(detail).then(fireOnStart);
        }
        else {
            fireOnStart();
        }
        return true;
    };
    var fireOnStart = function () {
        if (onStart) {
            onStart(detail);
        }
        hasFiredStart = true;
    };
    var reset = function () {
        hasCapturedPan = false;
        hasStartedPan = false;
        isMoveQueued = false;
        hasFiredStart = true;
        gesture.release();
    };
    // END *************************
    var pointerUp = function (ev) {
        var tmpHasCaptured = hasCapturedPan;
        var tmpHasFiredStart = hasFiredStart;
        reset();
        if (!tmpHasFiredStart) {
            return;
        }
        calcGestureData(detail, ev);
        // Try to capture press
        if (tmpHasCaptured) {
            if (onEnd) {
                onEnd(detail);
            }
            return;
        }
        // Not captured any event
        if (notCaptured) {
            notCaptured(detail);
        }
    };
    var pointerEvents = createPointerEvents(finalConfig.el, pointerDown, pointerMove, pointerUp, {
        capture: false,
    });
    var abortGesture = function () {
        reset();
        pointerEvents.stop();
        if (notCaptured) {
            notCaptured(detail);
        }
    };
    return {
        setDisabled: function (disabled) {
            if (disabled && hasCapturedPan) {
                pointerUp(undefined);
            }
            pointerEvents.setDisabled(disabled);
        },
        destroy: function () {
            gesture.destroy();
            pointerEvents.destroy();
        }
    };
};
var calcGestureData = function (detail, ev) {
    if (!ev) {
        return;
    }
    var prevX = detail.currentX;
    var prevY = detail.currentY;
    var prevT = detail.timeStamp;
    updateDetail(ev, detail);
    var currentX = detail.currentX;
    var currentY = detail.currentY;
    var timestamp = detail.timeStamp = now(ev);
    var timeDelta = timestamp - prevT;
    if (timeDelta > 0 && timeDelta < 100) {
        var velocityX = (currentX - prevX) / timeDelta;
        var velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
    }
    detail.deltaX = currentX - detail.startX;
    detail.deltaY = currentY - detail.startY;
    detail.event = ev;
};
var updateDetail = function (ev, detail) {
    // get X coordinates for either a mouse click
    // or a touch depending on the given event
    var x = 0;
    var y = 0;
    if (ev) {
        var changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            var touch = changedTouches[0];
            x = touch.clientX;
            y = touch.clientY;
        }
        else if (ev.pageX !== undefined) {
            x = ev.pageX;
            y = ev.pageY;
        }
    }
    detail.currentX = x;
    detail.currentY = y;
};
var now = function (ev) {
    return ev.timeStamp || Date.now();
};



/***/ })

});
//# sourceMappingURL=4.js.map