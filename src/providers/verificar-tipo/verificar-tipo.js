var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AltaDuenioSupervisorPage } from "../../pages/alta-duenio-supervisor/alta-duenio-supervisor";
import { AltaEmpleadoPage } from "../../pages/alta-empleado/alta-empleado";
import { ListadoSupervisorPage } from "../../pages/listado-supervisor/listado-supervisor";
import { ReservaPage } from "../../pages/reserva/reserva";
import { CuentaPage } from "../../pages/cuenta/cuenta";
import { ListadoReservasPage } from "../../pages/listado-reservas/listado-reservas";
import { SalaDeJuegosPage } from "../../pages/sala-de-juegos/sala-de-juegos";
import { RegistroClientePage } from '../../pages/registro-cliente/registro-cliente';
import { AltaPlatosPage } from '../../pages/alta-platos/alta-platos';
import { QrIngresoLocalPage } from '../../pages/qr-ingreso-local/qr-ingreso-local';
import { EncuestaClientePage } from '../../pages/encuesta-cliente/encuesta-cliente';
import { PedirPlatosPage } from '../../pages/pedir-platos/pedir-platos';
import { AltaDeMesaPage } from '../../pages/alta-de-mesa/alta-de-mesa';
import { QrDeLaMesaPage } from '../../pages/qr-de-la-mesa/qr-de-la-mesa';
import { TomarPedidoPage } from '../../pages/tomar-pedido/tomar-pedido';
import { MapaDeRutaPage } from '../../pages/mapa-de-ruta/mapa-de-ruta';
var VerificarTipoProvider = /** @class */ (function () {
    function VerificarTipoProvider() {
        console.log('Hello VerificarTipoProvider Provider');
    }
    VerificarTipoProvider.prototype.RetornarAcciones = function () {
        var acciones = [];
        var usuario = JSON.parse(localStorage.getItem("usuario"));
        switch (usuario.tipo) {
            case "dueño":
                acciones = [
                    { accion: "Agregar un dueño o supervisor", img: "nuevo-duenio-supervisor.jpg", ruta: AltaDuenioSupervisorPage },
                    { accion: "Agregar un empleado", img: "nuevo-empleado.jpg", ruta: AltaEmpleadoPage },
                    { accion: "Nueva mesa", img: "ocupar-mesa.jpg", ruta: AltaDeMesaPage }
                ];
                break;
            case "supervisor":
                acciones = [
                    { accion: "Confirmar reservas", img: "reserva.jpg", ruta: ListadoReservasPage },
                    { accion: "Agregar un dueño o supervisor", img: "nuevo-duenio-supervisor.jpg", ruta: AltaDuenioSupervisorPage },
                    { accion: "Agregar un empleado", img: "nuevo-empleado.jpg", ruta: AltaEmpleadoPage },
                    { accion: "Confeccionar y ver encuestas", img: "encuesta.jpg", ruta: ListadoSupervisorPage }
                ];
                break;
            case "mozo":
                acciones = [
                    { accion: "Ocupar una mesa", img: "ocupar-mesa.jpg", ruta: QrDeLaMesaPage },
                    { accion: "Hacer un pedido", img: "pedido.jpg", ruta: PedirPlatosPage },
                    { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: RegistroClientePage }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
                ];
                break;
            case "cocinero":
                acciones = [
                    { accion: "Tomar un pedido", img: "pedido.jpg", ruta: TomarPedidoPage },
                    { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: AltaPlatosPage }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
                ];
                break;
            case "bartender":
                acciones = [
                    { accion: "Tomar un pedido", img: "pedido.jpg", ruta: TomarPedidoPage },
                    { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: AltaPlatosPage }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
                ];
                break;
            case "metre":
                acciones = [
                    { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: RegistroClientePage }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
                ];
                break;
            case "repartidor":
                acciones = [
                    { accion: "Mapa de ruta", img: "mapa.jpg", ruta: MapaDeRutaPage }
                ];
                break;
            case "cliente":
                acciones = [
                    { accion: "Pagar", img: "propina.jpg", ruta: CuentaPage },
                    { accion: "Ingresar al local", img: "entrada.jpg", ruta: QrIngresoLocalPage },
                    { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: QrDeLaMesaPage },
                    { accion: "Hacer un pedido", img: "pedido.jpg", ruta: PedirPlatosPage },
                    { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaClientePage },
                    { accion: "Reservar", img: "reserva.jpg", ruta: ReservaPage },
                    { accion: "Juegos", img: "juegos.jpg", ruta: SalaDeJuegosPage },
                    { accion: "Hablar con el repartidor", img: "chat.jpg", ruta: MapaDeRutaPage }
                ];
                break;
            case "anonimo":
                acciones = [
                    { accion: "Pagar", img: "propina.jpg", ruta: CuentaPage },
                    { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: QrDeLaMesaPage },
                    { accion: "Hacer un pedido", img: "pedido.jpg", ruta: PedirPlatosPage },
                    { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaClientePage },
                    { accion: "Juegos", img: "juegos.jpg", ruta: SalaDeJuegosPage }
                ];
                break;
        }
        return acciones;
    };
    VerificarTipoProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], VerificarTipoProvider);
    return VerificarTipoProvider;
}());
export { VerificarTipoProvider };
//# sourceMappingURL=verificar-tipo.js.map