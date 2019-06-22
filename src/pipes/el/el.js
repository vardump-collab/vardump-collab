var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the ElPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ElPipe = /** @class */ (function () {
    function ElPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ElPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var retorno = "";
        if (value == "1") {
            retorno = "Horribles";
        }
        if (value == "2") {
            retorno = "Feos";
        }
        if (value == "3") {
            retorno = "Pasable";
        }
        if (value == "4") {
            retorno = "Regular";
        }
        if (value == "5") {
            retorno = "Buenos";
        }
        if (value == "6") {
            retorno = "Ricos";
        }
        if (value == "7") {
            retorno = "Muy ricos";
        }
        return retorno;
    };
    ElPipe = __decorate([
        Pipe({
            name: 'elPipe',
        })
    ], ElPipe);
    return ElPipe;
}());
export { ElPipe };
//# sourceMappingURL=el.js.map