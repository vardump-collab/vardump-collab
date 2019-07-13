webpackJsonp([112],{

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startStatusTap", function() { return startStatusTap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_1074393c_js__ = __webpack_require__(83);


var startStatusTap = function () {
    var win = window;
    win.addEventListener('statusTap', function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["g" /* f */])(function () {
            var width = win.innerWidth;
            var height = win.innerHeight;
            var el = document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            var contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(function () {
                    Object(__WEBPACK_IMPORTED_MODULE_0__chunk_09ec7fc0_js__["n" /* w */])(function () { return contentEl.scrollToTop(300); });
                });
            }
        });
    });
};



/***/ })

});
//# sourceMappingURL=112.js.map