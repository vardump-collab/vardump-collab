var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import firebase from "firebase";
import * as moment from 'moment';
var ListadoReservasPage = /** @class */ (function () {
    function ListadoReservasPage(navCtrl, navParams, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.image = "";
        this.ocultarImagen = true;
        this.ocultarSpinner = false;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.firebase = firebase;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.reservas = [];
        this.reservasPendientes = [];
        this.reservasConfirmadas = [];
        this.mesas = [];
        this.ocultarInterfazMesas = true;
        this.ejecutarSetInterval = true;
        setInterval(function () {
            _this.reservasPendientes = _this.reservasPendientes;
            _this.reservasConfirmadas = _this.reservasConfirmadas;
        }, 500);
        var reservasRef = this.firebase.database().ref("reservas");
        reservasRef.on("value", function (snap) {
            var data = snap.val();
            _this.reservas = [];
            var contador = 0;
            console.clear();
            for (var item in data) {
                _this.reservas.push(data[item]);
                _this.reservas[contador].key = item;
                contador++;
            }
            _this.reservasPendientes = _this.reservas.filter(function (item) {
                return item.estado == "pendiente";
            });
            _this.reservasConfirmadas = _this.reservas.filter(function (item) {
                return item.estado == "confirmada";
            });
            if (_this.ejecutarSetInterval) {
                _this.VerificarReservasPasadasDeTiempo();
                _this.ejecutarSetInterval = false;
                setInterval(function () {
                    _this.VerificarReservasPasadasDeTiempo();
                }, 1000 * 60);
            }
            _this.ocultarSpinner = true;
        });
    }
    ListadoReservasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListadoReservasPage');
    };
    ListadoReservasPage.prototype.VerificarReservasPasadasDeTiempo = function () {
        var _this = this;
        var momentoActual = moment(new Date());
        for (var _i = 0, _a = this.reservas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (momentoActual.diff(moment(item.horario, "DD/MM/YYYY HH:mm"), "m") > 20) {
                firebase.database().ref("reservas").child(item.key).remove().catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos"); });
            }
        }
    };
    ListadoReservasPage.prototype.DesplegarMesas = function (reservaSeleccionada) {
        var _this = this;
        this.mesas = [];
        this.reservaSeleccionada = reservaSeleccionada;
        var mesasRef = this.firebase.database().ref("mesas");
        var momentoReservaSeleccionada = moment(reservaSeleccionada.horario, "DD/MM/YYYY HH:mm");
        mesasRef.once("value", function (snap) {
            var data = snap.val();
            _this.reservas = [];
            var estaDesocupada;
            for (var item in data) {
                estaDesocupada = true;
                for (var _i = 0, _a = _this.reservasConfirmadas; _i < _a.length; _i++) {
                    var reserva = _a[_i];
                    if (data[item].numeroMesa == reserva.mesa) {
                        var momentoReservaMesa = moment(reserva.horario, "DD/MM/YYYY HH:mm");
                        if (Math.abs(momentoReservaSeleccionada.diff(momentoReservaMesa, "m")) < 40) {
                            estaDesocupada = false;
                            break;
                        }
                    }
                }
                if (data[item].cantidadComensales >= reservaSeleccionada.cantidadPersonas && estaDesocupada)
                    _this.mesas.push({ numero: data[item].numeroMesa, seleccionado: "" });
            }
            _this.mesas = _this.mesas.sort(function (a, b) {
                return a.numero - b.numero;
            });
            _this.ocultarInterfazMesas = false;
        });
    };
    ListadoReservasPage.prototype.Seleccionar = function (numero) {
        for (var _i = 0, _a = this.mesas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.numero == numero)
                item.seleccionado = "selected";
            else
                item.seleccionado = "";
        }
    };
    ListadoReservasPage.prototype.Confirmar = function () {
        var _this = this;
        var reservaRef = this.firebase.database().ref("reservas").child(this.reservaSeleccionada.key);
        var numeroDeMesa;
        var seleccionoMesa = false;
        for (var _i = 0, _a = this.mesas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.seleccionado == "selected") {
                numeroDeMesa = item.numero;
                seleccionoMesa = true;
                break;
            }
        }
        if (seleccionoMesa) {
            this.ocultarSpinner = false;
            reservaRef.update({
                estado: "confirmada",
                mesa: numeroDeMesa
            }).then(function () {
                _this.ocultarSpinner = true;
                _this.OcultarInterfaz();
                _this.presentToast("Se ha confirmado la reserva.");
            });
        }
        else {
            this.presentToast("Selecciona una mesa antes de continuar.");
        }
    };
    ListadoReservasPage.prototype.ConfirmarCancelarReserva = function (reserva) {
        this.reservaSeleccionadaParaCancelar = reserva;
        this.MostrarAlert("", "\u00BFSeguro que deseas cancelar la reserva de " + this.reservaSeleccionadaParaCancelar.apellido + ", " + this.reservaSeleccionadaParaCancelar.nombre + " para el " + this.reservaSeleccionadaParaCancelar.horario + " Hs.?", "Sí", this.CancelarRerserva);
    };
    ListadoReservasPage.prototype.CancelarRerserva = function () {
        var _this = this;
        this.OcultarAlert();
        firebase.database().ref("reservas").child(this.reservaSeleccionadaParaCancelar.key).remove().then(function () {
            _this.ocultarSpinner = true;
            _this.presentToast("Se ha cancelado la reserva.");
        });
    };
    ListadoReservasPage.prototype.OcultarInterfaz = function () {
        this.ocultarInterfazMesas = true;
    };
    ListadoReservasPage.prototype.MostrarImagen = function (imagen) {
        this.image = imagen;
        this.ocultarImagen = false;
    };
    ListadoReservasPage.prototype.OcultarImagen = function () {
        this.ocultarImagen = true;
    };
    ListadoReservasPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    ListadoReservasPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    ListadoReservasPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    ListadoReservasPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(LoginPage);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(LoginPage);
                        }
                    });
                    break;
                }
            }
        });
    };
    ListadoReservasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listado-reservas',
            templateUrl: 'listado-reservas.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController])
    ], ListadoReservasPage);
    return ListadoReservasPage;
}());
export { ListadoReservasPage };
//# sourceMappingURL=listado-reservas.js.map