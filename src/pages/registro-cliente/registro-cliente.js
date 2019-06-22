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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RegistroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for m
 * import { BarcodeScanner } from '@ionic-native/barcode-scanner';ore info on
 * Ionic pages and navigation.
 */
//Descomentar linea 189 y 118 antes de hacer el push.
var RegistroClientePage = /** @class */ (function () {
    function RegistroClientePage(navCtrl, navParams, authInstance, camera, barcodeScanner, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.camera = camera;
        this.barcodeScanner = barcodeScanner;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.prueba = "";
        this.mostrarSpinner = false;
        this.foto = "";
        this.miScan = {};
        this.mostrarAlert = false;
        this.prueba = "";
        // this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        this.formReg = true;
        this.ocultarCabecera = false;
        this.formInicial = false;
        this.formAnon = false;
        this.ocultarContenido = false;
        this.ocultarCabecera = false;
        this.foto = "../../assets/imgs/alfa/perfil.jpg";
        console.log(this.foto);
    }
    RegistroClientePage.prototype.ionViewDidEnter = function () {
        this.foto = "";
        // fires on navCtrl.push(DBLocomotive)
    };
    RegistroClientePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroClientePage');
    };
    RegistroClientePage.prototype.Registrar = function () {
        //Valido los campos que no esten vacios
        var _this = this;
        if (!this.correo || !this.pass || !this.nombre || !this.apellido || !this.dni) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        this.mostrarSpinner = true;
        var usuariosRef = firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var item in data) {
                if (data[item].dni == _this.dni) {
                    _this.mostrarSpinner = false;
                    _this.presentToast("El DNI ingresado es de  otro usuario registrado.");
                    esValido = false;
                    break;
                }
            }
            if (esValido) {
                var correo_1 = _this.correo.toLowerCase();
                _this.authInstance.auth.createUserWithEmailAndPassword(correo_1, _this.pass)
                    .then(function () {
                    _this.authInstance.auth.currentUser.sendEmailVerification();
                    usuariosRef.push({
                        nombre: _this.nombre,
                        apellido: _this.apellido,
                        correo: correo_1,
                        dni: _this.dni,
                        tipo: "cliente",
                        clave: _this.pass,
                        img: _this.foto,
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
                        _this.mostrarSpinner = false;
                        _this.mostrarAlert = true;
                        setTimeout(function () {
                            _this.mostrarAlert = false;
                            _this.navCtrl.pop();
                            _this.LimpiarCampos();
                            //   this.navCtrl.pop();
                        }, 4000);
                    });
                    //});
                }).catch(function (error) {
                    var mensaje;
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            mensaje = "El correo ingresado no es válido.";
                            _this.correo = "";
                            break;
                        case "auth/email-already-in-use":
                            mensaje = "Este usuario ya fue registrado previamente.";
                            _this.correo = "";
                            break;
                        case "auth/weak-password":
                            mensaje = "La contraseña debe tener 6 o más caracteres.";
                            _this.pass = "";
                            break;
                        default:
                            mensaje = "Ups... Tenemos problemas técnicos.";
                            break;
                    }
                    _this.mostrarSpinner = false;
                    _this.presentToast(mensaje);
                });
            }
        })
            .catch(function (error) {
            var mensaje;
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    mensaje = "El correo ingresado no es válido.";
                    break;
                case "auth/email-already-in-use":
                    mensaje = "Este usuario ya fue registrado previamente.";
                    break;
                case "auth/weak-password":
                    mensaje = "La contraseña debe tener 6 o más caracteres.";
                    break;
                default:
                    mensaje = "Ups... Tenemos problemas técnicos.";
                    break;
            }
            _this.mostrarSpinner = false;
            _this.presentToast(mensaje);
        });
    };
    RegistroClientePage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    RegistroClientePage.prototype.RegistrarAnonimo = function () {
        var _this = this;
        if (!this.correo || !this.pass || !this.nombre) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        this.mostrarSpinner = true;
        var usuariosRef = firebase.database().ref("usuarios");
        var correo = this.correo.toLowerCase();
        this.authInstance.auth.createUserWithEmailAndPassword(correo, this.pass)
            .then(function () {
            usuariosRef.push({
                nombre: _this.nombre,
                tipo: "anonimo",
                correo: correo,
                clave: _this.pass,
                img: _this.foto,
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
                _this.mostrarSpinner = false;
                _this.mostrarAlert = true;
                setTimeout(function () {
                    _this.mostrarAlert = false;
                    _this.LimpiarCampos();
                    // this.navCtrl.pop();
                }, 3000);
            });
        })
            .catch(function (error) {
            var mensaje;
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    mensaje = "El correo ingresado no es válido.";
                    break;
                case "auth/email-already-in-use":
                    mensaje = "Este usuario ya fue registrado previamente.";
                    break;
                case "auth/weak-password":
                    mensaje = "La contraseña debe tener 6 o más caracteres.";
                    break;
                default:
                    mensaje = "Ups... Tenemos problemas técnicos.";
                    break;
            }
            _this.mostrarSpinner = false;
            _this.presentToast(mensaje);
        });
    };
    //Valido que el dni no este en la base de datos
    //  let miusuariosRef = firebase.database().ref("usuarios");
    /* miusuariosRef.once("value", (snap) => {
   
       let data = snap.val();
       let esValido = true;
   
       for (let item in data) {
   
         if (data[item].dni == this.dni) {
   
           this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
           esValido = false;
          
           break;
         
       }
     }
     if (esValido) {
   
       let correo = this.correo.toLowerCase();
      
         
   
       this.authInstance.auth.createUserWithEmailAndPassword(this.correo, this.pass.toString())
             .then(() => {
               console.log("subo a la base");
            
            
                 miusuariosRef.push({
                   nombre: this.nombre,
                   apellido: this.apellido,
                   dni:this.dni,
                   correo:this.correo,
                   clave:this.pass,
                   tipo:"cliente",
                   img:this.foto
                 
                 }).then(() => {
                   alert("¡Éxito!,Se registró correctamente el cliente");
                   this.LimpiarCampos();
                  
               
                 });
               });
             });
           }
         })
           .catch(error => {
   
             let mensaje: string;
   
             console.log(error.code);
           });
          
   */
    RegistroClientePage.prototype.LimpiarCampos = function () {
        this.correo = undefined;
        this.pass = undefined;
        this.nombre = undefined;
        this.apellido = undefined;
        this.dni = undefined;
        this.foto = "";
    };
    RegistroClientePage.prototype.ElegirUsuario = function (tipo) {
        this.LimpiarCampos();
        this.prueba = "";
        this.formInicial = false;
        if (tipo == "anonimo") {
            this.clase = "anonimo";
            this.formAnon = true;
            this.formReg = false;
            this.ocultarCabecera = true;
        }
        if (tipo == "registrado") {
            this.clase = "registrado";
            this.formReg = true;
            this.formAnon = false;
            this.ocultarCabecera = true;
            //  (window.document.querySelector("#cab") as HTMLElement).style.display="none";
        }
    };
    RegistroClientePage.prototype.cerrarForm = function () {
        this.formInicial = true;
        this.formReg = false;
        this.formAnon = false;
        this.ocultarCabecera = false;
    };
    RegistroClientePage.prototype.tomarFoto = function () {
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
                _this.foto = "data:image/jpeg;base64," + imageData;
                _this.prueba = _this.foto;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    RegistroClientePage.prototype.scanear = function () {
        var _this = this;
        this.options = { prompt: "Escaneá tu DNI", formats: "PDF_417" };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            _this.miScan = (barcodeData.text).split('@');
            _this.apellido = _this.miScan[1];
            var unNombre = _this.miScan[2];
            //this.nombre = this.miScan[2];
            var nombres = unNombre.split(' ');
            _this.nombre = nombres[0];
            _this.dni = _this.miScan[4];
            alert(_this.miScan);
        }, function (error) {
            //this.errorHandler.mostrarErrorLiteral(error);
        });
        /*
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          this.scanedCode = text;
          try{
            this.scanedCode=JSON.parse(this.scanedCode);
            this.nombre =this.scanedCode.nombre;
            this.apellido=this.scanedCode.apellido;
            this.dni=this.scanedCode.dni;
          }
          catch(err)
          {

          }
         
          this.qrScanner.hide().then(() => {

           this.hideCamera();
          });
      
        
        });
    
         this.qrScanner.show().then(()=>{
    
          this.showCamera();
         });
    
    */
    };
    RegistroClientePage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    RegistroClientePage = __decorate([
        Component({
            selector: 'page-registro-cliente',
            templateUrl: 'registro-cliente.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireAuth,
            Camera,
            BarcodeScanner,
            ToastController,
            AlertController])
    ], RegistroClientePage);
    return RegistroClientePage;
}());
export { RegistroClientePage };
//# sourceMappingURL=registro-cliente.js.map