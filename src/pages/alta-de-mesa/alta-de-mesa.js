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
import { IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import fireBase from "firebase";
import "firebase/firestore";
var AltaDeMesaPage = /** @class */ (function () {
    function AltaDeMesaPage() {
        var _this = this;
        this.fireBase = fireBase;
        this.dataBase = fireBase.firestore();
        this.tipo = "normal";
        this.foto = "";
        this.cerrarQR = false;
        this.esValido = false;
        this.estado = "vertical-container";
        this.arrayUsuarios = JSON.parse(localStorage.getItem("usuario"));
        this.arrayMesas = [];
        var mesasAux = this.fireBase.database().ref("mesas");
        mesasAux.once("value", function (snap) {
            var data = snap.val();
            for (var i in data) {
                _this.arrayMesas.push(data[i]);
            }
            _this.arrayMesas = _this.arrayMesas.sort(function (uno, dos) { return uno.numero - dos.numero; });
        });
        this.foto = "../../assets/imgs/alfa/approves.png";
        this.test = true;
    }
    AltaDeMesaPage.prototype.Alta = function () {
        var _this = this;
        if (!this.cantComensales || !this.numMesa || !this.tipo || this.foto == "") {
            this.presentToast("Porfavor complete todos los campos.");
            return;
        }
        else {
            this.presentToast("Solo hay disponible lugar mesas del 1 al 10.");
            return;
        }
        if (this.cantComensales < 1 || this.cantComensales > 8) {
            this.presentToast("El rango de comensales solo puede ser de 1 a 8.");
            return;
        }
        else {
        }
        var mesasAux = this.fireBase.database().ref("mesas");
        mesasAux.once("value", function (snap) {
            var data = snap.val();
            _this.esValido = true;
            for (var i in data) {
                if (data[i].numMesa == parseInt(_this.numMesa)) {
                    _this.presentToast("Esa mesa ya fue registrada.");
                    _this.esValido = false;
                }
            }
            if (_this.foto == "../../assets/imgs/alfa/approves.png" && _this.esValido) {
                var url = "../../assets/imgs/gamma/llama.jpeg";
                var mesasAux_1 = _this.fireBase.database().ref("mesas");
                mesasAux_1.push({
                    numeroMesa: _this.numMesa,
                    cantidadComensales: _this.cantComensales,
                    tipo: _this.tipo,
                    estado: "libre",
                    img: url
                }).then(function () {
                    _this.numMesa = "";
                    _this.cantComensales = "";
                    _this.foto = "";
                    _this.presentToast("La mesa fue cargada con éxito.");
                });
                ;
            }
            if (_this.foto != "../../assets/imgs/alfa/approves.png" && _this.esValido) {
                var mesasRef_1 = _this.firebase.database().ref("mesas");
                var pictures_1 = _this.firebase.storage().ref("mesas/" + (_this.nombreFoto + "mesaNumero:" + _this.numeroMesa));
                pictures_1.putString(_this.foto, "data_url").then(function () {
                    pictures_1.getDownloadURL().then(function (url) {
                        mesasRef_1.push({
                            numeroMesa: _this.numeroMesa,
                            cantidadComensales: _this.cantidadComensales,
                            tipo: _this.tipo,
                            estado: "libre",
                            img: url
                        }).then(function () {
                            _this.numeroMesa = "";
                            _this.cantidadComensales = "";
                            _this.foto = "";
                        });
                        ;
                    });
                });
            }
        });
    };
    AltaDeMesaPage.prototype.Alta = function () {
        var _this = this;
        var verMesaRef = this.firebase.database().ref("mesas");
        verMesaRef.once("value", function (snap) {
            var data = snap.val();
            _this.esValido = true;
            for (var item in data) {
                if (data[item].numeroMesa == parseInt(_this.numeroMesa)) {
                    _this.presentToast("Esa mesa ya ha sido registrada.");
                    _this.esValido = false;
                }
            }
            if (_this.foto == "http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg" && _this.esValido) {
                var url = "";
                url = "../../assets/imgs/gamma/llama.jpeg";
                var mesasRef = _this.firebase.database().ref("mesas");
                mesasRef.push({
                    numeroMesa: _this.numeroMesa,
                    cantidadComensales: _this.cantidadComensales,
                    tipo: _this.tipo,
                    estado: "libre",
                    img: url
                }).then(function () {
                    _this.numeroMesa = "";
                    _this.cantidadComensales = "";
                    _this.foto = "";
                    _this.presentToast("La mesa fue cargada con éxito.");
                });
                ;
            }
            if (_this.esValido && _this.foto != "http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg") {
                var mesasRef_2 = _this.firebase.database().ref("mesas");
                var pictures_2 = _this.firebase.storage().ref("mesas/" + (_this.nombreFoto + "mesaNumero:" + _this.numeroMesa));
                pictures_2.putString(_this.foto, "data_url").then(function () {
                    pictures_2.getDownloadURL().then(function (url) {
                        mesasRef_2.push({
                            numeroMesa: _this.numeroMesa,
                            cantidadComensales: _this.cantidadComensales,
                            tipo: _this.tipo,
                            estado: "libre",
                            img: url
                        }).then(function () {
                            _this.numeroMesa = "";
                            _this.cantidadComensales = "";
                            _this.foto = "";
                        });
                        ;
                    });
                });
            }
        });
    };
    AltaDeMesaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    AltaDeMesaPage.prototype.SacarFoto = function () {
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
                        this.presentToast(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AltaDeMesaPage.prototype.Logout = function () {
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
    AltaDeMesaPage.prototype.volver = function () {
        this.navController.pop();
    };
    AltaDeMesaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AltaDeMesaPage');
    };
    AltaDeMesaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-alta-de-mesa',
            templateUrl: 'alta-de-mesa.html',
        }),
        __metadata("design:paramtypes", [])
    ], AltaDeMesaPage);
    return AltaDeMesaPage;
}());
export { AltaDeMesaPage };
//# sourceMappingURL=alta-de-mesa.js.map