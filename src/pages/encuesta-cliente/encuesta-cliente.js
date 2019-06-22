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
import { Camera } from '@ionic-native/camera';
import { PedirPlatosPage } from '../pedir-platos/pedir-platos';
import { Chart } from 'chart.js';
import { LoginPage } from '../login/login';
/**
 * Generated class for the EncuestaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EncuestaClientePage = /** @class */ (function () {
    function EncuestaClientePage(navCtrl, navParams, camera, aut) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.aut = aut;
        this.firebase = firebase;
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
        //Para los votos de la preg 
        this.movioElRange = false;
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
        this.resp4 = 4;
        this.resp5 = "";
        this.foto1 = "";
        this.foto2 = "";
        this.foto3 = "";
        this.mostrarAlert3 = false;
        this.mostrarChart = false;
        //Para mostrar los tildes
        this.respPreg1 = false;
        this.respPreg2 = false;
        this.respPreg3 = false;
        this.respPreg4 = false;
        this.respPreg5 = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.ocultar = true;
        this.ocultar2 = true;
        this.ocultar3 = true;
        this.ocultar4 = true;
        this.ocultar5 = true;
        this.ocultarBoton1 = false;
        this.ocultarBoton2 = false;
        this.ocultarBoton3 = false;
        this.ocultar6 = true;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).nombre;
        this.mostrarfoto1 = false;
        this.mostrarfoto2 = false;
        this.mostrarfoto3 = false;
        //setear esta variable con el cliente sacado del local storage
        //  this.cliente ="yoCliente";
        //DESCOMENTAR ESTA LINEA PARA TRABAJAR A NIVEL LOCAL!!!
        //  this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        Chart.defaults.global.legend.display = false;
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
            _this.pregunta1Data =
                [
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
        });
    }
    EncuestaClientePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EncuestaClientePage');
    };
    EncuestaClientePage.prototype.pregunta1 = function () {
        this.ocultar = false;
    };
    EncuestaClientePage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    EncuestaClientePage.prototype.irA = function () {
        this.navCtrl.push(PedirPlatosPage);
    };
    EncuestaClientePage.prototype.pregunta2 = function () {
        this.ocultar2 = false;
    };
    EncuestaClientePage.prototype.pregunta3 = function () {
        this.ocultar3 = false;
    };
    EncuestaClientePage.prototype.pregunta4 = function () {
        this.ocultar4 = false;
        console.log(this.votosAceptable);
    };
    EncuestaClientePage.prototype.pregunta5 = function () {
        this.ocultar5 = false;
    };
    EncuestaClientePage.prototype.pregunta6 = function () {
        this.ocultar6 = false;
    };
    EncuestaClientePage.prototype.Aceptar = function (valor) {
        var _this = this;
        switch (valor) {
            case "1":
                if (!this.resp1) {
                    this.mensaje = "No contestó la pregunta. Elija una opción para contestar";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
            case "2":
                if (!this.resp2) {
                    this.mensaje = "No contestó la pregunta. Elija una  opción para contestar.";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
            case "3":
                if (this.resp3atencion == false && this.resp3comodidad == false && this.resp3platos == false && this.resp3precios == false) {
                    this.mensaje = "No contestó la pregunta. Elija una o más opciones para contestar.";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
            case "4":
                if (!this.movioElRange) {
                    this.mensaje = "No contestó la pregunta, mueva el rango para contestar";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
        }
        this.ocultar = true;
        this.ocultar2 = true;
        this.ocultar3 = true;
        this.ocultar4 = true;
        this.ocultar5 = true;
        this.ocultar6 = true;
        console.log(this.resp1);
        console.log(this.resp2);
        console.log(this.resp3comodidad);
        console.log(this.resp3platos);
        console.log(this.resp3precios);
        console.log(this.resp3atencion);
        console.log(this.resp4);
        console.log(this.resp5);
        //Me fijo si debo poner tilde o no
        if (this.resp1) {
            this.respPreg1 = false;
        }
        if (this.resp2) {
            this.respPreg2 = false;
        }
        if (this.resp3atencion) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.resp3comodidad) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.resp3platos) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.resp3precios) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.movioElRange) {
            this.respPreg4 = false;
        }
    };
    EncuestaClientePage.prototype.cerrarPregunta = function () {
        this.ocultar = true;
        this.ocultar2 = true;
        this.ocultar3 = true;
        this.ocultar4 = true;
        this.ocultar5 = true;
        this.ocultar6 = true;
    };
    EncuestaClientePage.prototype.Aceptar5 = function () {
        var _this = this;
        if (!this.resp5) {
            this.mensaje = "No contesto la pregunta.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 2000);
            return;
        }
        if (!this.ValidarNumero(this.resp5)) {
            this.mensaje = "Debe ingresar un número en este campo.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 3500);
            return;
        }
        var valor = parseInt(this.resp5);
        if (valor < 1 || valor > 10) {
            this.mensaje = "El número ingresado debe estar en el rango del 1 a 10.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 3500);
            return;
        }
        this.ocultar5 = true;
        if (this.resp5) {
            this.respPreg5 = false;
        }
        console.log(this.resp3atencion);
        console.log(this.resp3platos);
        console.log(this.resp3precios);
        console.log(this.resp3comodidad);
    };
    EncuestaClientePage.prototype.Foto1 = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto1 = "data:image/jpeg;base64," + imageData;
                _this.mostrarfoto1 = true;
                _this.ocultarBoton1 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    EncuestaClientePage.prototype.Foto2 = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto2 = "data:image/jpeg;base64," + imageData;
                _this.mostrarfoto2 = true;
                _this.ocultarBoton2 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    EncuestaClientePage.prototype.Foto3 = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto3 = "data:image/jpeg;base64," + imageData;
                _this.mostrarfoto3 = true;
                _this.ocultarBoton3 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    EncuestaClientePage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    EncuestaClientePage.prototype.mostrarelChart = function () {
        this.mostrarChart = true;
    };
    EncuestaClientePage.prototype.cerrarChart = function () {
        this.mostrarChart = false;
    };
    EncuestaClientePage.prototype.SubirEncuesta = function () {
        var _this = this;
        var preg3ok = true;
        var preg4ok = true;
        if (!this.resp1) {
            this.respPreg1 = true;
        }
        if (!this.resp2) {
            this.respPreg2 = true;
        }
        if (!this.movioElRange) {
            this.respPreg4 = true;
            preg4ok = false;
        }
        if (!this.resp5) {
            this.respPreg5 = true;
        }
        if (this.resp3atencion == false && this.resp3comodidad == false && this.resp3platos == false && this.resp3precios == false) {
            this.respPreg3 = true;
            preg3ok = false;
        }
        if (!this.resp1 || !this.resp2 || !preg3ok || !preg4ok || !this.resp5) {
            this.mensaje = "Debe contestar todas las preguntas para poder enviar la encuesta.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 3000);
            return;
        }
        var carga = {
            preg1: this.resp1,
            preg2: this.resp2,
            preg3: this.resp3platos + "-" + this.resp3comodidad + "-" + this.resp3precios + "-" + this.resp3atencion,
            preg4: this.resp4,
            preg5: parseInt(this.resp5),
            foto1: this.foto1,
            foto2: this.foto2,
            foto3: this.foto3,
            cliente: this.correo
        };
        var mensaje = firebase.database().ref().child("encuestaCliente/");
        mensaje.push(carga).then(function () {
            _this.mensaje = "Muchas gracias por hacer la encuesta.";
            _this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.Logout();
            }, 2000);
        });
    };
    EncuestaClientePage.prototype.ModificarTextoRange = function () {
        this.movioElRange = true;
        switch (this.resp4) {
            case 1:
                this.textoRange = "Horribles";
                break;
            case 2:
                this.textoRange = "Feos";
                break;
            case 3:
                this.textoRange = "Pasable";
                break;
            case 4:
                this.textoRange = "Aceptable";
                break;
            case 5:
                this.textoRange = "Buenos";
                break;
            case 6:
                this.textoRange = "Ricos";
                break;
            case 7:
                this.textoRange = "Muy Ricos";
                break;
            default:
                this.textoRange = "Algo fallo";
                break;
        }
    };
    EncuestaClientePage.prototype.Logout = function () {
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
    EncuestaClientePage = __decorate([
        Component({
            selector: 'page-encuesta-cliente',
            templateUrl: 'encuesta-cliente.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Camera, AngularFireAuth])
    ], EncuestaClientePage);
    return EncuestaClientePage;
}());
export { EncuestaClientePage };
//# sourceMappingURL=encuesta-cliente.js.map