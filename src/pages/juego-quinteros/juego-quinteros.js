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
import firebase from "firebase";
import { LoginPage } from '../login/login';
/**
 * Generated class for the JuegoQuinterosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JuegoQuinterosPage = /** @class */ (function () {
    function JuegoQuinterosPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.puntajeMaximo = 0;
        this.primeraVezJugando = 0;
        this.meta = 3;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.firebase = firebase;
        this.puedeGanarBebida = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        var usuariosRef = firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.usuarioKey = item;
                    _this.usuarioMesa = data[item].mesa;
                    if (data[item].juegoAxel) {
                        _this.puedeGanarBebida = false;
                    }
                }
            }
        });
        this.getNewQuestion();
    }
    JuegoQuinterosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JuegoQuinterosPage');
    };
    JuegoQuinterosPage.prototype.Timer = function () {
        var _this = this;
        this.asd = setInterval(function () {
            _this.segundos--;
            if (_this.segundos == 0) {
                _this.MostrarAlert("¡Perdió!", "Se le acabó el tiempo para responder.", "Aceptar", _this.limpiar);
                firebase.database().ref("usuarios").child(_this.usuarioKey).update({ juegoAxel: true });
                //alert("Se acabo el tiempo");
                clearInterval(_this.asd);
                _this.navCtrl.pop();
            }
        }, 1000);
    };
    JuegoQuinterosPage.prototype.getNewQuestion = function () {
        if (this.primeraVezJugando == 0) {
            this.Timer();
        }
        this.segundos = 15;
        this.operador = Math.floor(Math.random() * (4 - 1)) + 1;
        this.n1 = Math.floor(Math.random() * (50 - 1)) + 1;
        this.n2 = Math.floor(Math.random() * (50 - 1)) + 1;
        switch (this.operador) {
            case 1:
                this.question = this.n1 + " + " + this.n2 + " = ";
                this.answer = this.n1 + this.n2;
                break;
            case 2:
                this.question = this.n1 + " - " + this.n2 + " = ";
                this.answer = this.n1 - this.n2;
                break;
            case 3:
                this.n1 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
                this.n2 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
                this.question = this.n1 + " X " + this.n2 + " = ";
                this.answer = this.n1 * this.n2;
                break;
            default:
        }
    };
    JuegoQuinterosPage.prototype.onSubmitAnswer = function () {
        var _this = this;
        if (!this.userAnswer) {
            //alert("No escribio ninguna respuesta");
            this.MostrarAlert("¡Error!", "No escribió ninguna respuesta.", "Aceptar", this.limpiar);
            return;
        }
        if (parseInt(this.userAnswer) == this.answer) {
            //alert("respuesta correcta");
            this.MostrarAlert("¡Respuesta correcta!", "Tiene que acertar 3 veces.", "Aceptar", this.limpiar);
            this.userAnswer = "";
            this.puntajeMaximo++;
            this.primeraVezJugando++;
            this.getNewQuestion();
            if (this.puntajeMaximo == this.meta) {
                //alert("Enhorabuena,usted gano el juego");
                //this.MostrarAlert("Gano!!", "Se gano su bebida gratis", "Aceptar", this.limpiar);
                this.question == "";
                this.segundos == 0;
                clearInterval(this.asd);
                if (this.puedeGanarBebida) {
                    this.estadoBoton = true;
                    //this.ocultarSpinner = false;
                    this.MostrarAlert("¡Ganaste!", "¡Tu bebida gratis aguarda!", "Volver", this.limpiar);
                    firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoAxel: true }).then(function () {
                        firebase.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").push({
                            cantidad: 1,
                            nombre: "bebida gratuita",
                            precio: 0
                        }).then(function () {
                            firebase.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").update({ estado: "tomado" }).then(function () {
                                _this.estadoBoton = false;
                                // this.ocultarSpinner = true;
                                //this.navCtrl.pop();
                            });
                        });
                    });
                }
                else {
                    this.MostrarAlert("¡Ganaste!", "", "Volver", this.limpiar);
                    this.navCtrl.pop();
                }
            }
        }
        else {
            //alert("respuesta incorrecta");
            this.MostrarAlert("¡Perdió!", "¡Escribió un número incorrecto.", "Aceptar", this.limpiar);
            firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoAxel: true });
            clearInterval(this.asd);
            this.navCtrl.pop();
        }
    };
    JuegoQuinterosPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    JuegoQuinterosPage.prototype.limpiar = function () {
        this.ocultarAlert = true;
    };
    JuegoQuinterosPage.prototype.volver = function () {
        clearInterval(this.asd);
        this.navCtrl.pop();
    };
    JuegoQuinterosPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(LoginPage);
                    });
                    break;
                }
            }
        });
    };
    JuegoQuinterosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-juego-quinteros',
            templateUrl: 'juego-quinteros.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], JuegoQuinterosPage);
    return JuegoQuinterosPage;
}());
export { JuegoQuinterosPage };
//# sourceMappingURL=juego-quinteros.js.map