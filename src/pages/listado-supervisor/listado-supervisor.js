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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EncuestaSupervisorPage } from "../encuesta-supervisor/encuesta-supervisor";
import { LoginPage } from '../login/login';
import firebase from "firebase";
import "firebase/firestore";
import { Chart } from 'chart.js';
var ListadoSupervisorPage = /** @class */ (function () {
    function ListadoSupervisorPage(navCtrl, navParams, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.image = "";
        this.ocultarImagen = true;
        this.ocultarSpinner = false;
        this.firebase = firebase;
        // =========== Axel ===========
        this.pieChartType = 'pie';
        this.pregUnoPrimeraRespuesta = 0;
        this.pregUnoSegundaRespuesta = 0;
        this.pregUnoTerceraRespuesta = 0;
        this.pregTresPrimeraRespuesta = 0;
        this.pregTresSegundaRespuesta = 0;
        this.pregCuatroPrimeraRespuesta = 0;
        this.pregCuatroSegundaRespuesta = 0;
        this.pregCincoPrimeraRespuesta = 0;
        this.pregCincoSegundaRespuesta = 0;
        // ============================
        // =========== Facu ===========
        this.pregunta4Labels = ['Horribles', 'Feos', 'Pasable', 'Aceptable', 'Buenos', 'Ricos', 'Muy ricos'];
        this.pregunta4Data = [0, 0, 0, 0, 0, 0, 0];
        this.pregunta1Labels = ['Sí', 'No'];
        this.pregunta1Data = [0, 0];
        this.pregunta2Labels = ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'];
        this.pregunta2Data = [0, 0, 0, 0, 0];
        this.pregunta3Labels = ['Comodidad', 'Platos', 'Precios', 'No tienen'];
        this.pregunta3Data = [0, 0, 0, 0];
        this.pregunta5Labels = ['Puntuaron 1', ' Puntuaron 2', ' Puntuaron 3', 'Puntuaron 4', 'Puntuaron 5', 'Puntuaron 6', 'Puntuaron 7', 'Puntuaron 8', 'Puntuaron 9', 'Puntuaron 10'];
        this.pregunta5Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.doughnutChartType = 'doughnut';
        this.votosPreg1Si = 0;
        this.votosPreg1No = 0;
        this.votosHorribles = 0;
        this.votosFeos = 0;
        this.votosPasable = 0;
        this.votosAceptable = 0;
        this.votosBuenos = 0;
        this.votosRicos = 0;
        this.votosMuyRicos = 0;
        this.votos1 = 0;
        this.votos2 = 0;
        this.votos3 = 0;
        this.votos4 = 0;
        this.votos5 = 0;
        this.votos6 = 0;
        this.votos7 = 0;
        this.votos8 = 0;
        this.votos9 = 0;
        this.votos10 = 0;
        this.votosComodidad = 0;
        this.votosAtencion = 0;
        this.votoPrecios = 0;
        this.votosPlatos = 0;
        this.votosMuyMala = 0;
        this.votosMala = 0;
        this.votosRegular = 0;
        this.votosBuena = 0;
        this.votosMuyBuena = 0;
        this.resp3comodidad = false;
        this.resp3platos = false;
        this.resp3precios = false;
        this.resp3atencion = false;
        Chart.defaults.global.legend.display = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.usuarios = [];
        this.empleados = [];
        this.usuarios = [];
        this.vistas = [true, false, false];
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                _this.usuarios.push(data[item]);
            }
        }).then(function () {
            _this.empleados = _this.usuarios.filter(function (item) {
                return item.tipo == "mozo" || item.tipo == "cocinero" || item.tipo == "bartender" || item.tipo == "metre" || item.tipo == "repartidor";
            });
            _this.clientes = _this.usuarios.filter(function (item) {
                return item.tipo == "cliente" || item.tipo == "anonimo";
            });
            _this.encuesta();
        });
    }
    // ============================
    ListadoSupervisorPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ListadoSupervisorPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ListadoSupervisorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListadoSupervisorPage');
    };
    ListadoSupervisorPage.prototype.AlternarVista = function (indice) {
        this.vistas = [false, false, false];
        this.vistas[indice] = true;
    };
    ListadoSupervisorPage.prototype.MostrarEncuesta = function (usuario) {
        this.modalCtrl.create(EncuestaSupervisorPage, { usuario: usuario }).present();
    };
    ListadoSupervisorPage.prototype.encuesta = function () {
        var _this = this;
        var probRef = this.firebase.database().ref("encuestaDeEmpleado");
        probRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].uno == 1) {
                    _this.pregUnoPrimeraRespuesta++;
                }
                if (data[item].uno == 2) {
                    _this.pregUnoSegundaRespuesta++;
                }
                if (data[item].uno == 3) {
                    _this.pregUnoTerceraRespuesta++;
                }
                if (data[item].tres == "si") {
                    _this.pregTresPrimeraRespuesta++;
                }
                if (data[item].tres == "no") {
                    _this.pregTresSegundaRespuesta++;
                }
                if (data[item].cuatro == "si") {
                    _this.pregCuatroPrimeraRespuesta++;
                }
                if (data[item].cuatro == "no") {
                    _this.pregCuatroSegundaRespuesta++;
                }
                if (data[item].cinco.item1 == true) {
                    _this.pregCincoPrimeraRespuesta++;
                }
                if (data[item].cinco.item2 == true) {
                    _this.pregCincoSegundaRespuesta++;
                }
            }
        }).then(function () {
            _this.pieChartLabels = ['Sí', 'No'];
            _this.pieChartData = [_this.pregTresPrimeraRespuesta, _this.pregTresSegundaRespuesta];
            _this.pieChartLabelsDos = ['Sí', 'No'];
            //this.pieChartDataDos = [this.pregCuatroPrimeraRespuesta, this.pregCuatroPrimeraRespuesta];
            _this.pieChartDataDos = [_this.pregCuatroPrimeraRespuesta, _this.pregCuatroSegundaRespuesta];
            _this.pieChartLabelsCinco = ['Sí', 'No'];
            _this.pieChartDataCinco = [_this.pregCincoPrimeraRespuesta, _this.pregCincoSegundaRespuesta];
            _this.pieChartLabelsUno = ["Bien", "Más o menos", "Mal"];
            //this.pieChartDataUno = [this.pregUnoPrimeraRespuesta, this.pregUnoSegundaRespuesta, this.pregUnoTerceraRespuesta];
            _this.pieChartDataUno = [_this.pregUnoTerceraRespuesta, _this.pregUnoSegundaRespuesta, _this.pregUnoPrimeraRespuesta];
            _this.EncuestaFacu();
        });
    };
    ListadoSupervisorPage.prototype.EncuestaFacu = function () {
        var _this = this;
        var encuestaRef = firebase.database().ref("encuestaCliente/");
        encuestaRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                //Cargo los puntos para la pregunta 4.
                console.log(data[item].preg4);
                if (data[item].preg4 == 1) {
                    _this.votosHorribles++;
                }
                if (data[item].preg4 == 2) {
                    _this.votosFeos++;
                }
                if (data[item].preg4 == 3) {
                    _this.votosPasable++;
                }
                if (data[item].preg4 == 4) {
                    _this.votosAceptable++;
                }
                if (data[item].preg4 == 5) {
                    _this.votosBuenos++;
                }
                if (data[item].preg4 == 6) {
                    _this.votosRicos++;
                }
                if (data[item].preg4 == 7) {
                    _this.votosMuyRicos++;
                }
                //Cargo los puntos para pregunta 1
                if (data[item].preg1 == "Si") {
                    _this.votosPreg1Si++;
                }
                else {
                    _this.votosPreg1No++;
                }
                //Cargo los puntos para pregunta 2
                if (data[item].preg2 == "muy mala") {
                    _this.votosMuyMala++;
                }
                if (data[item].preg2 == "mala") {
                    _this.votosMala++;
                }
                if (data[item].preg2 == "muy buena") {
                    _this.votosMuyBuena++;
                }
                if (data[item].preg2 == "buena") {
                    _this.votosBuena++;
                }
                if (data[item].preg2 == "regular") {
                    _this.votosRegular++;
                }
                //Valido pregunta 3
                var resp3 = data[item].preg3.split("-");
                if (resp3[0] == "true") {
                    _this.votosComodidad++;
                }
                if (resp3[1] == "true") {
                    _this.votosPlatos++;
                }
                if (resp3[2] == "true") {
                    _this.votoPrecios++;
                }
                if (resp3[3] == "true") {
                    _this.votosAtencion++;
                }
                //Valido pregunta 5
                if (data[item].preg5 == "1") {
                    _this.votos1++;
                }
                if (data[item].preg5 == "2") {
                    _this.votos2++;
                }
                if (data[item].preg5 == "3") {
                    _this.votos3++;
                }
                if (data[item].preg5 == "4") {
                    _this.votos4++;
                }
                if (data[item].preg5 == "5") {
                    _this.votos5++;
                }
                if (data[item].preg5 == "6") {
                    _this.votos6++;
                }
                if (data[item].preg5 == "7") {
                    _this.votos7++;
                }
                if (data[item].preg5 == "8") {
                    _this.votos8++;
                }
                if (data[item].preg5 == "9") {
                    _this.votos9++;
                }
                if (data[item].preg5 == "10") {
                    _this.votos10++;
                }
            }
            _this.pregunta4Data = [
                _this.votosHorribles,
                _this.votosFeos,
                _this.votosPasable,
                _this.votosAceptable,
                _this.votosBuenos,
                _this.votosRicos,
                _this.votosMuyRicos
            ];
            _this.pregunta5Data = [
                _this.votos1,
                _this.votos2,
                _this.votos3,
                _this.votos4,
                _this.votos5,
                _this.votos6,
                _this.votos7,
                _this.votos8,
                _this.votos9,
                _this.votos10,
            ];
            _this.pregunta1Data = [
                _this.votosPreg1Si,
                _this.votosPreg1No
            ];
            _this.pregunta2Data = [
                _this.votosMuyMala,
                _this.votosMala,
                _this.votosRegular,
                _this.votosBuena,
                _this.votosMuyBuena
            ];
            _this.pregunta3Data = [
                _this.votosComodidad,
                _this.votosPlatos,
                _this.votoPrecios,
                _this.votosAtencion
            ];
        }).then(function () {
            _this.ocultarSpinner = true;
        });
    };
    ListadoSupervisorPage.prototype.MostrarImagen = function (imagen) {
        this.image = imagen;
        this.ocultarImagen = false;
    };
    ListadoSupervisorPage.prototype.OcultarImagen = function () {
        this.ocultarImagen = true;
    };
    ListadoSupervisorPage.prototype.Logout = function () {
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
    ListadoSupervisorPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listado-supervisor',
            templateUrl: 'listado-supervisor.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController])
    ], ListadoSupervisorPage);
    return ListadoSupervisorPage;
}());
export { ListadoSupervisorPage };
//# sourceMappingURL=listado-supervisor.js.map