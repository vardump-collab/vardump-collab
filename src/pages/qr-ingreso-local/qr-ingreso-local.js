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
import { NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import * as moment from 'moment';
import { PrincipalPage } from '../principal/principal';
/**
 * Generated class for the QrIngresoLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//FER EN LA LINEA 145 TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL.
var QrIngresoLocalPage = /** @class */ (function () {
    function QrIngresoLocalPage(navCtrl, navParams, authInstance, barcodeScanner, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.barcodeScanner = barcodeScanner;
        this.camera = camera;
        this.nombreAnonimo = "";
        this.tieneReserva = false;
        this.moment = moment;
        this.mostrarAnonimo = false;
        this.desplegarHeader = false;
        //EL VALOR DE ESTE STRING FOTO DEBE SER VACIO
        this.foto = "";
        this.mostrarAlert2 = false;
        this.encuestas = [];
        this.mostrarEncuestasVacias = false;
        this.maximaMesa = 0;
        this.noHayEncuestas = false;
        this.mostrarAlert3 = false;
        this.mostrarMiSpinner = true;
        this.desplegarEncuesta = false;
        this.imgAnonimo = "assets/imgs/beta/anonimo.png";
        //ANTES DE SUBIR A GITHUB  DESCOMENTO STAS LINEAS:
        // this.correo="lucas@soylucas.com";
        //DESCOMENTAR PARA TRABAJAR A NIVEL LOCAL!!!!!!!
        // this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
        //this.VerificarReserva();
        this.TraerEncuestas();
        this.ObtenerMesaMaxima();
        if (localStorage.getItem("anonimo") == "true") {
            this.mostrarAnonimo = true;
            this.mostrarMiSpinner = false;
            this.desplegarHeader = false;
        }
        else {
            //Aca hago lo otro si no es anonimo
            // this.VerificarReserva();
            this.desplegarHeader = true;
            this.VerificarEstado();
        }
    }
    QrIngresoLocalPage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    QrIngresoLocalPage.prototype.TraerEncuestas = function () {
        var _this = this;
        console.log("En traer ecnuesta");
        var mensaje = firebase.database().ref().child("encuestaCliente/");
        mensaje.once("value", function (snap) {
            var data = snap.val();
            console.log("Dentro de observable ecnuesta");
            _this.encuestas = [];
            for (var key in data) {
                _this.encuestas.push(data[key]);
                console.log(data);
            }
            console.log(_this.encuestas);
            if (_this.encuestas.length < 1) {
                _this.mostrarEncuestasVacias = true;
                //  this.noHayEncuestas=true;
                //this.desplegarEncuesta=false;
                console.log(_this.noHayEncuestas);
            }
        });
    };
    QrIngresoLocalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QrIngresoLocalPage');
    };
    QrIngresoLocalPage.prototype.leerQr = function () {
        var _this = this;
        if (this.tieneReserva) {
            this.correo = localStorage.getItem("usuario");
            this.correo = (JSON.parse(this.correo)).correo;
            this.options = { prompt: "Escaneá el qr de la puerta", formats: 'QR_CODE' };
            this.barcodeScanner.scan(this.options).then(function (barcodeData) {
                var miScan = (barcodeData.text);
                if (barcodeData.text === "bienvenido") {
                    _this.mensaje = "Bienvenido!! Se ha anunciado con éxito, en breve vendra el mozo a atenderlo";
                    _this.mostrarAlert3 = true;
                    //Si es bienvenido y adémas no hay encuestas muestro la pagina negra y el relog de arena 
                    if (_this.mostrarEncuestasVacias) {
                        _this.noHayEncuestas = true;
                        _this.desplegarEncuesta = false;
                    }
                    else {
                        _this.desplegarEncuesta = true;
                        _this.noHayEncuestas = false;
                    }
                    _this.desplegarHeader = false;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 4500);
                    //Aca cambio el estado del usuario y escucho al cambio d este estado
                    var usuariosRef = firebase.database().ref("usuarios");
                    usuariosRef.once("value", function (snap) {
                        var data = snap.val();
                        var esValido = true;
                        var _loop_1 = function () {
                            if (data[key].correo == _this.correo) {
                                var usuario = data[key];
                                usuario.estado = "espera";
                                usuario.comensales = _this.comensales;
                                usuario.mesa = _this.mesa;
                                console.log(usuario);
                                var usuariosRef_1 = firebase.database().ref("usuarios/" + key);
                                _this.claveActual = key;
                                usuariosRef_1.set(usuario).then(function () {
                                    usuariosRef_1.on("value", function (snap) {
                                        var data = snap.val();
                                        console.log(data);
                                        if (data.estado != "espera") {
                                            //FER EN ESTA LINEA TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL
                                            _this.navCtrl.setRoot(PrincipalPage);
                                        }
                                    });
                                });
                            }
                        };
                        for (var key in data) {
                            _loop_1();
                        }
                    });
                }
                else {
                    _this.mensaje = "Qr no valido";
                    _this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        return;
                    }, 3000);
                }
            }, function (error) {
                //this.errorHandler.mostrarErrorLiteral(error);
            });
        }
        else {
            this.correo = localStorage.getItem("usuario");
            this.correo = (JSON.parse(this.correo)).correo;
            this.options = { prompt: "Escaneá el qr de la puerta", formats: 'QR_CODE' };
            this.barcodeScanner.scan(this.options).then(function (barcodeData) {
                var miScan = (barcodeData.text);
                if (barcodeData.text === "bienvenido") {
                    _this.mensaje = "Bienvenido!! Se ha anunciado con éxito, en breve vendra el mozo a atenderlo";
                    _this.mostrarAlert3 = true;
                    _this.desplegarEncuesta = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 3000);
                    //Aca cambio el estado del usuario y escucho al cambio d este estado
                    var usuariosRef = firebase.database().ref("usuarios");
                    usuariosRef.once("value", function (snap) {
                        var data = snap.val();
                        var esValido = true;
                        var _loop_2 = function () {
                            if (data[key].correo == _this.correo) {
                                var usuario = data[key];
                                usuario.estado = "espera";
                                usuario.comensales = _this.comensales;
                                console.log(usuario);
                                var usuariosRef_2 = firebase.database().ref("usuarios/" + key);
                                _this.claveActual = key;
                                usuariosRef_2.set(usuario).then(function () {
                                    usuariosRef_2.on("value", function (snap) {
                                        var data = snap.val();
                                        console.log(data);
                                        if (data.estado != "espera") {
                                            //FER EN ESTA LINEA TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL
                                            _this.navCtrl.setRoot(PrincipalPage);
                                        }
                                    });
                                });
                            }
                        };
                        for (var key in data) {
                            _loop_2();
                        }
                    });
                }
                else {
                    _this.mensaje = "Qr no valido";
                    _this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        return;
                    }, 3000);
                }
            }, function (error) {
                //this.errorHandler.mostrarErrorLiteral(error);
            });
        }
    };
    QrIngresoLocalPage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    QrIngresoLocalPage.prototype.tomarFoto = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 300,
                targetHeight: 300,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto = "data:image/jpeg;base64," + imageData;
                _this.imgAnonimo = _this.foto;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    QrIngresoLocalPage.prototype.AceptarAlert2 = function () {
        var _this = this;
        if (this.maximaMesa == 0) {
            this.mensaje = "No hay mesas cargadas en el salón";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 2000);
            return;
        }
        if (this.comensales < 1) {
            this.mensaje = "La cantidad de comensales mínima es de 1";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        if (this.comensales > this.maximaMesa) {
            this.mensaje = "La cantidad de comensales máxima es de " + this.maximaMesa;
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        if (!this.comensales) {
            this.mensaje = "Debe ingresar un número";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        this.mostrarAlert2 = false;
        /*   console.log(localStorage.getItem("anonimo").toString());
          
           if(  localStorage.getItem("anonimo")=="true")
           {
           
             this.mostrarAnonimo=true;
       
           }*/
    };
    QrIngresoLocalPage.prototype.aceptarAnonimo = function () {
        var _this = this;
        if (!this.nombreAnonimo) {
            this.mensaje = "Debe ingresar un nombre";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        if (!this.foto) {
            this.mensaje = "Debe tomar una foto";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        this.mostrarAnonimo = false;
        //Guardo el anonimo en firebase
        var usuariosRef = firebase.database().ref("usuarios/");
        var raiz = usuariosRef.push({ nombre: this.nombreAnonimo, tipo: "anonimo", img: this.foto }).key;
        var ref2 = firebase.database().ref("usuarios/" + raiz);
        ref2.update({ correo: raiz });
        var unUsuario = {
            nombre: this.nombreAnonimo,
            tipo: "anonimo",
            img: this.foto,
            correo: raiz
        };
        localStorage.setItem("usuario", JSON.stringify(unUsuario));
        this.mostrarAlert2 = true;
    };
    QrIngresoLocalPage.prototype.VerificarReserva = function () {
        var _this = this;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        var usuariosRef = firebase.database().ref("reservas");
        usuariosRef.once("value", function (snap) {
            console.log("En verificar Reserva");
            var data = snap.val();
            var esValido = true;
            var hayReserva = false;
            for (var key in data) {
                console.log("reservas:" + data[key]);
                //Verifico si hay una reserva confirmada
                if (data[key].estado == "confirmada" && data[key].correo == _this.correo) {
                    console.log("Este cliente tiene reservaaaa");
                    var momentoReserva = moment(data[key].horario, "DD/MM/YYYY HH:mm");
                    console.log(momentoReserva);
                    var momentoActual = moment(new Date(), "DD/MM/YYYY HH:mm");
                    console.log(momentoActual);
                    console.log(Math.abs(momentoActual.diff(momentoReserva, "m")));
                    // if(Math.abs(momentoReserva.diff(momentoActual, "m")) <= 40)
                    if (momentoReserva.diff(momentoActual, "m") > -40 && momentoReserva.diff(momentoActual, "m") < 20) {
                        hayReserva = true;
                        _this.tieneReserva = true;
                        _this.mesa = data[key].mesa;
                        _this.comensales = data[key].cantidadPersonas;
                        _this.mostrarAlert2 = false;
                        _this.mostrarMiSpinner = false;
                        return;
                    }
                    else {
                        console.log("Pero la reserva es de mas tarde no de ahoraa");
                        _this.mostrarMiSpinner = false;
                        _this.mostrarAlert2 = true;
                        return;
                    }
                    //Aca debo restar el momento actual menos el de la reserva 
                    //si es menor a 50 
                    //Cambio el estado a espera
                }
            }
            if (!hayReserva) {
                _this.mostrarMiSpinner = false;
                _this.mostrarAlert2 = true;
                return;
            }
        });
    };
    QrIngresoLocalPage.prototype.ObtenerMesaMaxima = function () {
        var _this = this;
        var mesaMaxima = 0;
        var usuariosRef = firebase.database().ref("mesas");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            var hayReserva = false;
            for (var key in data) {
                if (data[key].cantidadComensales > mesaMaxima) {
                    mesaMaxima = data[key].cantidadComensales;
                }
            }
            _this.maximaMesa = mesaMaxima;
        });
    };
    QrIngresoLocalPage.prototype.VerificarEstado = function () {
        var _this = this;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        var usuariosRef = firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            console.log("En verificar estado");
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].correo == _this.correo) {
                    //Pregunto si esta seteado el estado para que no pinche la app
                    if (data[key].estado) {
                        //Si ese estado que ahora se que esta seteado por que estoy dentro del if 
                        //es en espera directamente le muestro las encuestas de usuarios
                        if (data[key].estado == "espera") {
                            if (_this.mostrarEncuestasVacias) {
                                _this.noHayEncuestas = true;
                                _this.desplegarEncuesta = false;
                                _this.desplegarHeader = false;
                                _this.mostrarMiSpinner = false;
                            }
                            else {
                                _this.mostrarMiSpinner = false;
                                _this.desplegarEncuesta = true;
                                _this.desplegarHeader = false;
                            }
                        }
                        else {
                            _this.VerificarReserva();
                        }
                    }
                    else {
                        _this.VerificarReserva();
                    }
                }
            }
        }).catch(function () { return console.log("por las dudas"); });
    };
    QrIngresoLocalPage = __decorate([
        Component({
            selector: 'page-qr-ingreso-local',
            templateUrl: 'qr-ingreso-local.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireAuth,
            BarcodeScanner,
            Camera])
    ], QrIngresoLocalPage);
    return QrIngresoLocalPage;
}());
export { QrIngresoLocalPage };
//# sourceMappingURL=qr-ingreso-local.js.map