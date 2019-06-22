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
import { LoginPage } from "../login/login";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import "firebase/firestore";
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
var AltaEmpleadoPage = /** @class */ (function () {
    function AltaEmpleadoPage(navCtrl, navParams, authInstance, toastCtrl, camera, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.barcodeScanner = barcodeScanner;
        this.firebase = firebase;
        this.db = firebase.firestore();
        this.tipo = "mozo";
        this.foto = "";
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
    AltaEmpleadoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AltaEmpleadoPage');
    };
    AltaEmpleadoPage.prototype.ionViewDidLeave = function () { };
    AltaEmpleadoPage.prototype.Registrar = function () {
        var _this = this;
        if (!this.correo || !this.clave || !this.nombre || !this.apellido || !this.dni || !this.cuil) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        if (!this.ValidarNumero(this.dni)) {
            this.presentToast("El DNI ingresado no es válido.");
            return;
        }
        if (!this.ValidarNumero(this.cuil)) {
            this.presentToast("El CUIL ingresado no es válido.");
            return;
        }
        this.estadoBoton = true;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var item in data) {
                if (data[item].dni == parseInt(_this.dni)) {
                    _this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
                    esValido = false;
                    _this.estadoBoton = false;
                    break;
                }
            }
            if (esValido) {
                var correo_1 = _this.correo.toLowerCase();
                _this.authInstance.auth.createUserWithEmailAndPassword(correo_1, _this.clave)
                    .then(function () {
                    var url = "";
                    if (_this.foto == "") {
                        url = "../../assets/imgs/alfa/perfil.jpg";
                        usuariosRef.push({
                            nombre: _this.nombre,
                            apellido: _this.apellido,
                            correo: correo_1,
                            dni: parseInt(_this.dni),
                            cuil: parseInt(_this.cuil),
                            tipo: _this.tipo,
                            clave: _this.clave,
                            img: url,
                            "encuesta": {
                                "pregunta1": {
                                    "pesimo": 0,
                                    "malo": 0,
                                    "mediocre": 0,
                                    "bueno": 0,
                                    "excelente": 0
                                },
                                "pregunta2": {
                                    "si": 0,
                                    "no": 0
                                },
                                "pregunta3": {
                                    "item1": 0,
                                    "item2": 0,
                                    "item3": 0
                                },
                                "pregunta4": {
                                    "si": 0,
                                    "no": 0
                                },
                                "pregunta5": [0]
                            }
                        }).then(function () {
                            _this.MostrarAlert("¡Éxito!", "Se registró correctamente el empleado.", "Aceptar", _this.LimpiarCampos);
                            _this.estadoBoton = false;
                        });
                    }
                    else {
                        var pictures_1 = _this.firebase.storage().ref("usuarios/" + _this.nombreFoto);
                        pictures_1.putString(_this.foto, "data_url").then(function () {
                            pictures_1.getDownloadURL().then(function (url) {
                                usuariosRef.push({
                                    nombre: _this.nombre,
                                    apellido: _this.apellido,
                                    correo: correo_1,
                                    dni: parseInt(_this.dni),
                                    cuil: parseInt(_this.cuil),
                                    tipo: _this.tipo,
                                    clave: _this.clave,
                                    img: url,
                                    "encuesta": {
                                        "pregunta1": {
                                            "pesimo": 0,
                                            "malo": 0,
                                            "mediocre": 0,
                                            "bueno": 0,
                                            "excelente": 0
                                        },
                                        "pregunta2": {
                                            "si": 0,
                                            "no": 0
                                        },
                                        "pregunta3": {
                                            "item1": 0,
                                            "item2": 0,
                                            "item3": 0
                                        },
                                        "pregunta4": {
                                            "si": 0,
                                            "no": 0
                                        },
                                        "pregunta5": [0]
                                    }
                                }).then(function () {
                                    _this.MostrarAlert("¡Éxito!", "Se registró correctamente el empleado.", "Aceptar", _this.LimpiarCampos);
                                    _this.estadoBoton = false;
                                });
                            });
                        });
                    }
                })
                    .catch(function (error) {
                    var mensaje;
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            mensaje = "El correo ingresado no es válido.";
                            _this.estadoBoton = false;
                            break;
                        case "auth/email-already-in-use":
                            mensaje = "Este usuario ya fue registrado previamente.";
                            _this.estadoBoton = false;
                            break;
                        case "auth/weak-password":
                            mensaje = "La contraseña debe tener 6 o más caracteres.";
                            _this.estadoBoton = false;
                            break;
                        default:
                            mensaje = "Ups... Tenemos problemas técnicos.";
                            _this.estadoBoton = false;
                            break;
                    }
                    _this.presentToast(mensaje);
                });
            }
        });
    };
    AltaEmpleadoPage.prototype.SacarFoto = function () {
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
    AltaEmpleadoPage.prototype.InicializarLectorQR = function () {
        var _this = this;
        var options = { prompt: "Escaneá el DNI", formats: "PDF_417" };
        this.barcodeScanner.scan(options).then(function (barcodeData) {
            var dniDatos = barcodeData.text.split("@");
            _this.apellido = dniDatos[1];
            _this.nombre = dniDatos[2];
            _this.dni = dniDatos[4];
        }).catch(function (err) { });
    };
    AltaEmpleadoPage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    AltaEmpleadoPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    AltaEmpleadoPage.prototype.LimpiarCampos = function () {
        this.ocultarAlert = true;
        this.correo = undefined;
        this.clave = undefined;
        this.nombre = undefined;
        this.apellido = undefined;
        this.dni = undefined;
        this.cuil = undefined;
        this.tipo = "mozo";
        this.foto = "";
    };
    AltaEmpleadoPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    AltaEmpleadoPage.prototype.Logout = function () {
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
    AltaEmpleadoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-alta-empleado',
            templateUrl: 'alta-empleado.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireAuth,
            ToastController,
            Camera,
            BarcodeScanner])
    ], AltaEmpleadoPage);
    return AltaEmpleadoPage;
}());
export { AltaEmpleadoPage };
//# sourceMappingURL=alta-empleado.js.map