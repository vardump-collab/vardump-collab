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
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LoginPage } from "../login/login";
import { PrincipalPage } from "../principal/principal";
import firebase from "firebase";
var CuentaPage = /** @class */ (function () {
    function CuentaPage(navCtrl, navParams, barcodeScanner, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.toastCtrl = toastCtrl;
        this.estado = "ocultar";
        this.estadoBoton = false;
        this.ocultarSpinner = false;
        this.firebase = firebase;
        this.ocultarAlert = true;
        this.alertMostrarBotonCancelar = true;
        console.clear();
        this.rate = 1;
        this.textoDelBoton = "pagar";
        this.textoRate = "Malo";
        this.propina = 0;
        this.propinaTotal = 0;
        this.subTotal = 0;
        this.total = 0;
        this.pedidos = [];
        var usuariosRef = this.firebase.database().ref("usuarios");
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.mesa = "";
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.mesa = data[item].mesa;
                    _this.keyCliente = item;
                    break;
                }
            }
        }).then(function () {
            var pedidoRef = _this.firebase.database().ref("pedidos").child(_this.mesa);
            pedidoRef.once("value", function (snap) {
                var data = snap.val();
                for (var item in data) {
                    for (var subItem in data[item]) {
                        if (typeof (data[item][subItem]) != "string") {
                            _this.pedidos.push(data[item][subItem]);
                        }
                    }
                }
                _this.total = _this.subTotal = _this.pedidos.reduce(function (valorAnterior, valorActual, indice) {
                    if (indice > 1)
                        return valorAnterior + valorActual.cantidad * valorActual.precio;
                    else
                        return valorAnterior.cantidad * valorAnterior.precio + valorActual.cantidad * valorActual.precio;
                });
                if (data.desc) {
                    _this.descuento = _this.total * 0.1;
                    _this.total -= _this.descuento;
                }
                _this.estado = "cuenta";
                _this.ocultarSpinner = true;
            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
    }
    CuentaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CuentaPage');
    };
    CuentaPage.prototype.Votar = function () {
        switch (this.rate) {
            case 1:
                this.propina = 0;
                this.textoRate = "Malo";
                break;
            case 2:
                this.propina = 5;
                this.textoRate = "Regular";
                break;
            case 3:
                this.propina = 10;
                this.textoRate = "Bien";
                break;
            case 4:
                this.propina = 15;
                this.textoRate = "Muy bien";
                break;
            case 5:
                this.propina = 20;
                this.textoRate = "Excelente";
                break;
            default:
                this.textoRate = "Hola";
                break;
        }
        this.propinaTotal = (this.subTotal * this.propina) / 100;
        this.total = this.subTotal + this.propinaTotal;
        if (this.rate > 1)
            this.textoDelBoton = "Verificar mesa";
        else
            this.textoDelBoton = "Pagar";
    };
    CuentaPage.prototype.Pagar = function () {
        var _this = this;
        if (this.textoDelBoton == "Verificar mesa") {
            var options = { prompt: "Verificá tu mesa para dar tu propina.", formats: "QR_CODE" };
            this.barcodeScanner.scan(options).then(function (barcodeData) {
                if (barcodeData.text == _this.mesa)
                    _this.textoDelBoton = "Pagar";
                else
                    _this.presentToast("Ese QR no pertenece a tu mesa.");
            }).catch(function (err) { });
        }
        else {
            var clienteRef_1 = this.firebase.database().ref("usuarios").child(this.keyCliente);
            var pedidoRef = this.firebase.database().ref("pedidos").child(this.mesa);
            var mesaRef_1 = this.firebase.database().ref("mesas");
            this.estadoBoton = true;
            this.ocultarSpinner = false;
            pedidoRef.remove().then(function () {
                clienteRef_1.child("estado").remove().then(function () {
                    clienteRef_1.child("comensales").remove().then(function () {
                        clienteRef_1.child("juegoFer").remove().then(function () {
                            clienteRef_1.child("juegoFacu").remove().then(function () {
                                clienteRef_1.child("juegoAxel").remove().then(function () {
                                    clienteRef_1.child("mesa").remove().then(function () {
                                        mesaRef_1.once("value", function (snap) {
                                            var data = snap.val();
                                            var _loop_1 = function (item) {
                                                if (data[item].numeroMesa == _this.mesa) {
                                                    mesaRef_1.child(item).update({ estado: "libre" }).then(function () {
                                                        mesaRef_1.child(item).child("cliente").remove().then(function () {
                                                            mesaRef_1.child(item).child("tiempoMinimo").remove().then(function () {
                                                                _this.MostrarAlert("Éxito!", "Gracias por comer en nuestro restaurante, nos ayudaría mucho que completases una encuesta sobre tu experiencia en el lugar.", "Ok", _this.Redireccionar);
                                                                _this.ocultarSpinner = true;
                                                            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                                        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                                    ;
                                                    return "break";
                                                }
                                            };
                                            for (var item in data) {
                                                var state_1 = _loop_1(item);
                                                if (state_1 === "break")
                                                    break;
                                            }
                                        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
        }
    };
    CuentaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    CuentaPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    CuentaPage.prototype.Redireccionar = function () {
        this.navCtrl.setRoot(PrincipalPage);
    };
    CuentaPage.prototype.Logout = function () {
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
    CuentaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-cuenta',
            templateUrl: 'cuenta.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            BarcodeScanner,
            ToastController])
    ], CuentaPage);
    return CuentaPage;
}());
export { CuentaPage };
//# sourceMappingURL=cuenta.js.map