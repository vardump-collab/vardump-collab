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
import { MisReservasPage } from "../../pages/mis-reservas/mis-reservas";
import { LoginPage } from '../login/login';
import firebase from "firebase";
import * as moment from 'moment';
var ReservaPage = /** @class */ (function () {
    function ReservaPage(navCtrl, navParams, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.firebase = firebase;
        this.moment = moment;
        this.ocultarSpinner = true;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        console.clear();
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.nombreDeLosMeses = "Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic";
        var date = new Date();
        var mes = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
        var dia = (date.getDate() < 10 ? '0' : '') + date.getDate();
        this.minimo = date.getFullYear() + "-" + mes + "-" + dia;
        this.maximo = "" + (date.getFullYear() + 1);
    }
    ReservaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservaPage');
    };
    ReservaPage.prototype.Reservar = function () {
        var _this = this;
        if (!this.fecha || !this.hora || !this.cantidadPersonas) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        var fechaAux = this.fecha.split("-");
        var horaAux = this.hora.split(":");
        var momentoReserva = moment(new Date(fechaAux[0], fechaAux[1] - 1, fechaAux[2], horaAux[0], horaAux[1]));
        var momentoActual = moment(new Date());
        // if (Math.abs(momentoReserva.diff(momentoActual, "m")) < 60) {
        //   this.presentToast("No se puede realizar una reserva con menos de una hora de adelanto.");
        //   return;
        // }
        if (momentoReserva.diff(momentoActual, "m") < 5) {
            this.presentToast("No se puede realizar una reserva con menos de 5 minutos de adelanto.");
            return;
        }
        this.ocultarSpinner = false;
        this.estadoBoton = true;
        var reservasRef = firebase.database().ref("reservas");
        var personasQueVan = parseInt(this.cantidadPersonas.charAt(3));
        reservasRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    var diferencia = Math.abs(momentoReserva.diff(moment(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));
                    if (diferencia < 60) {
                        _this.ocultarSpinner = true;
                        _this.estadoBoton = false;
                        _this.presentToast("No puede haber un lapso menor a una hora entre alguna de tus reservas.");
                        esValido = false;
                        break;
                    }
                }
            }
            if (esValido) {
                reservasRef.once("value", function (snap) {
                    var data = snap.val();
                    var reservas = [];
                    var contador = 0;
                    for (var item in data) {
                        reservas.push(data[item]);
                        reservas[contador].key = item;
                        contador++;
                    }
                    _this.reservasConfirmadas = reservas.filter(function (item) {
                        return item.estado == "confirmada";
                    });
                }).then(function () {
                    var mesasRef = _this.firebase.database().ref("mesas");
                    var puedeReservar = false;
                    mesasRef.once("value", function (snap) {
                        var data = snap.val();
                        var estaDesocupada;
                        for (var item in data) {
                            estaDesocupada = true;
                            for (var _i = 0, _a = _this.reservasConfirmadas; _i < _a.length; _i++) {
                                var reserva = _a[_i];
                                if (data[item].numeroMesa == reserva.mesa) {
                                    var momentoReservaMesa = moment(reserva.horario, "DD/MM/YYYY HH:mm");
                                    if (Math.abs(momentoReserva.diff(momentoReservaMesa, "m")) < 40) {
                                        estaDesocupada = false;
                                        break;
                                    }
                                }
                            }
                            if (data[item].cantidadComensales >= personasQueVan && estaDesocupada) {
                                console.log(data[item].cantidadComensales >= personasQueVan);
                                puedeReservar = true;
                                break;
                            }
                        }
                        if (puedeReservar) {
                            reservasRef.push({
                                correo: _this.usuario.correo,
                                apellido: _this.usuario.apellido,
                                nombre: _this.usuario.nombre,
                                img: _this.usuario.img,
                                cantidadPersonas: personasQueVan,
                                horario: momentoReserva.format("DD/MM/YYYY HH:mm"),
                                estado: "pendiente"
                            }).then(function () {
                                _this.ocultarSpinner = true;
                                _this.estadoBoton = false;
                                _this.MostrarAlert("¡Éxito!", "Se registró tu reserva y te notificaremos cuando el encargado la confirme.", "Aceptar", _this.Volver);
                            });
                        }
                        else {
                            _this.ocultarSpinner = true;
                            _this.estadoBoton = false;
                            _this.MostrarAlert("Ups...", "No hay mesas disponibles para esa fecha y horario.", "Aceptar", _this.OcultarAlert);
                        }
                    });
                });
            }
        });
    };
    ReservaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            position: 'top',
            duration: 3000,
            cssClass: "infoToast"
        });
        toast.present();
    };
    ReservaPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    ReservaPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    ReservaPage.prototype.VerReservas = function () {
        this.navCtrl.push(MisReservasPage);
    };
    ReservaPage.prototype.Volver = function () {
        this.navCtrl.pop();
    };
    ReservaPage.prototype.Logout = function () {
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
    ReservaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-reserva',
            templateUrl: 'reserva.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController])
    ], ReservaPage);
    return ReservaPage;
}());
export { ReservaPage };
//# sourceMappingURL=reserva.js.map