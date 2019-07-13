webpackJsonp([69],{

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_action_sheet_controller", function() { return ActionSheetController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_alert_controller", function() { return AlertController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_anchor", function() { return Anchor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_loading_controller", function() { return LoadingController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_modal_controller", function() { return ModalController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_picker_controller", function() { return PickerController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_popover_controller", function() { return PopoverController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_toast_controller", function() { return ToastController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chunk_1074393c_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chunk_ba834eff_js__ = __webpack_require__(764);





var ActionSheetController = /** @class */ (function () {
    function ActionSheetController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
    }
    /**
     * Create an action sheet overlay with action sheet options.
     *
     * @param options The options to use to create the action sheet.
     */
    ActionSheetController.prototype.create = function (options) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["h" /* g */])('ion-action-sheet', options);
    };
    /**
     * Dismiss the open action sheet overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the action sheet.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the action sheet.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the action sheet to dismiss. If an id is not provided, it will dismiss the most recently opened action sheet.
     */
    ActionSheetController.prototype.dismiss = function (data, role, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["i" /* h */])(document, data, role, 'ion-action-sheet', id);
    };
    /**
     * Get the most recently opened action sheet overlay.
     */
    ActionSheetController.prototype.getTop = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["k" /* j */])(document, 'ion-action-sheet')];
            });
        });
    };
    return ActionSheetController;
}());
var AlertController = /** @class */ (function () {
    function AlertController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
    }
    /**
     * Create an alert overlay with alert options.
     *
     * @param options The options to use to create the alert.
     */
    AlertController.prototype.create = function (options) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["h" /* g */])('ion-alert', options);
    };
    /**
     * Dismiss the open alert overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the alert.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the alert.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the alert to dismiss. If an id is not provided, it will dismiss the most recently opened alert.
     */
    AlertController.prototype.dismiss = function (data, role, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["i" /* h */])(document, data, role, 'ion-alert', id);
    };
    /**
     * Get the most recently opened alert overlay.
     */
    AlertController.prototype.getTop = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["k" /* j */])(document, 'ion-alert')];
            });
        });
    };
    return AlertController;
}());
/**
 * @deprecated Use `ion-router-link` instead.
 */
var Anchor = /** @class */ (function () {
    function Anchor(hostRef) {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        this.onClick = function (ev) {
            Object(__WEBPACK_IMPORTED_MODULE_4__chunk_ba834eff_js__["d" /* o */])(_this.href, ev, _this.routerDirection);
        };
    }
    Anchor.prototype.componentDidLoad = function () {
        console.warn('The <ion-anchor> component has been deprecated. Please use an <ion-router-link> if you are using a vanilla JS or Stencil project or an <a> with the Angular router.');
    };
    Anchor.prototype.render = function () {
        var _a;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        var attrs = {
            href: this.href,
            rel: this.rel
        };
        return (Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], { onClick: this.onClick, class: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__chunk_ba834eff_js__["a" /* c */])(this.color), (_a = {}, _a[mode] = true, _a['ion-activatable'] = true, _a)) }, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("a", Object.assign({}, attrs), Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("slot", null))));
    };
    Object.defineProperty(Anchor, "style", {
        get: function () { return ":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"; },
        enumerable: true,
        configurable: true
    });
    return Anchor;
}());
var LoadingController = /** @class */ (function () {
    function LoadingController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
    }
    /**
     * Create a loading overlay with loading options.
     *
     * @param options The options to use to create the loading.
     */
    LoadingController.prototype.create = function (options) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["h" /* g */])('ion-loading', options);
    };
    /**
     * Dismiss the open loading overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the loading.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the loading.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the loading to dismiss. If an id is not provided, it will dismiss the most recently opened loading.
     */
    LoadingController.prototype.dismiss = function (data, role, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["i" /* h */])(document, data, role, 'ion-loading', id);
    };
    /**
     * Get the most recently opened loading overlay.
     */
    LoadingController.prototype.getTop = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["k" /* j */])(document, 'ion-loading')];
            });
        });
    };
    return LoadingController;
}());
var ModalController = /** @class */ (function () {
    function ModalController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
    }
    /**
     * Create a modal overlay with modal options.
     *
     * @param options The options to use to create the modal.
     */
    ModalController.prototype.create = function (options) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["h" /* g */])('ion-modal', options);
    };
    /**
     * Dismiss the open modal overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the modal.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the modal.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the modal to dismiss. If an id is not provided, it will dismiss the most recently opened modal.
     */
    ModalController.prototype.dismiss = function (data, role, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["i" /* h */])(document, data, role, 'ion-modal', id);
    };
    /**
     * Get the most recently opened modal overlay.
     */
    ModalController.prototype.getTop = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["k" /* j */])(document, 'ion-modal')];
            });
        });
    };
    return ModalController;
}());
var PickerController = /** @class */ (function () {
    function PickerController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
    }
    /**
     * Create a picker overlay with picker options.
     *
     * @param options The options to use to create the picker.
     */
    PickerController.prototype.create = function (options) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["h" /* g */])('ion-picker', options);
    };
    /**
     * Dismiss the open picker overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the picker.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the picker.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the picker to dismiss. If an id is not provided, it will dismiss the most recently opened picker.
     */
    PickerController.prototype.dismiss = function (data, role, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["i" /* h */])(document, data, role, 'ion-picker', id);
    };
    /**
     * Get the most recently opened picker overlay.
     */
    PickerController.prototype.getTop = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["k" /* j */])(document, 'ion-picker')];
            });
        });
    };
    return PickerController;
}());
var PopoverController = /** @class */ (function () {
    function PopoverController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
    }
    /**
     * Create a popover overlay with popover options.
     *
     * @param options The options to use to create the popover.
     */
    PopoverController.prototype.create = function (options) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["h" /* g */])('ion-popover', options);
    };
    /**
     * Dismiss the open popover overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the popover.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the popover.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     * @param id The id of the popover to dismiss. If an id is not provided, it will dismiss the most recently opened popover.
     */
    PopoverController.prototype.dismiss = function (data, role, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["i" /* h */])(document, data, role, 'ion-popover', id);
    };
    /**
     * Get the most recently opened popover overlay.
     */
    PopoverController.prototype.getTop = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["k" /* j */])(document, 'ion-popover')];
            });
        });
    };
    return PopoverController;
}());
var ToastController = /** @class */ (function () {
    function ToastController(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
    }
    /**
     * Create a toast overlay with toast options.
     *
     * @param options The options to use to create the toast.
     */
    ToastController.prototype.create = function (options) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["h" /* g */])('ion-toast', options);
    };
    /**
     * Dismiss the open toast overlay.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the toast. For example, 'cancel' or 'backdrop'.
     * @param id The id of the toast to dismiss. If an id is not provided, it will dismiss the most recently opened toast.
     */
    ToastController.prototype.dismiss = function (data, role, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["i" /* h */])(document, data, role, 'ion-toast', id);
    };
    /**
     * Get the most recently opened toast overlay.
     */
    ToastController.prototype.getTop = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["k" /* j */])(document, 'ion-toast')];
            });
        });
    };
    return ToastController;
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



/***/ })

});
//# sourceMappingURL=69.js.map