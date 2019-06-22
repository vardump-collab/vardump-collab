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
import { LoginPage } from '../login/login';
import firebase from "firebase";
import * as moment from 'moment';
var MisReservasPage = /** @class */ (function () {
    function MisReservasPage(navCtrl, navParams, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.ocultarSpinner = false;
        this.firebase = firebase;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.reservas = [];
        this.reservasPendientes = [];
        this.reservasConfirmadas = [];
        this.ejecutarSetInterval = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        setInterval(function () {
            _this.reservasPendientes = _this.reservasPendientes;
            _this.reservasConfirmadas = _this.reservasConfirmadas;
        }, 500);
        var reservasRef = this.firebase.database().ref("reservas");
        reservasRef.on("value", function (snap) {
            var data = snap.val();
            _this.reservas = [];
            var contador = 0;
            for (var item in data) {
                _this.reservas.push(data[item]);
                _this.reservas[contador].key = item;
                contador++;
            }
            _this.reservas = _this.reservas.filter(function (item) {
                return _this.usuario.correo == item.correo;
            });
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
    MisReservasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisReservasPage');
    };
    MisReservasPage.prototype.VerificarReservasPasadasDeTiempo = function () {
        var _this = this;
        var momentoActual = moment(new Date());
        for (var _i = 0, _a = this.reservas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (momentoActual.diff(moment(item.horario, "DD/MM/YYYY HH:mm"), "m") > 20) {
                firebase.database().ref("reservas").child(item.key).remove().catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos"); });
            }
        }
    };
    MisReservasPage.prototype.ConfirmarCancelarReserva = function (reserva) {
        this.reservaSeleccionada = reserva;
        this.MostrarAlert("", "\u00BFSeguro que deseas cancelar tu reserva para el " + this.reservaSeleccionada.horario + " Hs.?", "Sí", this.CancelarRerserva);
    };
    MisReservasPage.prototype.CancelarRerserva = function () {
        var _this = this;
        this.OcultarAlert();
        this.ocultarInterfazMesas = false;
        firebase.database().ref("reservas").child(this.reservaSeleccionada.key).remove().then(function () {
            _this.ocultarSpinner = true;
            _this.presentToast("Se ha cancelado la reserva.");
        });
    };
    MisReservasPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    MisReservasPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    MisReservasPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            position: 'top',
            duration: 3000,
            cssClass: "infoToast"
        });
        toast.present();
    };
    MisReservasPage.prototype.Logout = function () {
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
    MisReservasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mis-reservas',
            templateUrl: 'mis-reservas.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController])
    ], MisReservasPage);
    return MisReservasPage;
}());
export { MisReservasPage };
//# sourceMappingURL=mis-reservas.js.map