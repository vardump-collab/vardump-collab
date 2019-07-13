webpackJsonp([81],{

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_img", function() { return Img; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_1074393c_js__ = __webpack_require__(83);


var Img = /** @class */ (function () {
    function Img(hostRef) {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.onLoad = function () {
            _this.ionImgDidLoad.emit();
        };
        this.onError = function () {
            _this.ionError.emit();
        };
        this.ionImgWillLoad = Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["e" /* d */])(this, "ionImgWillLoad", 7);
        this.ionImgDidLoad = Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["e" /* d */])(this, "ionImgDidLoad", 7);
        this.ionError = Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["e" /* d */])(this, "ionError", 7);
    }
    Img.prototype.srcChanged = function () {
        this.addIO();
    };
    Img.prototype.componentDidLoad = function () {
        this.addIO();
    };
    Img.prototype.addIO = function () {
        var _this = this;
        if (this.src === undefined) {
            return;
        }
        if ('IntersectionObserver' in window) {
            this.removeIO();
            this.io = new IntersectionObserver(function (data) {
                // because there will only ever be one instance
                // of the element we are observing
                // we can just use data[0]
                if (data[0].isIntersecting) {
                    _this.load();
                    _this.removeIO();
                }
            });
            this.io.observe(this.el);
        }
        else {
            // fall back to setTimeout for Safari and IE
            setTimeout(function () { return _this.load(); }, 200);
        }
    };
    Img.prototype.load = function () {
        this.loadError = this.onError;
        this.loadSrc = this.src;
        this.ionImgWillLoad.emit();
    };
    Img.prototype.removeIO = function () {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    };
    Img.prototype.hostData = function () {
        var _a;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["d" /* c */])(this);
        return {
            class: (_a = {},
                _a[mode] = true,
                _a)
        };
    };
    Img.prototype.__stencil_render = function () {
        return (Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["i" /* h */])("img", { src: this.loadSrc, alt: this.alt, decoding: "async", onLoad: this.onLoad, onError: this.loadError }));
    };
    Object.defineProperty(Img.prototype, "el", {
        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["f" /* e */])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Img, "watchers", {
        get: function () {
            return {
                "src": ["srcChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Img.prototype.render = function () { return Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["a" /* H */], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Img, "style", {
        get: function () { return ":host{-o-object-fit:contain;object-fit:contain}:host,img{display:block}img{width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}"; },
        enumerable: true,
        configurable: true
    });
    return Img;
}());



/***/ })

});
//# sourceMappingURL=81.js.map