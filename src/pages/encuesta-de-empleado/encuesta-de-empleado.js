var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import * as Chart from 'chart.js';
import { LoginPage } from '../login/login';
import { PrincipalPage } from '../principal/principal';
//LINEA 336    361 Y 364 LAJSDKLASDLKASJDLKAJDKLJDLK
/**
 * Generated class for the EncuestaDeEmpleadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EncuestaDeEmpleadoPage = /** @class */ (function () {
    function EncuestaDeEmpleadoPage(navCtrl, navParams, authInstance, toastCtrl, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.encuestita = true;
        this.probabilidad = false;
        this.firebase = firebase;
        this.db = firebase.firestore();
        this.foto = "";
        //public cinco;
        this.cinco = { item1: false, item2: false };
        this.pregUnoPrimeraRespuesta = 0;
        this.pregUnoSegundaRespuesta = 0;
        this.pregUnoTerceraRespuesta = 0;
        this.pregTresPrimeraRespuesta = 0;
        this.pregTresSegundaRespuesta = 0;
        this.pregCuatroPrimeraRespuesta = 0;
        this.pregCuatroSegundaRespuesta = 0;
        this.pregCincoPrimeraRespuesta = 0;
        this.pregCincoSegundaRespuesta = 0;
        this.pieChartType = 'pie';
        //this.encuesta();
        //this.usuario = JSON.parse(localStorage.getItem("desloguear"));
        this.desloguaer = JSON.parse(localStorage.getItem("desloguear"));
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        // this.encuesta();
        Chart.defaults.global.legend.display = false;
        this.uno = 3;
        this.dos = "Me Encanta";
        this.tres = "si";
        this.cuatro = "si";
        this.cinco.item1 = true;
        //this.foto="asdads";
        //this.foto="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg"
        //let date = new Date();
        //this.nombreFoto=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;
        //this.foto="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg";
        this.foto = "https://upload.wikimedia.org/wikipedia/commons/5/50/Italian_dishes_on_a_table%2C_served_at_a_restaurant_in_Dhaka%2C_Bangladesh._2.JPG";
    }
    EncuestaDeEmpleadoPage.prototype.pruebita = function () {
        //alert("asd");
        this.cinco.item2 = false;
        this.cinco.item1 = true;
    };
    EncuestaDeEmpleadoPage.prototype.pruebitaDos = function () {
        this.cinco.item1 = false;
        this.cinco.item2 = true;
    };
    EncuestaDeEmpleadoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EncuestaDeEmpleadoPage');
    };
    EncuestaDeEmpleadoPage.prototype.Volver = function () {
        //this.navCtrl.setRoot(SuperControlPanelPage);
    };
    EncuestaDeEmpleadoPage.prototype.randomizeType = function () {
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    };
    EncuestaDeEmpleadoPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    EncuestaDeEmpleadoPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    EncuestaDeEmpleadoPage.prototype.enviarEncuesta = function () {
        //this.encuestita=false;
        // this.probabilidad=true;
        var _this = this;
        if (!this.uno || !this.dos || !this.tres || !this.cuatro || !this.cinco) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        //if(this.foto=="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg")
        if (this.foto == "https://upload.wikimedia.org/wikipedia/commons/5/50/Italian_dishes_on_a_table%2C_served_at_a_restaurant_in_Dhaka%2C_Bangladesh._2.JPG") {
            // this.presentToast("Tiene que cargar una foto");
            // return;
            var url = "";
            url = "../../assets/imgs/gamma/llama.jpeg";
            var mesasRef = this.firebase.database().ref("encuestaDeEmpleado");
            mesasRef.push({
                uno: this.uno,
                dos: this.dos,
                tres: this.tres,
                cuatro: this.cuatro,
                cinco: this.cinco,
                img: url
            }).then(function () {
                _this.presentToast("La encuesta fue cargada con éxito.");
                _this.encuesta();
            });
        }
        else {
            var mesasRef_1 = this.firebase.database().ref("encuestaDeEmpleado");
            var pictures_1 = this.firebase.storage().ref("encuestaDeEmpleado/" + this.nombreFoto);
            pictures_1.putString(this.foto, "data_url").then(function () {
                pictures_1.getDownloadURL().then(function (url) {
                    mesasRef_1.push({
                        uno: _this.uno,
                        dos: _this.dos,
                        tres: _this.tres,
                        cuatro: _this.cuatro,
                        cinco: _this.cinco,
                        img: url
                    });
                });
            }).then(function () {
                _this.presentToast("La encuesta fue cargada con éxito.");
                _this.encuesta();
            });
        }
        /*let mesasRef = this.firebase.database().ref("encuestaDeEmpleado");
    
        let pictures = this.firebase.storage().ref(`encuestaDeEmpleado/${this.nombreFoto}`);
    
        pictures.putString(this.foto, "data_url").then(() => {
    
          pictures.getDownloadURL().then((url) => {
    
            mesasRef.push({
              uno: this.uno,
              dos: this.dos,
              tres: this.tres,
              cuatro:this.cuatro,
              cinco:this.cinco,
              img: url
            });
          });
        }).then(() => {
    
          this.presentToast("la encuesta fue cargada con exito");
          this.encuesta();
    
    
    
    
        });*/
        //this.navCtrl
    };
    EncuestaDeEmpleadoPage.prototype.SacarFoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, nombreFoto, options, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        nombreFoto = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = {
                            quality: 50,
                            targetHeight: 600,
                            targetWidth: 600,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        result = _a.sent();
                        this.foto = "data:image/jpeg;base64," + result;
                        this.nombreFoto = nombreFoto;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EncuestaDeEmpleadoPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    EncuestaDeEmpleadoPage.prototype.encuesta = function () {
        var _this = this;
        var probRef = this.firebase.database().ref("encuestaDeEmpleado");
        probRef.once("value", function (snap) {
            var data = snap.val();
            //this.esValido = true;
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
                    // alert("entre");
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
            //this.pieChartData = [this.pregTresPrimeraRespuesta, this.pregTresSegundaRespuesta];
            _this.pieChartData = [_this.pregTresPrimeraRespuesta, _this.pregTresSegundaRespuesta];
            _this.pieChartLabelsDos = ['Sí', 'No'];
            _this.pieChartDataDos = [_this.pregCuatroPrimeraRespuesta, _this.pregCuatroSegundaRespuesta];
            _this.pieChartLabelsCinco = ['Sí', 'No'];
            _this.pieChartDataCinco = [_this.pregCincoPrimeraRespuesta, _this.pregCincoSegundaRespuesta];
            _this.pieChartLabelsUno = ["Bien", "Más o menos", "Mal"];
            //CAMBIE ESTO AL REVES
            _this.pieChartDataUno = [_this.pregUnoTerceraRespuesta, _this.pregUnoSegundaRespuesta, _this.pregUnoPrimeraRespuesta];
            _this.encuestita = false;
            _this.probabilidad = true;
        });
    };
    EncuestaDeEmpleadoPage.prototype.Logout = function () {
        var _this = this;
        if (localStorage.getItem("desloguear")) {
            var usuariosRef_1 = this.firebase.database().ref("usuarios");
            usuariosRef_1.once("value", function (snap) {
                var data = snap.val();
                for (var item in data) {
                    if (data[item].correo == _this.usuario.correo) {
                        usuariosRef_1.child(item).update({
                            logueado: false
                        }).then(function () {
                            localStorage.clear();
                            _this.navCtrl.setRoot(LoginPage);
                        });
                        break;
                    }
                }
            });
        }
        else {
            this.navCtrl.setRoot(PrincipalPage);
        }
    };
    EncuestaDeEmpleadoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-encuesta-de-empleado',
            templateUrl: 'encuesta-de-empleado.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AngularFireAuth, ToastController, Camera])
    ], EncuestaDeEmpleadoPage);
    return EncuestaDeEmpleadoPage;
}());
export { EncuestaDeEmpleadoPage };
//# sourceMappingURL=encuesta-de-empleado.js.map