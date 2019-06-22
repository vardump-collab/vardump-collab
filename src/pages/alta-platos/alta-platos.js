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
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import "firebase/firestore";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LoginPage } from '../login/login';
import { EncuestaDeEmpleadoPage } from '../encuesta-de-empleado/encuesta-de-empleado';
/**
 * Generated class for the AltaPlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AltaPlatosPage = /** @class */ (function () {
    function AltaPlatosPage(navCtrl, navParams, camera, aut, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.aut = aut;
        this.barcodeScanner = barcodeScanner;
        this.foto1 = "";
        this.foto2 = "";
        this.foto3 = "";
        this.cocineroBebida = false;
        this.bloquearBotones = false;
        this.esCocinero = false;
        this.esBartender = false;
        this.ocultarQr = true;
        this.mostrarAlert3 = false;
        this.tipoBebida = "";
        this.firebase = firebase;
        this.mostrarSpinner = false;
        this.ocultar = false;
        this.mostrar = false;
        this.mostrarbtn1 = true;
        this.mostrarbtn2 = true;
        this.mostrarbtn3 = true;
        this.mostrarfoto1 = false;
        this.mostrarfoto2 = false;
        this.mostrarfoto3 = false;
        this.ocultarTiempo = false;
        this.carga = "platos";
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        //Descomentar esta linea antes de hacer el push
        this.tipo = localStorage.getItem("usuario");
        this.tipo = JSON.parse(this.tipo).tipo;
        this.cantMostrar = "grs";
        //this.tipo ="cocinero";
        if (this.tipo == "cocinero") {
            this.esCocinero = true;
        }
        else {
            this.esBartender = true;
            this.ocultarTiempo = true;
        }
        //BORRAR ESTA LINEA ANTES DE HACER EL PUSH.
        //this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
    }
    AltaPlatosPage.prototype.ionViewDidLoad = function () {
        // AngularFireModule.initializeApp(firebaseConfig.fire);
        console.log('ionViewDidLoad AltaPlatosPage');
    };
    AltaPlatosPage.prototype.pedido = function () {
        /*if(this.tipo=="cocinero")
        {
          this.tipo="bartender";
          this.esCocinero=false;
          this.esBartender=true;
         
        }
        else
        {
          this.tipo="cocinero";
          this.esBartender=false;
          this.esCocinero=true;
         
        }
      
    */
    };
    AltaPlatosPage.prototype.opcion = function (valor) {
        if (valor == "salir") {
            return;
        }
        if (this.carga == "platos") {
            this.cantMostrar = "grs";
            this.ocultarTiempo = false;
            this.cocineroBebida = false;
            this.tiempo = "";
            this.precio = "";
            this.cantidad = "";
            this.nombre = "";
            this.descripcion = "";
            this.ocultarQr = true;
            this.mostrarbtn1 = true;
            this.mostrarfoto1 = false;
            this.mostrarbtn2 = true;
            this.mostrarfoto2 = false;
            this.mostrarbtn3 = true;
            this.mostrarfoto3 = false;
        }
        if (this.carga == "bebidas") {
            this.cantMostrar = "cent. cúbicos";
            this.ocultarTiempo = true;
            this.cocineroBebida = true;
            this.tiempo = "";
            this.precio = "";
            this.cantidad = "";
            this.nombre = "";
            this.descripcion = "";
            this.ocultarQr = false;
            this.mostrarbtn1 = true;
            this.mostrarfoto1 = false;
            this.mostrarbtn2 = true;
            this.mostrarfoto2 = false;
            this.mostrarbtn3 = true;
            this.mostrarfoto3 = false;
        }
    };
    AltaPlatosPage.prototype.Fotos = function () {
        this.ocultar = true;
        this.mostrar = true;
    };
    AltaPlatosPage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    AltaPlatosPage.prototype.LeerQr = function () {
        var _this = this;
        this.options = { prompt: "Escaneá el qr del producto", formats: 'QR_CODE' };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            var texto = (barcodeData.text);
            var miScan = (texto).split('@');
            if (miScan[5] == undefined) {
                _this.mensaje = "QR no válido";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                }, 3000);
                return;
            }
            if (miScan[5] != "true") {
                _this.mensaje = "QR no válido";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                }, 3000);
                return;
            }
            _this.nombre = miScan[0];
            _this.descripcion = miScan[1];
            _this.cantidad = miScan[3];
            _this.precio = miScan[4];
            //  this.tipoBebida=miScan[6];
        });
    };
    AltaPlatosPage.prototype.Cancelar = function () {
        if (this.bloquearBotones) {
            return;
        }
        this.ocultar = false;
        this.mostrar = false;
        this.mostrarbtn1 = true;
        this.mostrarfoto1 = false;
        this.mostrarbtn2 = true;
        this.mostrarfoto2 = false;
        this.mostrarbtn3 = true;
        this.mostrarfoto3 = false;
    };
    AltaPlatosPage.prototype.tomarFoto1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.bloquearBotones) {
                    return [2 /*return*/];
                }
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
                        _this.mostrarbtn1 = false;
                        _this.mostrarfoto1 = true;
                    }, function (err) {
                        console.log(err);
                    });
                }
                catch (err) {
                }
                return [2 /*return*/];
            });
        });
    };
    AltaPlatosPage.prototype.tomarFoto2 = function () {
        var _this = this;
        if (this.bloquearBotones) {
            return;
        }
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
                _this.mostrarbtn2 = false;
                _this.mostrarfoto2 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    AltaPlatosPage.prototype.tomarFoto3 = function () {
        var _this = this;
        if (this.bloquearBotones) {
            return;
        }
        try {
            this.camera.getPicture({
                destinationType: this.camera.DestinationType.DATA_URL,
                quality: 50,
                targetWidth: 600,
                targetHeight: 600,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto3 = "data:image/jpeg;base64," + imageData;
                _this.mostrarbtn3 = false;
                _this.mostrarfoto3 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    AltaPlatosPage.prototype.Cargar = function () {
        var _this = this;
        if (this.bloquearBotones) {
            return;
        }
        this.bloquearBotones = true;
        var carga;
        if (this.tipo == "cocinero") {
            //valido cocinero
            if (this.carga == "bebidas") {
                if (!this.nombre || !this.precio || !this.cantidad || !this.descripcion) {
                    this.mensaje = "Todos los campos son obligatorios";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                /*    if(this.tipoBebida=="")
                    {
                      this.mensaje="Debe indicar que tipo de bebida cargara";
                      this.mostrarAlert3=true;
                      setTimeout(()=>{
            
                        this.mostrarAlert3=false;
                      }, 3000);
                      return;
                    }*/
                if (!this.ValidarNumero(this.cantidad)) {
                    this.mensaje = "La cantidad ingresada debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.cantidad) > 5000) {
                    this.mensaje = "La cantidad ingresada es demasiado alta";
                    this.cantidad = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.precio)) {
                    this.mensaje = "El precio ingresado debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.precio) > 5000) {
                    this.mensaje = "El precio ingresado es demasiado alto";
                    this.precio = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (this.foto1 === "" || this.foto2 == "" || this.foto3 == "") {
                    this.mensaje = "Las fotos son obligatorias";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                //valido los campos de cocinero para bebidas
            }
            else {
                if (!this.nombre || !this.precio || !this.cantidad || !this.tiempo || !this.descripcion) {
                    this.mensaje = "Todos los campos son obligatorios";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.cantidad)) {
                    this.mensaje = "La cantidad ingresada debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.precio)) {
                    this.mensaje = "El precio ingresado debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.tiempo)) {
                    this.mensaje = "El tiempo ingresado debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.cantidad) > 5000) {
                    this.mensaje = "La cantidad ingresada es demasiado alta";
                    this.cantidad = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.precio) > 5000) {
                    this.mensaje = "El precio ingresado es demasiado alto";
                    this.precio = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.tiempo) > 150) {
                    this.mensaje = "El tiempo ingresado es demasiado alto";
                    this.tiempo = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (this.foto1 === "" || this.foto2 == "" || this.foto3 == "") {
                    this.mensaje = "Las fotos son obligatorias";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
            }
            this.mostrarSpinner = true;
            var pedidoRef = firebase.database().ref("platos");
            pedidoRef.once("value", function (snap) {
                var data = snap.val();
                var esValido = true;
                for (var item in data) {
                    if (_this.carga == "bebidas") {
                        if (data[item].carga.nombre == _this.nombre) {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "La bebida que intenta cargar ya esta existe intente con otro nombre.";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                            esValido = false;
                        }
                    }
                    else {
                        if (data[item].carga.nombre == _this.nombre) {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "El nombre del plato   que intenta cargar ya existe  intente con otro nombre.";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                            esValido = false;
                            break;
                        }
                    }
                }
                if (esValido) {
                    if (_this.carga == "bebidas") {
                        carga =
                            {
                                nombre: _this.nombre,
                                desc: _this.descripcion,
                                precio: parseFloat(_this.precio),
                                cant: parseInt(_this.cantidad),
                                foto1: _this.foto1,
                                foto2: _this.foto2,
                                foto3: _this.foto3,
                                es: "bebida",
                                para: "cocinero"
                            };
                        var mensaje = firebase.database().ref().child("platos");
                        mensaje.push({ carga: carga }).then(function () {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "La bebida se cargo exitósamente";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.tiempo = "";
                                _this.precio = "";
                                _this.cantidad = "";
                                _this.nombre = "";
                                _this.descripcion = "";
                                _this.tipoBebida = "";
                                _this.mostrarbtn1 = true;
                                _this.mostrarfoto1 = false;
                                _this.mostrarbtn2 = true;
                                _this.mostrarfoto2 = false;
                                _this.mostrarbtn3 = true;
                                _this.mostrarfoto3 = false;
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                        });
                    }
                    else {
                        carga =
                            {
                                nombre: _this.nombre,
                                desc: _this.descripcion,
                                precio: parseFloat(_this.precio),
                                cant: parseInt(_this.cantidad),
                                tiempo: parseInt(_this.tiempo),
                                foto1: _this.foto1,
                                foto2: _this.foto2,
                                foto3: _this.foto3,
                                es: "plato",
                                para: "cocinero"
                            };
                        var mensaje = firebase.database().ref().child("platos");
                        mensaje.push({ carga: carga }).then(function () {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "El plato se cargo exitósamente";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.tiempo = "";
                                _this.precio = "";
                                _this.cantidad = "";
                                _this.nombre = "";
                                _this.descripcion = "";
                                _this.tipoBebida = "";
                                _this.mostrarbtn1 = true;
                                _this.mostrarfoto1 = false;
                                _this.mostrarbtn2 = true;
                                _this.mostrarfoto2 = false;
                                _this.mostrarbtn3 = true;
                                _this.mostrarfoto3 = false;
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                        });
                    }
                }
            });
        }
        else {
            //VALIDO TODO LO DEL BARTENDER!!!!!!
            if (!this.nombre || !this.precio || !this.cantidad || !this.descripcion) {
                this.mensaje = "Todos los campos son obligatorios";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (!this.ValidarNumero(this.precio)) {
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (parseInt(this.precio) > 5000) {
                this.mensaje = "El precio ingresado es demasiado alto";
                this.precio = undefined;
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (!this.ValidarNumero(this.cantidad)) {
                this.mensaje = "La cántidad ingresado debe ser un número";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (parseInt(this.cantidad) > 3000) {
                this.mensaje = "Los centímetros cúbicos  ingresados son demasiados";
                this.cantidad = undefined;
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (this.foto1 === "" || this.foto2 == "" || this.foto3 == "") {
                this.mensaje = "Las fotos son obligatorias";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            //VALIDO EL NOMBRE EN LA BASE DE DATOS
            this.mostrarSpinner = true;
            var pedidoRef = firebase.database().ref("platos");
            pedidoRef.once("value", function (snap) {
                var data = snap.val();
                var esValido = true;
                for (var item in data) {
                    if (data[item].carga.nombre == _this.nombre) {
                        _this.mostrarSpinner = false;
                        _this.mensaje = "El nombre de la bebida o trago que intenta cargar ya existe  utilize otro por favor.";
                        _this.mostrarAlert3 = true;
                        setTimeout(function () {
                            _this.mostrarAlert3 = false;
                            _this.bloquearBotones = false;
                        }, 3000);
                        esValido = false;
                        break;
                    }
                }
                if (esValido) {
                    carga =
                        {
                            nombre: _this.nombre,
                            desc: _this.descripcion,
                            precio: parseFloat(_this.precio),
                            cant: parseInt(_this.cantidad),
                            foto1: _this.foto1,
                            foto2: _this.foto2,
                            foto3: _this.foto3,
                            es: "bebida",
                            para: "bartender"
                        };
                    var mensaje = firebase.database().ref().child("platos");
                    mensaje.push({ carga: carga }).then(function () {
                        _this.mostrarSpinner = false;
                        _this.mensaje = "La bebida se cargo exitósamente";
                        _this.mostrarAlert3 = true;
                        setTimeout(function () {
                            _this.tiempo = "";
                            _this.precio = "";
                            _this.cantidad = "";
                            _this.nombre = "";
                            _this.descripcion = "";
                            _this.mostrarbtn1 = true;
                            _this.mostrarfoto1 = false;
                            _this.mostrarbtn2 = true;
                            _this.mostrarfoto2 = false;
                            _this.mostrarbtn3 = true;
                            _this.mostrarfoto3 = false;
                            _this.tipoBebida = "";
                            _this.mostrarAlert3 = false;
                            _this.bloquearBotones = false;
                        }, 3000);
                    });
                }
            });
            //VALIDO TOOD LO DEL BARTENDER:
        }
        /*  else
          {
            carga =
        {
          nombre:this.nombre,
          desc:this.descripcion,
          precio:parseFloat(this.precio),
          cant:parseInt(this.cantidad),
          tiempo:parseInt(this.tiempo),
        foto1:this.foto1,
          foto2:this.foto2,
          foto3:this.foto3,
          es:"plato",
          para:"cocinero"
        };
  
          }
          let mensaje = firebase.database().ref().child("platos");
          mensaje.push({carga});
  
        }
        else
        {
          //Valido bartender
          carga =
        {
          nombre:this.nombre,
          desc:this.descripcion,
          precio:this.precio,
          cant:this.cantidad,
          es:"bebida",
          foto1:this.foto1,
          foto2:this.foto2,
          foto3:this.foto3,
          para:"bartender"
      
        };
  
        }
  
      
  
      
          let mensaje = firebase.database().ref().child("platos");
        mensaje.push({carga});
  
  
  */
    };
    AltaPlatosPage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    AltaPlatosPage.prototype.Logout = function () {
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
                            localStorage.setItem("desloguear", "true");
                            _this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
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
    AltaPlatosPage = __decorate([
        Component({
            selector: 'page-alta-platos',
            templateUrl: 'alta-platos.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Camera,
            AngularFireAuth,
            BarcodeScanner])
    ], AltaPlatosPage);
    return AltaPlatosPage;
}());
export { AltaPlatosPage };
//# sourceMappingURL=alta-platos.js.map