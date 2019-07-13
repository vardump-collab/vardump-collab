webpackJsonp([13],{

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_popover", function() { return Popover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chunk_1074393c_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chunk_94c4865f_js__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chunk_d83bfeae_js__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chunk_ba834eff_js__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chunk_00265c49_js__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chunk_638b009b_js__ = __webpack_require__(769);








/**
 * iOS Popover Enter Animation
 */
var iosEnterAnimation = function (AnimationC, baseEl, ev) {
    var originY = 'top';
    var originX = 'left';
    var contentEl = baseEl.querySelector('.popover-content');
    var contentDimentions = contentEl.getBoundingClientRect();
    var contentWidth = contentDimentions.width;
    var contentHeight = contentDimentions.height;
    var bodyWidth = baseEl.ownerDocument.defaultView.innerWidth;
    var bodyHeight = baseEl.ownerDocument.defaultView.innerHeight;
    // If ev was passed, use that for target element
    var targetDim = ev && ev.target && ev.target.getBoundingClientRect();
    var targetTop = targetDim != null && 'top' in targetDim ? targetDim.top : bodyHeight / 2 - contentHeight / 2;
    var targetLeft = targetDim != null && 'left' in targetDim ? targetDim.left : bodyWidth / 2;
    var targetWidth = (targetDim && targetDim.width) || 0;
    var targetHeight = (targetDim && targetDim.height) || 0;
    var arrowEl = baseEl.querySelector('.popover-arrow');
    var arrowDim = arrowEl.getBoundingClientRect();
    var arrowWidth = arrowDim.width;
    var arrowHeight = arrowDim.height;
    if (targetDim == null) {
        arrowEl.style.display = 'none';
    }
    var arrowCSS = {
        top: targetTop + targetHeight,
        left: targetLeft + targetWidth / 2 - arrowWidth / 2
    };
    var popoverCSS = {
        top: targetTop + targetHeight + (arrowHeight - 1),
        left: targetLeft + targetWidth / 2 - contentWidth / 2
    };
    // If the popover left is less than the padding it is off screen
    // to the left so adjust it, else if the width of the popover
    // exceeds the body width it is off screen to the right so adjust
    //
    var checkSafeAreaLeft = false;
    var checkSafeAreaRight = false;
    // If the popover left is less than the padding it is off screen
    // to the left so adjust it, else if the width of the popover
    // exceeds the body width it is off screen to the right so adjust
    // 25 is a random/arbitrary number. It seems to work fine for ios11
    // and iPhoneX. Is it perfect? No. Does it work? Yes.
    if (popoverCSS.left < POPOVER_IOS_BODY_PADDING + 25) {
        checkSafeAreaLeft = true;
        popoverCSS.left = POPOVER_IOS_BODY_PADDING;
    }
    else if (contentWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left + 25 > bodyWidth) {
        // Ok, so we're on the right side of the screen,
        // but now we need to make sure we're still a bit further right
        // cus....notchurally... Again, 25 is random. It works tho
        checkSafeAreaRight = true;
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_IOS_BODY_PADDING;
        originX = 'right';
    }
    // make it pop up if there's room above
    if (targetTop + targetHeight + contentHeight > bodyHeight && targetTop - contentHeight > 0) {
        arrowCSS.top = targetTop - (arrowHeight + 1);
        popoverCSS.top = targetTop - contentHeight - (arrowHeight - 1);
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom';
        // If there isn't room for it to pop up above the target cut it off
    }
    else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
    }
    arrowEl.style.top = arrowCSS.top + 'px';
    arrowEl.style.left = arrowCSS.left + 'px';
    contentEl.style.top = popoverCSS.top + 'px';
    contentEl.style.left = popoverCSS.left + 'px';
    if (checkSafeAreaLeft) {
        contentEl.style.left = "calc(" + popoverCSS.left + "px + var(--ion-safe-area-left, 0px))";
    }
    if (checkSafeAreaRight) {
        contentEl.style.left = "calc(" + popoverCSS.left + "px - var(--ion-safe-area-right, 0px))";
    }
    contentEl.style.transformOrigin = originY + ' ' + originX;
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    backdropAnimation.fromTo('opacity', 0.01, 0.08);
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.01, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(100)
        .add(backdropAnimation)
        .add(wrapperAnimation));
};
var POPOVER_IOS_BODY_PADDING = 5;
/**
 * iOS Popover Leave Animation
 */
var iosLeaveAnimation = function (AnimationC, baseEl) {
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    backdropAnimation.fromTo('opacity', 0.08, 0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(500)
        .add(backdropAnimation)
        .add(wrapperAnimation));
};
/**
 * Md Popover Enter Animation
 */
var mdEnterAnimation = function (AnimationC, baseEl, ev) {
    var doc = baseEl.ownerDocument;
    var isRTL = doc.dir === 'rtl';
    var originY = 'top';
    var originX = isRTL ? 'right' : 'left';
    var contentEl = baseEl.querySelector('.popover-content');
    var contentDimentions = contentEl.getBoundingClientRect();
    var contentWidth = contentDimentions.width;
    var contentHeight = contentDimentions.height;
    var bodyWidth = doc.defaultView.innerWidth;
    var bodyHeight = doc.defaultView.innerHeight;
    // If ev was passed, use that for target element
    var targetDim = ev && ev.target && ev.target.getBoundingClientRect();
    // As per MD spec, by default position the popover below the target (trigger) element
    var targetTop = targetDim != null && 'bottom' in targetDim
        ? targetDim.bottom
        : bodyHeight / 2 - contentHeight / 2;
    var targetLeft = targetDim != null && 'left' in targetDim
        ? isRTL
            ? targetDim.left - contentWidth + targetDim.width
            : targetDim.left
        : bodyWidth / 2 - contentWidth / 2;
    var targetHeight = (targetDim && targetDim.height) || 0;
    var popoverCSS = {
        top: targetTop,
        left: targetLeft
    };
    // If the popover left is less than the padding it is off screen
    // to the left so adjust it, else if the width of the popover
    // exceeds the body width it is off screen to the right so adjust
    if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
        popoverCSS.left = POPOVER_MD_BODY_PADDING;
        // Same origin in this case for both LTR & RTL
        // Note: in LTR, originX is already 'left'
        originX = 'left';
    }
    else if (contentWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left >
        bodyWidth) {
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_MD_BODY_PADDING;
        // Same origin in this case for both LTR & RTL
        // Note: in RTL, originX is already 'right'
        originX = 'right';
    }
    // If the popover when popped down stretches past bottom of screen,
    // make it pop up if there's room above
    if (targetTop + targetHeight + contentHeight > bodyHeight &&
        targetTop - contentHeight > 0) {
        popoverCSS.top = targetTop - contentHeight - targetHeight;
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom';
        // If there isn't room for it to pop up above the target cut it off
    }
    else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
    }
    contentEl.style.top = popoverCSS.top + 'px';
    contentEl.style.left = popoverCSS.left + 'px';
    contentEl.style.transformOrigin = originY + ' ' + originX;
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.01, 1);
    var contentAnimation = new AnimationC();
    contentAnimation.addElement(baseEl.querySelector('.popover-content'));
    contentAnimation.fromTo('scale', 0.001, 1);
    var viewportAnimation = new AnimationC();
    viewportAnimation.addElement(baseEl.querySelector('.popover-viewport'));
    viewportAnimation.fromTo('opacity', 0.01, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(300)
        .add(backdropAnimation)
        .add(wrapperAnimation)
        .add(contentAnimation)
        .add(viewportAnimation));
};
var POPOVER_MD_BODY_PADDING = 12;
/**
 * Md Popover Leave Animation
 */
var mdLeaveAnimation = function (AnimationC, baseEl) {
    var baseAnimation = new AnimationC();
    var backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    var wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    backdropAnimation.fromTo('opacity', 0.32, 0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(500)
        .add(backdropAnimation)
        .add(wrapperAnimation));
};
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Popover = /** @class */ (function () {
    function Popover(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.presented = false;
        this.mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * If `true`, the popover will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, a backdrop will be displayed behind the popover.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the popover will be translucent.
         */
        this.translucent = false;
        /**
         * If `true`, the popover will animate.
         */
        this.animated = true;
        this.didPresent = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionPopoverDidPresent", 7);
        this.willPresent = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionPopoverWillPresent", 7);
        this.willDismiss = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionPopoverWillDismiss", 7);
        this.didDismiss = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionPopoverDidDismiss", 7);
    }
    Popover.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Popover.prototype.onBackdropTap = function () {
        this.dismiss(undefined, __WEBPACK_IMPORTED_MODULE_4__chunk_d83bfeae_js__["a" /* B */]);
    };
    Popover.prototype.lifecycle = function (modalEvent) {
        var el = this.usersElement;
        var name = LIFECYCLE_MAP[modalEvent.type];
        if (el && name) {
            var event = new CustomEvent(name, {
                bubbles: false,
                cancelable: false,
                detail: modalEvent.detail
            });
            el.dispatchEvent(event);
        }
    };
    /**
     * Present the popover overlay after it has been created.
     */
    Popover.prototype.present = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var container, data, _a;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.presented) {
                            return [2 /*return*/];
                        }
                        container = this.el.querySelector('.popover-content');
                        if (!container) {
                            throw new Error('container is undefined');
                        }
                        data = Object.assign({}, this.componentProps, { popover: this.el });
                        _a = this;
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_6__chunk_00265c49_js__["a"])(this.delegate, container, this.component, ['popover-viewport', this.el['s-sc']], data)];
                    case 1:
                        _a.usersElement = _b.sent();
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_7__chunk_638b009b_js__["a" /* d */])(this.usersElement)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_4__chunk_d83bfeae_js__["e" /* d */])(this, 'popoverEnter', iosEnterAnimation, mdEnterAnimation, this.event)];
                }
            });
        });
    };
    /**
     * Dismiss the popover overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'.
     */
    Popover.prototype.dismiss = function (data, role) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var shouldDismiss;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_4__chunk_d83bfeae_js__["f" /* e */])(this, data, role, 'popoverLeave', iosLeaveAnimation, mdLeaveAnimation, this.event)];
                    case 1:
                        shouldDismiss = _a.sent();
                        if (!shouldDismiss) return [3 /*break*/, 3];
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_6__chunk_00265c49_js__["b" /* d */])(this.delegate, this.usersElement)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, shouldDismiss];
                }
            });
        });
    };
    /**
     * Returns a promise that resolves when the popover did dismiss.
     */
    Popover.prototype.onDidDismiss = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_4__chunk_d83bfeae_js__["g" /* f */])(this.el, 'ionPopoverDidDismiss');
    };
    /**
     * Returns a promise that resolves when the popover will dismiss.
     */
    Popover.prototype.onWillDismiss = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_4__chunk_d83bfeae_js__["g" /* f */])(this.el, 'ionPopoverWillDismiss');
    };
    Popover.prototype.hostData = function () {
        var _a;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        return {
            'aria-modal': 'true',
            'no-router': true,
            style: {
                zIndex: 20000 + this.overlayIndex,
            },
            class: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_5__chunk_ba834eff_js__["b" /* g */])(this.cssClass), (_a = {}, _a[mode] = true, _a['popover-translucent'] = this.translucent, _a))
        };
    };
    Popover.prototype.__stencil_render = function () {
        return [
            Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-backdrop", { tappable: this.backdropDismiss, visible: this.showBackdrop }),
            Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("div", { class: "popover-wrapper" }, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("div", { class: "popover-arrow" }), Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("div", { class: "popover-content" }))
        ];
    };
    Object.defineProperty(Popover.prototype, "el", {
        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["f" /* e */])(this); },
        enumerable: true,
        configurable: true
    });
    Popover.prototype.render = function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Popover, "style", {
        get: function () { return ".sc-ion-popover-ios-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1000}.overlay-hidden.sc-ion-popover-ios-h{display:none}.popover-wrapper.sc-ion-popover-ios{opacity:0;z-index:10}.popover-content.sc-ion-popover-ios{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-ios{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-ios-h{--width:200px;--max-height:90%;--box-shadow:none}.popover-content.sc-ion-popover-ios{border-radius:10px}.popover-arrow.sc-ion-popover-ios{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow.sc-ion-popover-ios:after{left:3px;top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:\"\";z-index:10}[dir=rtl].sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after, [dir=rtl] .sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after, [dir=rtl].sc-ion-popover-ios .popover-arrow.sc-ion-popover-ios:after{left:unset;right:unset;right:3px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios{top:auto;bottom:-10px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after{top:-6px}.popover-translucent.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after, .popover-translucent.sc-ion-popover-ios-h .popover-content.sc-ion-popover-ios{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}"; },
        enumerable: true,
        configurable: true
    });
    return Popover;
}());
var LIFECYCLE_MAP = {
    'ionPopoverDidPresent': 'ionViewDidEnter',
    'ionPopoverWillPresent': 'ionViewWillEnter',
    'ionPopoverWillDismiss': 'ionViewWillLeave',
    'ionPopoverDidDismiss': 'ionViewDidLeave',
};



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

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return detachComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
var _this = this;

var attachComponent = function (delegate, container, component, cssClasses, componentProps) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var el;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                if (delegate) {
                    return [2 /*return*/, delegate.attachViewToDom(container, component, componentProps, cssClasses)];
                }
                if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
                    throw new Error('framework delegate is missing');
                }
                el = (typeof component === 'string')
                    ? container.ownerDocument && container.ownerDocument.createElement(component)
                    : component;
                if (cssClasses) {
                    cssClasses.forEach(function (c) { return el.classList.add(c); });
                }
                if (componentProps) {
                    Object.assign(el, componentProps);
                }
                container.appendChild(el);
                if (!el.componentOnReady) return [3 /*break*/, 2];
                return [4 /*yield*/, el.componentOnReady()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/, el];
        }
    });
}); };
var detachComponent = function (delegate, element) {
    if (element) {
        if (delegate) {
            var container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
        }
        element.remove();
    }
    return Promise.resolve();
};



/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deepReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lifecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setPageHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return transition; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chunk_94c4865f_js__ = __webpack_require__(452);
var _this = this;



var iosTransitionAnimation = function () { return __webpack_require__.e/* import() */(116).then(__webpack_require__.bind(null, 771)); };
var mdTransitionAnimation = function () { return __webpack_require__.e/* import() */(115).then(__webpack_require__.bind(null, 772)); };
var transition = function (opts) {
    return new Promise(function (resolve, reject) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["n" /* w */])(function () {
            beforeTransition(opts);
            runTransition(opts).then(function (result) {
                if (result.animation) {
                    result.animation.destroy();
                }
                afterTransition(opts);
                resolve(result);
            }, function (error) {
                afterTransition(opts);
                reject(error);
            });
        });
    });
};
var beforeTransition = function (opts) {
    var enteringEl = opts.enteringEl;
    var leavingEl = opts.leavingEl;
    setZIndex(enteringEl, leavingEl, opts.direction);
    if (opts.showGoBack) {
        enteringEl.classList.add('can-go-back');
    }
    else {
        enteringEl.classList.remove('can-go-back');
    }
    setPageHidden(enteringEl, false);
    if (leavingEl) {
        setPageHidden(leavingEl, false);
    }
};
var runTransition = function (opts) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var animationBuilder, ani;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAnimationBuilder(opts)];
            case 1:
                animationBuilder = _a.sent();
                ani = (animationBuilder)
                    ? animation(animationBuilder, opts)
                    : noAnimation(opts);
                return [2 /*return*/, ani];
        }
    });
}); };
var afterTransition = function (opts) {
    var enteringEl = opts.enteringEl;
    var leavingEl = opts.leavingEl;
    enteringEl.classList.remove('ion-page-invisible');
    if (leavingEl !== undefined) {
        leavingEl.classList.remove('ion-page-invisible');
    }
};
var getAnimationBuilder = function (opts) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var builder, _a;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!opts.leavingEl || !opts.animated || opts.duration === 0) {
                    return [2 /*return*/, undefined];
                }
                if (opts.animationBuilder) {
                    return [2 /*return*/, opts.animationBuilder];
                }
                if (!(opts.mode === 'ios')) return [3 /*break*/, 2];
                return [4 /*yield*/, iosTransitionAnimation()];
            case 1:
                _a = (_b.sent()).iosTransitionAnimation;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, mdTransitionAnimation()];
            case 3:
                _a = (_b.sent()).mdTransitionAnimation;
                _b.label = 4;
            case 4:
                builder = _a;
                return [2 /*return*/, builder];
        }
    });
}); };
var animation = function (animationBuilder, opts) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var trans;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waitForReady(opts, true)];
            case 1:
                _a.sent();
                return [4 /*yield*/, __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 657)).then(function (mod) { return mod.create(animationBuilder, opts.baseEl, opts); })];
            case 2:
                trans = _a.sent();
                fireWillEvents(opts.enteringEl, opts.leavingEl);
                return [4 /*yield*/, playTransition(trans, opts)];
            case 3:
                _a.sent();
                if (opts.progressCallback) {
                    opts.progressCallback(undefined);
                }
                if (trans.hasCompleted) {
                    fireDidEvents(opts.enteringEl, opts.leavingEl);
                }
                return [2 /*return*/, {
                        hasCompleted: trans.hasCompleted,
                        animation: trans
                    }];
        }
    });
}); };
var noAnimation = function (opts) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var enteringEl, leavingEl;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                enteringEl = opts.enteringEl;
                leavingEl = opts.leavingEl;
                return [4 /*yield*/, waitForReady(opts, false)];
            case 1:
                _a.sent();
                fireWillEvents(enteringEl, leavingEl);
                fireDidEvents(enteringEl, leavingEl);
                return [2 /*return*/, {
                        hasCompleted: true
                    }];
        }
    });
}); };
var waitForReady = function (opts, defaultDeep) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var deep, promises;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                deep = opts.deepWait !== undefined ? opts.deepWait : defaultDeep;
                promises = deep ? [
                    deepReady(opts.enteringEl),
                    deepReady(opts.leavingEl),
                ] : [
                    shallowReady(opts.enteringEl),
                    shallowReady(opts.leavingEl),
                ];
                return [4 /*yield*/, Promise.all(promises)];
            case 1:
                _a.sent();
                return [4 /*yield*/, notifyViewReady(opts.viewIsReady, opts.enteringEl)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var notifyViewReady = function (viewIsReady, enteringEl) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!viewIsReady) return [3 /*break*/, 2];
                return [4 /*yield*/, viewIsReady(enteringEl)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var playTransition = function (trans, opts) {
    var progressCallback = opts.progressCallback;
    var promise = new Promise(function (resolve) { return trans.onFinish(resolve); });
    // cool, let's do this, start the transition
    if (progressCallback) {
        // this is a swipe to go back, just get the transition progress ready
        // kick off the swipe animation start
        trans.progressStart();
        progressCallback(trans);
    }
    else {
        // only the top level transition should actually start "play"
        // kick it off and let it play through
        // ******** DOM WRITE ****************
        trans.play();
    }
    // create a callback for when the animation is done
    return promise;
};
var fireWillEvents = function (enteringEl, leavingEl) {
    lifecycle(leavingEl, __WEBPACK_IMPORTED_MODULE_2__chunk_94c4865f_js__["c" /* b */]);
    lifecycle(enteringEl, __WEBPACK_IMPORTED_MODULE_2__chunk_94c4865f_js__["a" /* L */]);
};
var fireDidEvents = function (enteringEl, leavingEl) {
    lifecycle(enteringEl, __WEBPACK_IMPORTED_MODULE_2__chunk_94c4865f_js__["b" /* a */]);
    lifecycle(leavingEl, __WEBPACK_IMPORTED_MODULE_2__chunk_94c4865f_js__["d" /* c */]);
};
var lifecycle = function (el, eventName) {
    if (el) {
        var ev = new CustomEvent(eventName, {
            bubbles: false,
            cancelable: false,
        });
        el.dispatchEvent(ev);
    }
};
var shallowReady = function (el) {
    if (el && el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve();
};
var deepReady = function (el) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](_this, void 0, void 0, function () {
    var element, stencilEl;
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                element = el;
                if (!element) return [3 /*break*/, 4];
                if (!(element.componentOnReady != null)) return [3 /*break*/, 2];
                return [4 /*yield*/, element.componentOnReady()];
            case 1:
                stencilEl = _a.sent();
                if (stencilEl != null) {
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2: return [4 /*yield*/, Promise.all(Array.from(element.children).map(deepReady))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var setPageHidden = function (el, hidden) {
    if (hidden) {
        el.setAttribute('aria-hidden', 'true');
        el.classList.add('ion-page-hidden');
    }
    else {
        el.hidden = false;
        el.removeAttribute('aria-hidden');
        el.classList.remove('ion-page-hidden');
    }
};
var setZIndex = function (enteringEl, leavingEl, direction) {
    if (enteringEl !== undefined) {
        enteringEl.style.zIndex = (direction === 'back')
            ? '99'
            : '101';
    }
    if (leavingEl !== undefined) {
        leavingEl.style.zIndex = '100';
    }
};



/***/ })

});
//# sourceMappingURL=13.js.map