var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the TiempoDesdeAhoraPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var TiempoDesdeAhoraPipe = /** @class */ (function () {
    function TiempoDesdeAhoraPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    TiempoDesdeAhoraPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        //return value.toLowerCase();
        var ahora = Date.now();
        var antes = Date.parse(value);
        var milisegundo = ahora - antes;
        var segundos = Math.floor(milisegundo / 1000);
        var minutos = 0;
        var horas = 0;
        var dias = Math.floor(horas / 24);
        var mensaje = "hace: ";
        if (segundos > 60) {
            minutos = Math.floor(segundos / 60);
            segundos = segundos % minutos;
            if (minutos > 60) {
                horas = Math.floor(minutos / 60);
                minutos = minutos % horas;
            }
            if (horas > 24) {
                dias = Math.floor(horas / 24);
                horas = horas % dias;
            }
            if (dias != 0) {
                mensaje = mensaje + dias + " días ";
            }
            else {
                mensaje = "Hoy " + mensaje;
            }
            if (minutos < 10)
                minutos = "0" + minutos;
            if (segundos < 10)
                segundos = "0" + segundos;
            mensaje = mensaje + horas + ":" + minutos + ":" + segundos;
        }
        else {
            mensaje = "Recien ";
        }
        return mensaje;
    };
    TiempoDesdeAhoraPipe = __decorate([
        Pipe({
            name: 'tiempoDesdeAhora',
        })
    ], TiempoDesdeAhoraPipe);
    return TiempoDesdeAhoraPipe;
}());
export { TiempoDesdeAhoraPipe };
//# sourceMappingURL=tiempo-desde-ahora.js.map