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
import { JuegoFerPage } from "../juego-fer/juego-fer";
import { LoginPage } from "../login/login";
import firebase from "firebase";
import { JuegoPage } from '../juego/juego';
import { JuegoQuinterosPage } from '../juego-quinteros/juego-quinteros';
var SalaDeJuegosPage = /** @class */ (function () {
    function SalaDeJuegosPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firebase = firebase;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.juegos = [
            { accion: "Preguntas y respuestas", img: "preguntas-respuestas.jpg", ruta: JuegoFerPage },
            { accion: "Juego de la memoria", img: "memoria.jpg", ruta: JuegoPage },
            { accion: "Agilidad aritmética", img: "agilidad-aritmetica.jpg", ruta: JuegoQuinterosPage }
        ];
    }
    SalaDeJuegosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalaDeJuegosPage');
    };
    SalaDeJuegosPage.prototype.Redireccionar = function (ruta) {
        this.navCtrl.push(ruta);
    };
    SalaDeJuegosPage.prototype.Logout = function () {
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
    SalaDeJuegosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-sala-de-juegos',
            templateUrl: 'sala-de-juegos.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SalaDeJuegosPage);
    return SalaDeJuegosPage;
}());
export { SalaDeJuegosPage };
//# sourceMappingURL=sala-de-juegos.js.map