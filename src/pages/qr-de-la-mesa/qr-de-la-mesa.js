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
import 'rxjs/add/operator/map';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import * as moment from 'moment';
import { EncuestaDeEmpleadoPage } from '../encuesta-de-empleado/encuesta-de-empleado';
import { LoginPage } from '../login/login';
//LINEA 698 Y 701
/**
 * Generated class for the QrDeLaMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QrDeLaMesaPage = /** @class */ (function () {
    function QrDeLaMesaPage(navCtrl, navParams, toastCtrl, authInstance, barcode) {
        /* this.qrScanner.prepare()
     .then((status: QRScannerStatus) => {

       if (status.authorized) {

         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

         
           alert(text);
          
         });

         this.qrScanner.show().then(() => {

           (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
           (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
           (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
         
         });

       } else if (status.denied) {
         

       } else {
        
       }
     })
     .catch((e: any) => this.presentToast(e));

*/
        //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.authInstance = authInstance;
        this.barcode = barcode;
        this.user_data = [];
        this.firebase = firebase;
        this.firebaseDos = firebase;
        this.db = firebase.firestore();
        this.cerrarqr = false;
        this.probandingg = true;
        this.estaLibre = false;
        this.ocultarQR = false;
        this.estaOcupada = false;
        this.pedidos = false;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.moment = moment;
        //this.vistaCliente=true;
        //this.usuario.tipo="cliente";
        //this.vistaMozo=true;
        // this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.sinPersonasEnEspera = false;
        this.sinPersonasAtendidas = false;
        this.sinPedidosParaEntregar = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (this.usuario.tipo == "mozo") {
            this.vistaMozo = true;
        }
        if (this.usuario.tipo == "cliente" || this.usuario.tipo == "anonimo") {
            this.vistaCliente = true;
        }
        setInterval(function () {
            if (_this.ocultarQR) {
                _this.OcultarLectorQR();
                _this.ocultarQR = false;
            }
        }, 500);
        /*  let pedidosRef = this.firebase.database().ref("usuarios");
      
          pedidosRef.once("value", (snap) => {
      
            //let data = snap.val();
           // let esValido = true;
           let result = snap.val();
          for(let k in result){ //"k" provides key Id of each object
            this.user_data.push({
             id : k,
             apellido : result[k].apellido,
             clave : result[k].clave,
             correo : result[k].correo,
             cuil : result[k].cuil,
             dni : result[k].dni,
             nombre : result[k].nombre,
             tipo : result[k].tipo
           });
          }
      
      
      
            
          });*/
        this.estaLibre = false;
        this.usuarios = [];
        this.espera = [];
        this.atendidos = [];
        this.pedidosPruebaUno = [];
        this.pedidosPruebaDos = [];
        this.pedidosPruebaTres = [];
        this.pedidosPruebaCuatro = [];
        this.pedidosPruebaCinco = [];
        this.pedidosPruebaSeis = [];
        this.pedidosPruebaSiete = [];
        this.pedidosPruebaOcho = [];
        this.pedidosPruebaNueve = [];
        this.pedidosPruebaDiez = [];
        //let genteRef = this.firebase.database().ref("usuarios/clientes");
        /* let genteRef = this.firebase.database().ref("usuarios");
     
         genteRef.once("value", (snap) => {
     
           let data = snap.val();
     
           for (let item in data) {
     
             this.usuarios.push(data[item]);
           }
     
           console.log(this.usuarios);
         }).then(() => {
           this.espera = this.usuarios.filter(item => {
     
             
             return item.estado=="espera";
           });
     
           this.atendidos = this.usuarios.filter(item => {
     
            
            return item.estado=="atendido";
           });
     
     
           
     
         });*/
        var genteRef = this.firebase.database().ref("usuarios");
        genteRef.on("value", function (snap) {
            _this.usuarios = [];
            _this.sinPersonasEnEspera = false;
            _this.sinPersonasAtendidas = false;
            console.log("asd");
            var data = snap.val();
            for (var item in data) {
                _this.usuarios.push(data[item]);
            }
            _this.espera = _this.usuarios.filter(function (item) {
                if (item.estado == "espera") {
                    _this.sinPersonasEnEspera = true;
                }
                //console.log("aca estoy");
                return item.estado == "espera";
            });
            _this.atendidos = _this.usuarios.filter(function (item) {
                if (item.estado == "atendido") {
                    _this.sinPersonasAtendidas = true;
                }
                return item.estado == "atendido";
            });
            console.log(_this.usuarios);
        });
        var pedidosProbandoUno = this.firebase.database().ref("pedidos/1");
        pedidosProbandoUno.on("value", function (snap) {
            _this.pedidosPruebaUno = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaUno.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaUno.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaUno.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaUno.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoDos = this.firebase.database().ref("pedidos/2");
        pedidosProbandoDos.on("value", function (snap) {
            _this.pedidosPruebaDos = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaDos.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaDos.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDos.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDos.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoTres = this.firebase.database().ref("pedidos/3");
        pedidosProbandoTres.on("value", function (snap) {
            _this.pedidosPruebaTres = [];
            //this.pedidosPruebaTres=new Array(0);
            _this.sinPedidosParaEntregar = false;
            var vale = 0;
            var terminado = true;
            var cocinero = false;
            var bartender = false;
            var terminadisimo = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    /*vale++;
                    if(vale==2)
                    {
                      this.pedidosPruebaTres.push(result[k]);
                    }*/
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaTres.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaTres.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaTres.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaTres.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoCuatro = this.firebase.database().ref("pedidos/4");
        pedidosProbandoCuatro.on("value", function (snap) {
            _this.pedidosPruebaCuatro = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var cocinero = false;
            var bartender = false;
            var terminadisimo = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaCuatro.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaCuatro.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCuatro.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCuatro.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoCinco = this.firebase.database().ref("pedidos/5");
        pedidosProbandoCinco.on("value", function (snap) {
            _this.pedidosPruebaCinco = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaCinco.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaCinco.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCinco.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCinco.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoSeis = this.firebase.database().ref("pedidos/6");
        pedidosProbandoSeis.on("value", function (snap) {
            _this.pedidosPruebaSeis = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaSeis.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaSeis.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSeis.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSeis.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoSiete = this.firebase.database().ref("pedidos/7");
        pedidosProbandoSiete.on("value", function (snap) {
            _this.pedidosPruebaSiete = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaSiete.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaSiete.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSiete.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSiete.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoOcho = this.firebase.database().ref("pedidos/8");
        pedidosProbandoOcho.on("value", function (snap) {
            _this.pedidosPruebaOcho = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaOcho.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaOcho.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaOcho.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaOcho.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoNueve = this.firebase.database().ref("pedidos/9");
        pedidosProbandoNueve.on("value", function (snap) {
            _this.pedidosPruebaNueve = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaNueve.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaNueve.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaNueve.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaNueve.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoDiez = this.firebase.database().ref("pedidos/10");
        pedidosProbandoDiez.on("value", function (snap) {
            _this.pedidosPruebaDiez = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaDiez.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaDiez.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDiez.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDiez.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
    }
    QrDeLaMesaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    QrDeLaMesaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QrDeLaMesaPage');
    };
    QrDeLaMesaPage.prototype.MostrarQr = function (correo) {
        /* this.cerrarqr=true;
         this.probandingg=false;

         this.qrScanner.prepare()
         .then((status: QRScannerStatus) => {
           .then((status) => {

           if (status.authorized) {

             this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

            
                 alert(text);
                 this.Modificar(correo,text);
                 this.ocultarQR = true;

          
             });

             this.qrScanner.show().then(() => {

               (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
               (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
               (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
               //this.estado = "ocultar";
             });

           } else if (status.denied) {
          

           } else {
             
           }
         })
         .catch((e: any) => this.presentToast(e));
*/
    };
    QrDeLaMesaPage.prototype.OcultarLectorQR = function () {
        /*
            this.qrScanner.hide().then(() => {
        
              (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
              (window.document.querySelector('.close') as HTMLElement).classList.remove('mostrar');
              
              this.probandingg=true;
              this.cerrarqr=false;
            });
        
            this.scanSub.unsubscribe();*/
    };
    QrDeLaMesaPage.prototype.Modificar = function (correo, text, cantidad, mesa) {
        var _this = this;
        var ocup = true;
        this.estaLibre = true;
        var momentoActual = moment(new Date());
        var reservasRef = firebase.database().ref("reservas");
        reservasRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].mesa == text) {
                    var diferencia = Math.abs(momentoActual.diff(moment(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));
                    if (diferencia < 40) {
                        if (data[item].correo == correo) {
                            firebase.database().ref("usuarios").once("value", function (snapUsuario) {
                                var dataUsuario = snapUsuario.val();
                                for (var itemUsuario in dataUsuario) {
                                    if (dataUsuario[itemUsuario].correo == correo) {
                                        firebase.database().ref("usuarios").child(itemUsuario).update({ estado: "atendido" }).then(function () {
                                            firebase.database().ref("mesas").once("value", function (snapMesa) {
                                                var dataMesa = snapMesa.val();
                                                var _loop_1 = function (itemMesa) {
                                                    if (dataMesa[itemMesa].numeroMesa == mesa) {
                                                        firebase.database().ref("mesas").child(itemMesa).update({ estado: "ocupada" }).then(function () {
                                                            firebase.database().ref("mesas").child(itemMesa).update({ cliente: correo }).then(function () {
                                                                _this.MostrarAlert("", "Se ha asignado la mesa.", "Aceptar", _this.limpiar);
                                                            });
                                                        });
                                                    }
                                                };
                                                for (var itemMesa in dataMesa) {
                                                    _loop_1(itemMesa);
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            //this.presentToast("Esa mesa esta reservada.");
                            _this.MostrarAlert("Error", "Esta mesa está reservada.", "Aceptar", _this.limpiar);
                            //reservadita=true;
                            //otro=2;
                            return;
                        }
                    }
                }
            }
            var refDos = _this.firebase.database().ref("mesas");
            refDos.once('value', function (snap) {
                var data = snap.val();
                var _loop_2 = function () {
                    if (mesa == "1" || mesa == "2" || mesa == "3" || mesa == "4" || mesa == "5" || mesa == "6" || mesa == "7" || mesa == "8" || mesa == "9" || mesa == "10") 
                    //if(mesa=="1")
                    {
                        if (text != mesa) {
                            _this.MostrarAlert("¡Error!", "Este cliente tiene otra mesa reservada.", "Aceptar", _this.limpiar);
                            return "break";
                        }
                    }
                    //agregue esto para ver si valida el que escanea un qr de mesa
                    if (text == "1" || text == "2" || text == "3" || text == "4" || text == "5" || text == "6" || text == "7" || text == "8" || text == "9" || text == "10") {
                    }
                    else {
                        _this.MostrarAlert("¡Error!", "Por favor escanee una mesa valida.", "Aceptar", _this.limpiar);
                        return "break";
                    }
                    if (text == data[key].numeroMesa) {
                        //if(data[key].cliente!=null)
                        //CAMBIE ESTA LINEA
                        if (data[key].estado != "libre") {
                            _this.estaLibre = false;
                            //ocup=false;
                            // alert("La mesa ya esta ocupada");
                            _this.MostrarAlert("Error!", "La mesa ya está ocupada.", "Aceptar", _this.limpiar);
                            return "break";
                            //return;
                        }
                        if (data[key].cantidadComensales < cantidad) {
                            _this.MostrarAlert("Error!", "Esta mesa no soporta esa cantidad de comensales.", "Aceptar", _this.limpiar);
                            return "break";
                        }
                        data[key].cliente = correo;
                        data[key].estado = "ocupada";
                        refDos.child(key).update(data[key]);
                        //alert("bienvenido,se relaciono la mesa tres")
                        if (text == mesa) {
                            var reservasRef_1 = firebase.database().ref("reservas");
                            var djActual_1 = moment(new Date());
                            reservasRef_1.once("value", function (snap) {
                                var data = snap.val();
                                for (var item in data) {
                                    if (data[item].correo == correo) {
                                        //AGREGANDO LOGIC APRA LA FUNCION
                                        var djReserva = moment(data[item].horario, "DD/MM/YYYY HH:mm");
                                        if (djReserva.diff(djActual_1, "m") > -40 && djReserva.diff(djActual_1, "m") < 20) {
                                            //AGREGANDO LOGIC APRA LA FUNCION
                                            data[item].terminada = "si";
                                            reservasRef_1.child(item).update(data[item]);
                                            reservasRef_1.child(item).remove();
                                            break;
                                        }
                                    }
                                }
                            });
                        }
                        //var ref = this.firebase.database().ref("usuarios/clientes");
                        ref = _this.firebase.database().ref("usuarios");
                        ref.once('value', function (snap) {
                            var data = snap.val();
                            for (var key in data) {
                                if (correo == data[key].correo) {
                                    data[key].mesa = text;
                                    data[key].estado = "atendido";
                                    ref.child(key).update(data[key]);
                                    //alert("Listo,se relaciono al cliente con la mesa " + text);
                                    _this.MostrarAlert("Éxito!", "Se relacionó al cliente con la mesa." + text, "Aceptar", _this.limpiar);
                                    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                    //COMENTE ESTO
                                    return;
                                }
                                ;
                            }
                        });
                    }
                    ;
                };
                var ref;
                //this.estaLibre=true;
                // ocup=true;
                for (var key in data) {
                    var state_1 = _loop_2();
                    if (state_1 === "break")
                        break;
                }
            });
        });
        /*var refDos = this.firebase.database().ref("mesas");
                      
                      refDos.once('value', (snap) => {
                          var data = snap.val();
                          //this.estaLibre=true;
                        // ocup=true;
                          for(var key in data)
                          {

                            if(mesa=="1"||mesa=="2"||mesa=="3"||mesa=="4"||mesa=="5"||mesa=="6"||mesa=="7"||mesa=="8"||mesa=="9"||mesa=="10")
                            //if(mesa=="1")
                                {
                                  
                                    if(text!=mesa)
                                    {
                                      this.MostrarAlert("Error!!","Este cliente tiene una reserva para otra mesa","aceptar",this.limpiar);
                                      break;
                                    }

                                }



                              if (text == data[key].numeroMesa)
                              {

                             

                                //if(data[key].cliente!=null)
                                //CAMBIE ESTA LINEA
                                if(data[key].estado!="libre")
                                {

                                  this.estaLibre=false;
                                  //ocup=false;
                                 // alert("La mesa ya esta ocupada");
                                 this.MostrarAlert("Error!", "La mesa ya esta ocupada", "Aceptar", this.limpiar);
                                  break;
                                  //return;
                                  
                                }

                                if(data[key].cantidadComensales<cantidad)
                                {
                                  this.MostrarAlert("Error!", "Esta mesa no soporta esa cantidad de comensales", "Aceptar", this.limpiar);
                                  break;

                                }





                                  data[key].cliente = correo;
                                  data[key].estado = "ocupada";
                                  refDos.child(key).update(data[key]);
                                  //alert("bienvenido,se relaciono la mesa tres")



                                  //var ref = this.firebase.database().ref("usuarios/clientes");
                                  var ref = this.firebase.database().ref("usuarios");
           
                                  ref.once('value', (snap) => {
                                      var data = snap.val();
                                      for(var key in data){
                                          if (correo == data[key].correo) {
                                              data[key].mesa = text;
                                              data[key].estado = "atendido";
                                             
                                              ref.child(key).update(data[key]);
                                              //alert("Listo,se relaciono al cliente con la mesa " + text);
                                              this.MostrarAlert("Exito!", "Listo,se relaciono al cliente con la mesa " + text, "Aceptar", this.limpiar);
                                              this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                              
                                              
                                              
                   
                                          };
                                      }
                                  });





                                 
                              };
                          }
                      }); */
        //if(this.estaLibre)
        //if(ocup==true)
        /*   if(this.estaLibre)
           {

             var ref = this.firebase.database().ref("usuarios/clientes");

             ref.once('value', (snap) => {
                 var data = snap.val();
                 for(var key in data){
                     if (correo == data[key].correo) {
                         data[key].mesa = 3;
                        
                         ref.child(key).update(data[key]);
                         alert("bienvenido,se relaciono al cliente con la mesa " + 3);
                         this.navCtrl.setRoot(this.navCtrl.getActive().component);
                         
                         
                         

                     };
                 }
             });


           }*/
        //this.cargarPersonas();
    };
    QrDeLaMesaPage.prototype.MostrarPedidos = function (mesa) {
        this.pedidos = true;
        var reftres = this.firebase.database().ref("probandopedidos");
        reftres.once('value', function (snap) {
            var data = snap.val();
            for (var key in data) {
                // if ("1" == data[key]) 
                // alert(key);
                if (key == mesa) {
                    alert("El tiempo de espera es " + data[key].tiempo + " minutos");
                    break;
                }
                else {
                    alert("No hicieron ningún pedido todavía.");
                    break;
                }
                // if(parseInt(data[key])==3)
                // {
                //data[key].mesa = 3;
                //ref.child(key).update(data[key]);
                // }                
            }
        });
    };
    QrDeLaMesaPage.prototype.cargarPersonas = function () {
        /*  this.usuarios = [];
          this.espera = [];
          this.atendidos = [];
      
      
          let genteRef = this.firebase.database().ref("usuarios/clientes");
      
          genteRef.once("value", (snap) => {
      
            let data = snap.val();
      
            for (let item in data) {
      
              this.usuarios.push(data[item]);
            }
      
            console.log(this.usuarios);
          }).then(() => {
            this.espera = this.usuarios.filter(item => {
      
              return item.mesa == null;
            });
      
            this.atendidos = this.usuarios.filter(item => {
      
              return item.mesa != null;
            });
      
      
            
      
          });*/
        //this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    QrDeLaMesaPage.prototype.MostrarTiempoEsperaCliente = function () {
        /*
                this.cerrarqr=true;
                  this.probandingg=false;
        
                  this.qrScanner.prepare()
                  //.then((status: QRScannerStatus) => {
                    .then((status) => {
        
                    if (status.authorized) {
        
                      this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
        
                        
                    
                        
        
                          var refDos = this.firebase.database().ref("mesas");
                                
                                refDos.once('value', (snap) => {
                                    var data = snap.val();
                                   
                                    for(var key in data)
                                    {
                                        if (text == data[key].numeroMesa)
                                        {
                                            alert(data[key].tiempoMinimo);
                                            break;
                                                                                                
                                        }
                                      }
                                    });
        
        
        
                         
        
        
        
                          this.ocultarQR = true;
        
                       
                      });
        
                      this.qrScanner.show().then(() => {
        
                        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                        (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                        (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
                       
                      });
        
                    } else if (status.denied) {
                   
        
                    } else {
                      
                    }
                  })
                  .catch((e: any) => this.presentToast(e));
        
        
                  */
    };
    QrDeLaMesaPage.prototype.probandoBarcode = function (correo) {
        /*  this.options = { prompt : "Escaneá tu DNI", formats: "PDF_417" }
      
          this.barcode.scan(this.options).then((barcodeData) => {
              this.miScan = (barcodeData.text);
              alert(this.miScan);
          }, (error) => {
             
          });*/
        /* this.barcode.scan().then(barcodeData => {
           this.Modificar(correo,barcodeData.text);
             alert(barcodeData.text);
         });*/
    };
    QrDeLaMesaPage.prototype.ocuparMesaBarcode = function (correo, cantidad, mesa) {
        var _this = this;
        this.barcode.scan().then(function (barcodeData) {
            _this.Modificar(correo, barcodeData.text, cantidad, mesa);
            //alert(barcodeData.text);
        });
    };
    QrDeLaMesaPage.prototype.mostrarTiempoBarcode = function () {
        var _this = this;
        var banderita = 0;
        var comiendo = false;
        var usuario = JSON.parse(localStorage.getItem("usuario"));
        this.barcode.scan().then(function (barcodeData) {
            var refComiendo = _this.firebase.database().ref("usuarios");
            refComiendo.once('value', function (snap) {
                var dataDos = snap.val();
                for (var keyDos in dataDos) {
                    //agregue esto para ver si funciona tambien
                    if (barcodeData.text == "1" || barcodeData.text == "2" || barcodeData.text == "3" || barcodeData.text == "4" || barcodeData.text == "5" || barcodeData.text == "6" || barcodeData.text == "7" || barcodeData.text == "8" || barcodeData.text == "9" || barcodeData.text == "10") {
                    }
                    else {
                        _this.MostrarAlert("¡Error!", "Por favor escanee una mesa valida.", "Aceptar", _this.limpiar);
                        break;
                    }
                    if (dataDos[keyDos].estado == "comiendo" && dataDos[keyDos].correo == usuario.correo && dataDos[keyDos].mesa == barcodeData.text) 
                    //if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo=="cliente@gmail.com" && dataDos[keyDos].mesa==barcodeData.text)
                    {
                        _this.MostrarAlert("Terminado y entregado", "Su pedido ya debería estar en la mesa. Si no es así, comuniquese con su mozo.", "Aceptar", _this.limpiar);
                        banderita = 1;
                        comiendo = true;
                        break;
                    }
                    if (dataDos[keyDos].estado == "comiendo" && dataDos[keyDos].correo == usuario.correo && dataDos[keyDos].mesa != barcodeData.text) 
                    //if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo=="cliente@gmail.com" && dataDos[keyDos].mesa!=barcodeData.text)
                    {
                        _this.MostrarAlert("Error!!", "Por favor escanee su mesa", "Aceptar", _this.limpiar);
                        banderita = 1;
                        comiendo = true;
                        break;
                    }
                }
            });
            //alert(barcodeData.text);
            var refDos = _this.firebase.database().ref("mesas");
            refDos.once('value', function (snap) {
                var data = snap.val();
                for (var key in data) {
                    //if (barcodeData.text == data[key].numeroMesa)
                    if (barcodeData.text == data[key].numeroMesa) {
                        if (data[key].cliente == usuario.correo) {
                            if (data[key].tiempoMinimo != null) {
                                //alert("El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos");
                                if (comiendo == false) {
                                    _this.MostrarAlert("¡Cocinándose!", "El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos", "Aceptar", _this.limpiar);
                                    banderita = 1;
                                }
                                //this.MostrarAlert("¡Cocinandose!", "El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos", "Aceptar", this.limpiar);
                                //banderita=1;
                                break;
                            }
                            else {
                                //alert("Su pedido fue tomado,falta que el cocinero ponga un tiempo minimo");
                                _this.MostrarAlert("¡A esperar!", "Su pedido fue tomado, falta que el cocinero ponga un tiempo mínimo.", "Aceptar", _this.limpiar);
                                banderita = 1;
                                break;
                            }
                        }
                        else {
                            //alert("Esa no es su mesa");
                            _this.MostrarAlert("¡Error!", "Esta no es su mesa.", "Aceptar", _this.limpiar);
                            banderita = 1;
                            break;
                        }
                    }
                }
            }).then(function () {
                if (banderita == 0) {
                    //alert("Por favor escanee una mesa valida");
                    _this.MostrarAlert("¡Error!", "Por favor escanee una mesa válida.", "Aceptar", _this.limpiar);
                }
            });
        });
    };
    QrDeLaMesaPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    QrDeLaMesaPage.prototype.limpiar = function () {
        this.ocultarAlert = true;
    };
    QrDeLaMesaPage.prototype.Logout = function () {
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
    QrDeLaMesaPage.prototype.terminarPedidoUno = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/1/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaUno = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoDos = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/2/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaDos = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoTres = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/3/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaTres = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoCuatro = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/4/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaCuatro = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoCinco = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/5/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaCinco = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoSeis = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/6/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaSeis = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoSiete = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/7/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaSiete = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoOcho = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/8/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaOcho = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoNueve = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/9/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaNueve = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoDiez = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/10/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaDiez = [];
        });
    };
    QrDeLaMesaPage.prototype.volver = function () {
        this.navCtrl.pop();
    };
    QrDeLaMesaPage.prototype.prueba = function (text) {
        var _this = this;
        var momentoActual = moment(new Date());
        var reservasRef = firebase.database().ref("reservas");
        reservasRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].mesa == text) {
                    var diferencia = Math.abs(momentoActual.diff(moment(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));
                    if (diferencia < 40) {
                        //this.presentToast("Esa mesa esta reservada.");
                        _this.MostrarAlert("¡Error!", "Esta mesa está reservada.", "Aceptar", _this.limpiar);
                        return true;
                    }
                }
            }
            return false;
        });
    };
    QrDeLaMesaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-qr-de-la-mesa',
            templateUrl: 'qr-de-la-mesa.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController, AngularFireAuth, BarcodeScanner])
    ], QrDeLaMesaPage);
    return QrDeLaMesaPage;
}());
export { QrDeLaMesaPage };
//# sourceMappingURL=qr-de-la-mesa.js.map