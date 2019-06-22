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
import { PrincipalPage } from "../principal/principal";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import "firebase/firestore";
import { RegistroClientePage } from '../registro-cliente/registro-cliente';
import { EncuestaDeEmpleadoPage } from '../encuesta-de-empleado/encuesta-de-empleado';
import { QrIngresoLocalPage } from '../qr-ingreso-local/qr-ingreso-local';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, authInstance, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.firebase = firebase;
        this.animation = "";
        this.estadoBoton = false;
        this.textoDelBoton = "Ingresar";
        this.tipo = "dueño";
        this.agrandar = "";
        this.botonUsuarios = "";
        localStorage.setItem("anonimo", "false");
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.Loguear = function () {
        var datos = {
            tipo: this.tipo,
            nombre: "fer",
            img: "fasdfdsaf"
        };
        console.log("hola mundo");
        localStorage.setItem("usuario", JSON.stringify(datos));
        this.navCtrl.setRoot(PrincipalPage);
    };
    LoginPage.prototype.Redireccionar = function () {
        this.navCtrl.push(RegistroClientePage);
    };
    LoginPage.prototype.DesplegarUsuarios = function () {
        this.botonUsuarios = "ocultar";
        this.agrandar = "agrandar";
    };
    LoginPage.prototype.NoDesplegarUsuarios = function () {
        var _this = this;
        setTimeout(function () {
            _this.botonUsuarios = "";
        }, 500);
        this.agrandar = "";
    };
    LoginPage.prototype.Login = function () {
        var _this = this;
        this.estadoBoton = true;
        this.textoDelBoton = "Espera...";
        if (!this.correo) {
            this.presentToast("Introduzca su correo por favor.");
            setTimeout(function () { return _this.estadoBoton = false; }, 3000);
            this.textoDelBoton = "Ingresar";
            return;
        }
        else {
            if (!this.clave) {
                this.presentToast("No olvide escribir su contraseña.");
                setTimeout(function () { return _this.estadoBoton = false; }, 3000);
                this.textoDelBoton = "Ingresar";
                return;
            }
        }
        this.animation = "ani";
        this.authInstance.auth.signInWithEmailAndPassword(this.correo.toLowerCase(), this.clave)
            .then(function (auth) {
            var usuariosRef = _this.firebase.database().ref("usuarios");
            usuariosRef.once("value", function (snap) {
                var data = snap.val();
                var tipo;
                var estado;
                for (var item in data) {
                    // if (data[item].correo == this.correo.toLowerCase()) {
                    //   localStorage.setItem("usuario", JSON.stringify(data[item]));
                    //   tipo = data[item].tipo;
                    //   break;
                    // }
                    if (data[item].correo == _this.correo.toLowerCase()) {
                        if (!data[item].logueado) {
                            tipo = data[item].tipo;
                            estado = data[item].estado;
                            if (tipo == "cliente" && !_this.authInstance.auth.currentUser.emailVerified) {
                                _this.presentToast("No se ha verificado el correo electrónico todavía.");
                                _this.animation = "";
                                _this.estadoBoton = false;
                                _this.textoDelBoton = "Ingresar";
                                return;
                            }
                            localStorage.setItem("usuario", JSON.stringify(data[item]));
                            usuariosRef.child(item).update({
                                logueado: true
                            }).then(function () {
                                switch (tipo) {
                                    // redirecciono a encuesta
                                    case "mozo":
                                    case "cocinero":
                                    case "bartender":
                                    case "metre":
                                    case "repartidor":
                                        _this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                                        break;
                                    case "cliente":
                                        if (estado == "espera")
                                            _this.navCtrl.setRoot(QrIngresoLocalPage);
                                        else
                                            _this.navCtrl.setRoot(PrincipalPage);
                                        break;
                                    // redirecciono a qr si no esta dentro del local, pero a principal si, si lo esta.
                                    case "anonimo":
                                        if (estado == "atendido" || estado == "pidio" || estado == "comiendo")
                                            _this.navCtrl.setRoot(PrincipalPage);
                                        else
                                            _this.navCtrl.setRoot(QrIngresoLocalPage);
                                        break;
                                    // siempre a principal (dueño, supervisor, cliente (registrado))
                                    default:
                                        _this.navCtrl.setRoot(PrincipalPage);
                                        break;
                                }
                            });
                            break;
                        }
                        else {
                            _this.presentToast("Este usuario ya tiene una sesión activa actualmente.");
                        }
                    }
                }
                //   if (data[item].correo == this.correo.toLowerCase()) {
                //     if (!data[item].logueado) {
                //       localStorage.setItem("usuario", JSON.stringify(data[item]));
                //       usuariosRef.child(item).update({
                //         logueado: true
                //       }).then(() => { this.navCtrl.setRoot(PrincipalPage); } /**/);
                //       break;
                //     } else {
                //       this.presentToast("Este usuario ya tiene una sesión activa actualmente.");
                //     }
                //   }
                // }
                _this.animation = "";
                _this.estadoBoton = false;
                _this.textoDelBoton = "Ingresar";
                // switch (tipo) {
                //   case "mozo":
                //   case "cocinero":
                //   case "bartender":
                //   case "metre":
                //   case "repartidor":
                //     this.navCtrl.setRoot(PrincipalPage);
                //     break;
                //   case "cliente":
                //   case "anonimo":
                //     this.navCtrl.setRoot(PrincipalPage);
                //     break;
                //   default:
                //     this.navCtrl.setRoot(PrincipalPage);
                //     break;
                // }
            });
        })
            .catch(function (err) {
            _this.animation = "";
            switch (err.code) {
                case "auth/invalid-email":
                    _this.presentToast("El correo ingresado no es valido.");
                    _this.estadoBoton = false;
                    _this.textoDelBoton = "Ingresar";
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    _this.presentToast("Correo o contraseña incorrectos.");
                    _this.estadoBoton = false;
                    _this.textoDelBoton = "Ingresar";
                    break;
                default:
                    _this.presentToast("Ups... Tenemos problemas tecnicos.");
                    _this.estadoBoton = false;
                    _this.textoDelBoton = "Ingresar";
            }
        });
    };
    LoginPage.prototype.IngresarComoAnonimo = function () {
        var _this = this;
        this.estadoBoton = true;
        this.textoDelBoton = "Espera...";
        this.animation = "ani";
        this.NoDesplegarUsuarios();
        this.authInstance.auth.signInWithEmailAndPassword("anonimo@gmail.com", "123456").then(function () {
            localStorage.setItem("anonimo", "true");
            _this.estadoBoton = false;
            _this.textoDelBoton = "Ingresar";
            _this.animation = "";
            _this.navCtrl.setRoot(QrIngresoLocalPage);
        }).catch(function () {
            _this.estadoBoton = false;
            _this.textoDelBoton = "Ingresar";
            _this.animation = "";
            _this.presentToast("Ups... Tenemos problemas tecnicos.");
        });
    };
    LoginPage.prototype.SetearUsuario = function (email, password) {
        this.correo = email;
        this.clave = password;
        this.NoDesplegarUsuarios();
    };
    LoginPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireAuth,
            ToastController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map