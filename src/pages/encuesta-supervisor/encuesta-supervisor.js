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
import { Chart } from 'chart.js';
import * as moment from 'moment';
import firebase from "firebase";
var EncuestaSupervisorPage = /** @class */ (function () {
    function EncuestaSupervisorPage(navCtrl, navParams, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.pregunta1Labels = ['Pésimo', 'Malo', 'Mediocre', 'Bueno', 'Excelente'];
        this.pregunta1Data = [0, 0, 0, 0, 0];
        this.pregunta2Labels = ['Sí', 'No'];
        this.pregunta2Data = [0, 0];
        this.pregunta3Labels = ['Mala conducta', 'Mala presentación', 'Poca formalidad'];
        this.pregunta3Data = [0, 0, 0];
        this.pregunta4Labels = ['Sí', 'No'];
        this.pregunta4Data = [0, 0];
        this.pregunta5 = [];
        this.doughnutChartType = 'doughnut';
        this.firebase = firebase;
        this.moment = moment;
        this.conducta = 3;
        this.textoRange = "Mediocre";
        this.inconveniente = "0";
        this.aspectos = { item1: false, item2: false, item3: false };
        this.prescencia = "1";
        this.image = "";
        this.ocultarImagen = true;
        Chart.defaults.global.legend.display = false;
        this.usuario = navParams.get("usuario");
        this.usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
        var usuariosRef = this.firebase.database().ref("usuarios");
        this.estadoBoton = true;
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.pregunta1Data = [
                        data[item].encuesta.pregunta1.pesimo,
                        data[item].encuesta.pregunta1.malo,
                        data[item].encuesta.pregunta1.mediocre,
                        data[item].encuesta.pregunta1.bueno,
                        data[item].encuesta.pregunta1.excelente
                    ];
                    _this.pregunta2Data = [
                        data[item].encuesta.pregunta2.si,
                        data[item].encuesta.pregunta2.no
                    ];
                    _this.pregunta3Data = [
                        data[item].encuesta.pregunta3.item1,
                        data[item].encuesta.pregunta3.item2,
                        data[item].encuesta.pregunta3.item3
                    ];
                    _this.pregunta4Data = [
                        data[item].encuesta.pregunta4.si,
                        data[item].encuesta.pregunta4.no
                    ];
                    _this.pregunta5 = data[item].encuesta.pregunta5;
                    _this.pregunta5.splice(0, 1);
                    _this.pregunta5 = _this.pregunta5.reverse();
                    break;
                }
            }
            _this.estadoBoton = false;
        });
    }
    // events
    EncuestaSupervisorPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    EncuestaSupervisorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EncuestaSupervisorPage');
    };
    EncuestaSupervisorPage.prototype.ModificarTextoRange = function () {
        var arrayAux = ['Pésimo', 'Malo', 'Mediocre', 'Bueno', 'Excelente'];
        this.textoRange = arrayAux[this.conducta - 1];
    };
    EncuestaSupervisorPage.prototype.HacerEncuesta = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        this.estadoBoton = true;
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    console.clear();
                    var pregunta1 = [data[item].encuesta.pregunta1.pesimo, data[item].encuesta.pregunta1.malo, data[item].encuesta.pregunta1.mediocre, data[item].encuesta.pregunta1.bueno, data[item].encuesta.pregunta1.excelente];
                    pregunta1[_this.conducta - 1]++;
                    var pregunta2 = [data[item].encuesta.pregunta2.no, data[item].encuesta.pregunta2.si];
                    pregunta2[_this.inconveniente]++;
                    var pregunta3 = [];
                    pregunta3[0] = (_this.aspectos.item1) ? data[item].encuesta.pregunta3.item1 + 1 : data[item].encuesta.pregunta3.item1;
                    pregunta3[1] = (_this.aspectos.item2) ? data[item].encuesta.pregunta3.item2 + 1 : data[item].encuesta.pregunta3.item2;
                    pregunta3[2] = (_this.aspectos.item3) ? data[item].encuesta.pregunta3.item3 + 1 : data[item].encuesta.pregunta3.item3;
                    var pregunta4 = [data[item].encuesta.pregunta4.no, data[item].encuesta.pregunta4.si];
                    pregunta4[_this.prescencia]++;
                    var pregunta5 = data[item].encuesta.pregunta5;
                    if (_this.opinion) {
                        var momentoActual = moment(new Date());
                        pregunta5.push({ nombre: _this.usuarioLogueado.apellido + ", " + _this.usuarioLogueado.nombre, fecha: momentoActual.format("DD/MM/YYYY HH:mm"), comentario: _this.opinion, img: _this.usuarioLogueado.img });
                    }
                    usuariosRef.child(item).update({
                        "encuesta": {
                            "pregunta1": {
                                "pesimo": pregunta1[0],
                                "malo": pregunta1[1],
                                "mediocre": pregunta1[2],
                                "bueno": pregunta1[3],
                                "excelente": pregunta1[4]
                            },
                            "pregunta2": {
                                "si": pregunta2[0],
                                "no": pregunta2[1]
                            },
                            "pregunta3": {
                                "item1": pregunta3[0],
                                "item2": pregunta3[1],
                                "item3": pregunta3[2]
                            },
                            "pregunta4": {
                                "si": pregunta4[0],
                                "no": pregunta4[1]
                            },
                            "pregunta5": pregunta5
                        }
                    }).then(function () {
                        _this.estadoBoton = false;
                        _this.presentToast("Se ha cargado correctamente la encuesta.");
                        // this.navCtrl.pop();
                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                    break;
                }
            }
        });
    };
    EncuestaSupervisorPage.prototype.MostrarImagen = function (imagen) {
        this.image = imagen;
        this.ocultarImagen = false;
    };
    EncuestaSupervisorPage.prototype.OcultarImagen = function () {
        this.ocultarImagen = true;
    };
    EncuestaSupervisorPage.prototype.VolverAtras = function () {
        this.navCtrl.pop();
    };
    EncuestaSupervisorPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    EncuestaSupervisorPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-encuesta-supervisor',
            templateUrl: 'encuesta-supervisor.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController])
    ], EncuestaSupervisorPage);
    return EncuestaSupervisorPage;
}());
export { EncuestaSupervisorPage };
//# sourceMappingURL=encuesta-supervisor.js.map