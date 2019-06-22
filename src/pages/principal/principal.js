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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerificarTipoProvider } from "../../providers/verificar-tipo/verificar-tipo";
import { LoginPage } from "../login/login";
import { PerfilPage } from "../perfil/perfil";
import { NativeAudio } from '@ionic-native/native-audio';
import firebase from "firebase";
import "firebase/firestore";
import { FcmProvider } from '../../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { EncuestaDeEmpleadoPage } from '../encuesta-de-empleado/encuesta-de-empleado';
var PrincipalPage = /** @class */ (function () {
    function PrincipalPage(navCtrl, navParams, verificarTipo, fcm, toastCtrl, nativeAudio) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.verificarTipo = verificarTipo;
        this.toastCtrl = toastCtrl;
        this.nativeAudio = nativeAudio;
        this.acciones = [];
        this.accionesRespaldoCliente = [];
        this.firebase = firebase;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.nativeAudio.preloadSimple('a', 'assets/imgs/gamma/fortnite.mp3').catch(function () { });
        fcm.getToken();
        // Listen to incoming messages
        fcm.listenToNotifications().pipe(tap(function (msg) {
            // show a toast
            var toast = toastCtrl.create({
                message: msg.body,
                duration: 8000,
                position: 'top',
                cssClass: 'nombreRaro'
            });
            if (localStorage.getItem("sonidos") != "false") {
                _this.nativeAudio.play('a').catch(function () { });
            }
            toast.present();
        }))
            .subscribe();
        this.acciones = this.verificarTipo.RetornarAcciones();
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.sonidos = localStorage.getItem("sonidos");
        if (this.usuario.tipo == "cliente" || this.usuario.tipo == "anonimo") {
            this.accionesRespaldoCliente = this.acciones;
            var usuarioRef_1 = this.firebase.database().ref("usuarios");
            var pedidoRef_1;
            usuarioRef_1.once("value", function (snap) {
                var data = snap.val();
                for (var item in data) {
                    if (data[item].correo == _this.usuario.correo) {
                        _this.usuarioKey = item;
                        break;
                    }
                }
            }).then(function () {
                setInterval(function () {
                    _this.acciones = _this.acciones;
                }, 500);
                usuarioRef_1.child(_this.usuarioKey).child("estado").on("value", function (snap) {
                    var data = snap.val();
                    var estadoCliente = data;
                    var flag = true;
                    _this.acciones = [];
                    switch (estadoCliente) {
                        case 'delivery':
                            _this.acciones[0] = _this.accionesRespaldoCliente[7];
                            break;
                        /*
                         *
                         * Puede hacer un pedido
                         * Jugar
                         *
                         */
                        case 'atendido':
                            _this.acciones[0] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[3] : _this.accionesRespaldoCliente[2];
                            _this.acciones[1] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[6] : _this.accionesRespaldoCliente[4];
                            break;
                        /*
                         *
                         * Ve el estado del pedido
                         * hacer un pedido
                         * Jugar
                         *
                         */
                        case 'pidio':
                            _this.acciones[0] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[2] : _this.accionesRespaldoCliente[1];
                            _this.acciones[1] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[3] : _this.accionesRespaldoCliente[2];
                            _this.acciones[2] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[6] : _this.accionesRespaldoCliente[4];
                            if (flag) {
                                flag = false;
                                var estaComiendo_1;
                                usuarioRef_1.child(_this.usuarioKey).once("value", function (snap) {
                                    var data = snap.val();
                                    pedidoRef_1 = _this.firebase.database().ref("pedidos").child(data.mesa);
                                }).then(function () {
                                    pedidoRef_1.on("value", function (snap) {
                                        if (estadoCliente != "pago") {
                                            var data_1 = snap.val();
                                            estaComiendo_1 = true;
                                            for (var item in data_1) {
                                                if (data_1[item].estado && data_1[item].estado != "terminado") {
                                                    estaComiendo_1 = false;
                                                    break;
                                                }
                                            }
                                            if (estaComiendo_1) {
                                                usuarioRef_1.child(_this.usuarioKey).update({
                                                    estado: "comiendo"
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                            break;
                        /*
                         *
                         * Pagar
                         * Ve el estado del pedido
                         * hacer un pedido
                         * Jugar
                         *
                         */
                        case 'comiendo':
                            _this.acciones[0] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[0] : _this.accionesRespaldoCliente[0];
                            _this.acciones[1] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[2] : _this.accionesRespaldoCliente[1];
                            _this.acciones[2] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[3] : _this.accionesRespaldoCliente[2];
                            _this.acciones[3] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[6] : _this.accionesRespaldoCliente[4];
                            break;
                        /*
                         *
                         * El cliente no esta en espera, atendido, comiendo, esperando la comida, puede ser undefined o pago
                         * ingresar al local
                         * reservar
                         *
                         */
                        default:
                            _this.acciones[0] = _this.accionesRespaldoCliente[1];
                            _this.acciones[1] = _this.accionesRespaldoCliente[3];
                            _this.acciones[2] = _this.accionesRespaldoCliente[5];
                            break;
                    }
                });
            }).catch(function () { return console.log("Algo salio mal..."); });
        }
    }
    PrincipalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PrincipalPage');
    };
    PrincipalPage.prototype.ionViewWillEnter = function () {
        if (localStorage.getItem("refrescarImagen") == "true") {
            localStorage.setItem("refrescarImagen", "false");
            this.usuario = JSON.parse(localStorage.getItem("usuario"));
        }
    };
    PrincipalPage.prototype.Redireccionar = function (ruta) {
        this.navCtrl.push(ruta);
    };
    PrincipalPage.prototype.IrAPerfil = function () {
        this.navCtrl.push(PerfilPage);
    };
    PrincipalPage.prototype.AlternarSonidos = function () {
        if (localStorage.getItem("sonidos") == "false") {
            localStorage.setItem("sonidos", "true");
            this.sonidos = "true";
        }
        else {
            localStorage.setItem("sonidos", "false");
            this.sonidos = "false";
        }
    };
    PrincipalPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    PrincipalPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    PrincipalPage.prototype.Logout = function () {
        var _this = this;
        console.log("LogOut");
        console.log("usuario 1 = " + this.usuario.correo);
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                console.log(data[item].correo);
                if (data[item].correo == _this.usuario.correo) {
                    console.log("usuario = " + _this.usuario.correo);
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        switch (_this.usuario.tipo) {
                            case 'mozo':
                            case 'cocinero':
                            case 'bartender':
                            case 'metre':
                            case 'repartidor':
                                // Para redireccionar a la encuesta de axel.
                                localStorage.setItem("desloguear", "true");
                                _this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                                // localStorage.clear();
                                // this.navCtrl.setRoot(LoginPage);
                                break;
                            case 'anonimo':
                                //this.MostrarAlert("fds", "fds", "fds", this.LimpiarAnonimo);
                                break;
                            default:
                                localStorage.clear();
                                _this.navCtrl.setRoot(LoginPage);
                                break;
                        }
                        // if (this.usuario.tipo == "mozo"
                        //   || this.usuario.tipo == "cocinero"
                        //   || this.usuario.tipo == "bartender"
                        //   || this.usuario.tipo == "metre"
                        //   || this.usuario.tipo == "repartidor") {
                        //   // Para redireccionar a la encuesta de axel.
                        //   // localStorage.setItem("desloguear", "true");
                        //   // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                        //   localStorage.clear();
                        //   this.navCtrl.setRoot(LoginPage);
                        // } else {
                        //   localStorage.clear();
                        //   this.navCtrl.setRoot(LoginPage);
                        // }
                    });
                    break;
                }
            }
        });
    };
    PrincipalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-principal',
            templateUrl: 'principal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, VerificarTipoProvider, FcmProvider, ToastController, NativeAudio])
    ], PrincipalPage);
    return PrincipalPage;
}());
export { PrincipalPage };
//# sourceMappingURL=principal.js.map