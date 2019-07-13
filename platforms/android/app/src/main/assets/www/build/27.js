webpackJsonp([27],{

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_select", function() { return Select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_select_option", function() { return SelectOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_select_popover", function() { return SelectPopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chunk_1074393c_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chunk_ba834eff_js__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__ = __webpack_require__(765);






/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Select = /** @class */ (function () {
    function Select(hostRef) {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.childOpts = [];
        this.inputId = "ion-sel-" + selectIds++;
        this.didInit = false;
        this.isExpanded = false;
        /**
         * If `true`, the user cannot interact with the select.
         */
        this.disabled = false;
        /**
         * The text to display on the cancel button.
         */
        this.cancelText = 'Cancel';
        /**
         * The text to display on the ok button.
         */
        this.okText = 'OK';
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the select can accept multiple values.
         */
        this.multiple = false;
        /**
         * The interface the select should use: `action-sheet`, `popover` or `alert`.
         */
        this.interface = 'alert';
        /**
         * Any additional options that the `alert`, `action-sheet` or `popover` interface
         * can take. See the [AlertController API docs](../../alert/AlertController/#create), the
         * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) and the
         * [PopoverController API docs](../../popover/PopoverController/#create) for the
         * create options for each interface.
         */
        this.interfaceOptions = {};
        this.onClick = function (ev) {
            _this.setFocus();
            _this.open(ev);
        };
        this.onFocus = function () {
            _this.ionFocus.emit();
        };
        this.onBlur = function () {
            _this.ionBlur.emit();
        };
        this.ionChange = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionChange", 7);
        this.ionCancel = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionCancel", 7);
        this.ionFocus = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionFocus", 7);
        this.ionBlur = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionBlur", 7);
        this.ionStyle = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionStyle", 7);
    }
    Select.prototype.disabledChanged = function () {
        this.emitStyle();
    };
    Select.prototype.valueChanged = function () {
        if (this.didInit) {
            this.updateOptions();
            this.ionChange.emit({
                value: this.value,
            });
            this.emitStyle();
        }
    };
    Select.prototype.selectOptionChanged = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadOptions()];
                    case 1:
                        _a.sent();
                        if (this.didInit) {
                            this.updateOptions();
                            this.updateOverlayOptions();
                            this.emitStyle();
                            /**
                             * In the event that options
                             * are not loaded at component load
                             * this ensures that any value that is
                             * set is properly rendered once
                             * options have been loaded
                             */
                            if (this.value !== undefined) {
                                this.el.forceUpdate();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.componentDidLoad = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var checked, checked;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadOptions()];
                    case 1:
                        _a.sent();
                        if (this.value === undefined) {
                            if (this.multiple) {
                                checked = this.childOpts.filter(function (o) { return o.selected; });
                                this.value = checked.map(function (o) { return o.value; });
                            }
                            else {
                                checked = this.childOpts.find(function (o) { return o.selected; });
                                if (checked) {
                                    this.value = checked.value;
                                }
                            }
                        }
                        this.updateOptions();
                        this.emitStyle();
                        this.el.forceUpdate();
                        this.didInit = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Open the select overlay. The overlay is either an alert, action sheet, or popover,
     * depending on the `interface` property on the `ion-select`.
     *
     * @param event The user interface event that called the open.
     */
    Select.prototype.open = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var overlay, _a;
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.disabled || this.isExpanded) {
                            return [2 /*return*/, undefined];
                        }
                        _a = this;
                        return [4 /*yield*/, this.createOverlay(event)];
                    case 1:
                        overlay = _a.overlay = _b.sent();
                        this.isExpanded = true;
                        overlay.onDidDismiss().then(function () {
                            _this.overlay = undefined;
                            _this.isExpanded = false;
                            _this.setFocus();
                        });
                        return [4 /*yield*/, overlay.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, overlay];
                }
            });
        });
    };
    Select.prototype.createOverlay = function (ev) {
        var selectInterface = this.interface;
        if ((selectInterface === 'action-sheet' || selectInterface === 'popover') && this.multiple) {
            console.warn("Select interface cannot be \"" + selectInterface + "\" with a multi-value select. Using the \"alert\" interface instead.");
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover' && !ev) {
            console.warn('Select interface cannot be a "popover" without passing an event. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover') {
            return this.openPopover(ev);
        }
        if (selectInterface === 'action-sheet') {
            return this.openActionSheet();
        }
        return this.openAlert();
    };
    Select.prototype.updateOverlayOptions = function () {
        if (!this.overlay) {
            return;
        }
        var overlay = this.overlay;
        switch (this.interface) {
            case 'action-sheet':
                overlay.buttons = this.createActionSheetButtons(this.childOpts);
                break;
            case 'popover':
                var popover = overlay.querySelector('ion-select-popover');
                if (popover) {
                    popover.options = this.createPopoverOptions(this.childOpts);
                }
                break;
            default:
                var inputType = (this.multiple ? 'checkbox' : 'radio');
                overlay.inputs = this.createAlertInputs(this.childOpts, inputType);
                break;
        }
    };
    Select.prototype.createActionSheetButtons = function (data) {
        var _this = this;
        var actionSheetButtons = data.map(function (option) {
            return {
                role: (option.selected ? 'selected' : ''),
                text: option.textContent,
                handler: function () {
                    _this.value = option.value;
                }
            };
        });
        // Add "cancel" button
        actionSheetButtons.push({
            text: this.cancelText,
            role: 'cancel',
            handler: function () {
                _this.ionCancel.emit();
            }
        });
        return actionSheetButtons;
    };
    Select.prototype.createAlertInputs = function (data, inputType) {
        return data.map(function (o) {
            return {
                type: inputType,
                label: o.textContent,
                value: o.value,
                checked: o.selected,
                disabled: o.disabled
            };
        });
    };
    Select.prototype.createPopoverOptions = function (data) {
        var _this = this;
        return data.map(function (o) {
            return {
                text: o.textContent,
                value: o.value,
                checked: o.selected,
                disabled: o.disabled,
                handler: function () {
                    _this.value = o.value;
                    _this.close();
                }
            };
        });
    };
    Select.prototype.openPopover = function (ev) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var interfaceOptions, mode, popoverOpts;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                interfaceOptions = this.interfaceOptions;
                mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
                popoverOpts = Object.assign({ mode: mode }, interfaceOptions, { component: 'ion-select-popover', cssClass: ['select-popover', interfaceOptions.cssClass], event: ev, componentProps: {
                        header: interfaceOptions.header,
                        subHeader: interfaceOptions.subHeader,
                        message: interfaceOptions.message,
                        value: this.value,
                        options: this.createPopoverOptions(this.childOpts)
                    } });
                return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["d" /* c */].create(popoverOpts)];
            });
        });
    };
    Select.prototype.openActionSheet = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var mode, interfaceOptions, actionSheetOpts;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
                interfaceOptions = this.interfaceOptions;
                actionSheetOpts = Object.assign({ mode: mode }, interfaceOptions, { buttons: this.createActionSheetButtons(this.childOpts), cssClass: ['select-action-sheet', interfaceOptions.cssClass] });
                return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["c" /* b */].create(actionSheetOpts)];
            });
        });
    };
    Select.prototype.openAlert = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var label, labelText, interfaceOptions, inputType, mode, alertOpts;
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                label = this.getLabel();
                labelText = (label) ? label.textContent : null;
                interfaceOptions = this.interfaceOptions;
                inputType = (this.multiple ? 'checkbox' : 'radio');
                mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
                alertOpts = Object.assign({ mode: mode }, interfaceOptions, { header: interfaceOptions.header ? interfaceOptions.header : labelText, inputs: this.createAlertInputs(this.childOpts, inputType), buttons: [
                        {
                            text: this.cancelText,
                            role: 'cancel',
                            handler: function () {
                                _this.ionCancel.emit();
                            }
                        },
                        {
                            text: this.okText,
                            handler: function (selectedValues) {
                                _this.value = selectedValues;
                            }
                        }
                    ], cssClass: ['select-alert', interfaceOptions.cssClass,
                        (this.multiple ? 'multiple-select-alert' : 'single-select-alert')] });
                return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["b" /* a */].create(alertOpts)];
            });
        });
    };
    /**
     * Close the select interface.
     */
    Select.prototype.close = function () {
        // TODO check !this.overlay || !this.isFocus()
        if (!this.overlay) {
            return Promise.resolve(false);
        }
        return this.overlay.dismiss();
    };
    Select.prototype.loadOptions = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Promise.all(Array.from(this.el.querySelectorAll('ion-select-option')).map(function (o) { return o.componentOnReady(); }))];
                    case 1:
                        _a.childOpts = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.updateOptions = function () {
        // iterate all options, updating the selected prop
        var canSelect = true;
        for (var _i = 0, _a = this.childOpts; _i < _a.length; _i++) {
            var selectOption = _a[_i];
            var selected = canSelect && isOptionSelected(this.value, selectOption.value, this.compareWith);
            selectOption.selected = selected;
            // if current option is selected and select is single-option, we can't select
            // any option more
            if (selected && !this.multiple) {
                canSelect = false;
            }
        }
    };
    Select.prototype.getLabel = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["f"])(this.el);
    };
    Select.prototype.hasValue = function () {
        return this.getText() !== '';
    };
    Select.prototype.getText = function () {
        var selectedText = this.selectedText;
        if (selectedText != null && selectedText !== '') {
            return selectedText;
        }
        return generateText(this.childOpts, this.value, this.compareWith);
    };
    Select.prototype.setFocus = function () {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    };
    Select.prototype.emitStyle = function () {
        this.ionStyle.emit({
            'interactive': true,
            'select': true,
            'has-placeholder': this.placeholder != null,
            'has-value': this.hasValue(),
            'interactive-disabled': this.disabled,
            'select-disabled': this.disabled
        });
    };
    Select.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, placeholder = _b.placeholder, name = _b.name, disabled = _b.disabled, isExpanded = _b.isExpanded, value = _b.value, el = _b.el;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        var labelId = this.inputId + '-lbl';
        var label = Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["f"])(el);
        if (label) {
            label.id = labelId;
        }
        var addPlaceholderClass = false;
        var selectText = this.getText();
        if (selectText === '' && placeholder != null) {
            selectText = placeholder;
            addPlaceholderClass = true;
        }
        Object(__WEBPACK_IMPORTED_MODULE_5__chunk_c90aaa66_js__["k" /* r */])(true, el, name, parseValue(value), disabled);
        var selectTextClasses = {
            'select-text': true,
            'select-placeholder': addPlaceholderClass
        };
        return (Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], { onClick: this.onClick, role: "combobox", "aria-haspopup": "dialog", "aria-disabled": disabled ? 'true' : null, "aria-expanded": "" + isExpanded, "aria-labelledby": labelId, class: (_a = {},
                _a[mode] = true,
                _a['in-item'] = Object(__WEBPACK_IMPORTED_MODULE_4__chunk_ba834eff_js__["c" /* h */])('ion-item', el),
                _a['select-disabled'] = disabled,
                _a) }, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("div", { class: selectTextClasses }, selectText), Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("div", { class: "select-icon", role: "presentation" }, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("div", { class: "select-icon-inner" })), Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: disabled, ref: (function (btnEl) { return _this.buttonEl = btnEl; }) })));
    };
    Object.defineProperty(Select.prototype, "el", {
        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["f" /* e */])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select, "watchers", {
        get: function () {
            return {
                "disabled": ["disabledChanged"],
                "value": ["valueChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select, "style", {
        get: function () { return ":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;font-family:var(--ion-font-family,inherit);overflow:hidden;z-index:2}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static;max-width:45%}:host(.select-disabled){opacity:.4;pointer-events:none}:host(.ion-focused) button{border:2px solid #5e9ed6}.select-placeholder{color:currentColor;opacity:.33}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.select-icon{position:relative}.select-text{-ms-flex:1;flex:1;min-width:16px;font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-icon-inner{left:5px;top:50%;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:.33;pointer-events:none}:host-context([dir=rtl]) .select-icon-inner,[dir=rtl] .select-icon-inner{left:unset;right:unset;right:5px}:host{--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:16px}.select-icon{width:12px;height:18px}"; },
        enumerable: true,
        configurable: true
    });
    return Select;
}());
var parseValue = function (value) {
    if (value == null) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value.join(',');
    }
    return value.toString();
};
var isOptionSelected = function (currentValue, compareValue, compareWith) {
    if (currentValue === undefined) {
        return false;
    }
    if (Array.isArray(currentValue)) {
        return currentValue.some(function (val) { return compareOptions(val, compareValue, compareWith); });
    }
    else {
        return compareOptions(currentValue, compareValue, compareWith);
    }
};
var compareOptions = function (currentValue, compareValue, compareWith) {
    if (typeof compareWith === 'function') {
        return compareWith(currentValue, compareValue);
    }
    else if (typeof compareWith === 'string') {
        return currentValue[compareWith] === compareValue[compareWith];
    }
    else {
        return currentValue === compareValue;
    }
};
var generateText = function (opts, value, compareWith) {
    if (value === undefined) {
        return '';
    }
    if (Array.isArray(value)) {
        return value
            .map(function (v) { return textForValue(opts, v, compareWith); })
            .filter(function (opt) { return opt !== null; })
            .join(', ');
    }
    else {
        return textForValue(opts, value, compareWith) || '';
    }
};
var textForValue = function (opts, value, compareWith) {
    var selectOpt = opts.find(function (opt) {
        return compareOptions(opt.value, value, compareWith);
    });
    return selectOpt
        ? selectOpt.textContent
        : null;
};
var selectIds = 0;
var SelectOption = /** @class */ (function () {
    function SelectOption(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        this.inputId = "ion-selopt-" + selectOptionIds++;
        /**
         * If `true`, the user cannot interact with the select option.
         */
        this.disabled = false;
        /**
         * If `true`, the element is selected.
         */
        this.selected = false;
        this.ionSelectOptionDidLoad = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionSelectOptionDidLoad", 7);
        this.ionSelectOptionDidUnload = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["e" /* d */])(this, "ionSelectOptionDidUnload", 7);
    }
    SelectOption.prototype.componentWillLoad = function () {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    };
    SelectOption.prototype.componentDidLoad = function () {
        this.ionSelectOptionDidLoad.emit();
    };
    SelectOption.prototype.componentDidUnload = function () {
        this.ionSelectOptionDidUnload.emit();
    };
    SelectOption.prototype.hostData = function () {
        var _a;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        return {
            'role': 'option',
            'id': this.inputId,
            class: (_a = {},
                _a[mode] = true,
                _a)
        };
    };
    Object.defineProperty(SelectOption.prototype, "el", {
        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["f" /* e */])(this); },
        enumerable: true,
        configurable: true
    });
    SelectOption.prototype.render = function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], this.hostData()); };
    Object.defineProperty(SelectOption, "style", {
        get: function () { return ":host{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return SelectOption;
}());
var selectOptionIds = 0;
/**
 * @internal
 */
var SelectPopover = /** @class */ (function () {
    function SelectPopover(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["m" /* r */])(this, hostRef);
        /** Array of options for the popover */
        this.options = [];
    }
    SelectPopover.prototype.onSelect = function (ev) {
        var option = this.options.find(function (o) { return o.value === ev.target.value; });
        if (option) {
            Object(__WEBPACK_IMPORTED_MODULE_3__chunk_d83bfeae_js__["o" /* s */])(option.handler);
        }
    };
    SelectPopover.prototype.hostData = function () {
        var _a;
        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["d" /* c */])(this);
        return {
            class: (_a = {},
                _a[mode] = true,
                _a)
        };
    };
    SelectPopover.prototype.__stencil_render = function () {
        return (Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-list", null, this.header !== undefined && Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-list-header", null, this.header), (this.subHeader !== undefined || this.message !== undefined) &&
            Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-item", null, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-label", { "text-wrap": true }, this.subHeader !== undefined && Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("h3", null, this.subHeader), this.message !== undefined && Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("p", null, this.message))), Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-radio-group", null, this.options.map(function (option) { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-item", null, Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-label", null, option.text), Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])("ion-radio", { checked: option.checked, value: option.value, disabled: option.disabled })); }))));
    };
    SelectPopover.prototype.render = function () { return Object(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["i" /* h */])(__WEBPACK_IMPORTED_MODULE_1__chunk_09ec7fc0_js__["a" /* H */], this.hostData(), this.__stencil_render()); };
    Object.defineProperty(SelectPopover, "style", {
        get: function () { return ".sc-ion-select-popover-h ion-list.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:-1px;margin-bottom:-1px}.sc-ion-select-popover-h ion-label.sc-ion-select-popover, .sc-ion-select-popover-h ion-list-header.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"; },
        enumerable: true,
        configurable: true
    });
    return SelectPopover;
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



/***/ })

});
//# sourceMappingURL=27.js.map