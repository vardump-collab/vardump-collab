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
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
//LINEA 2460 Y 2463
/**
 * Generated class for the TomarPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TomarPedidoPage = /** @class */ (function () {
    function TomarPedidoPage(navCtrl, navParams, authInstance, toastCtrl) {
        /* let localData = http.get('assets/imgs/gamma/information.json').map(res => res.json().items);
         localData.subscribe(data => {
           this.information = data;
         })*/
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.user_data = [];
        this.firebase = firebase;
        this.db = firebase.firestore();
        this.sinPedidos = true;
        this.ponerTiempoMesaCocinaUnoIcono = true;
        this.terminarPedidoMesaCocinaUnoIcono = false;
        this.ponerTiempoMesaCocinaDosIcono = true;
        this.terminarPedidoMesaCocinaDosIcono = false;
        this.ponerTiempoMesaCocinaTresIcono = true;
        this.terminarPedidoMesaCocinaTresIcono = false;
        this.ponerTiempoMesaCocinaCuatroIcono = true;
        this.terminarPedidoMesaCocinaCuatroIcono = false;
        this.ponerTiempoMesaCocinaCincoIcono = true;
        this.terminarPedidoMesaCocinaCincoIcono = false;
        this.ponerTiempoMesaCocinaSeisIcono = true;
        this.terminarPedidoMesaCocinaSeisIcono = false;
        this.ponerTiempoMesaCocinaSieteIcono = true;
        this.terminarPedidoMesaCocinaSieteIcono = false;
        this.ponerTiempoMesaCocinaOchoIcono = true;
        this.terminarPedidoMesaCocinaOchoIcono = false;
        this.ponerTiempoMesaCocinaNueveIcono = true;
        this.terminarPedidoMesaCocinaNueveIcono = false;
        this.ponerTiempoMesaCocinaDiezIcono = true;
        this.terminarPedidoMesaCocinaDiezIcono = false;
        this.vistaCocinaMesaUno = false;
        this.vistaCocinaMesaDos = false;
        this.vistaCocinaMesaTres = false;
        this.vistaCocinaMesaCuatro = false;
        this.vistaCocinaMesaCinco = false;
        this.vistaCocinaMesaSeis = false;
        this.vistaCocinaMesaSiete = false;
        this.vistaCocinaMesaOcho = false;
        this.vistaCocinaMesaNueve = false;
        this.vistaCocinaMesaDiez = false;
        this.vistaBartenderMesaUno = false;
        this.vistaBartenderMesaDos = false;
        this.vistaBartenderMesaTres = false;
        this.vistaBartenderMesaCuatro = false;
        this.vistaBartenderMesaCinco = false;
        this.vistaBartenderMesaSeis = false;
        this.vistaBartenderMesaSiete = false;
        this.vistaBartenderMesaOcho = false;
        this.vistaBartenderMesaNueve = false;
        this.vistaBartenderMesaDiez = false;
        //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        /* let pedidosRef = this.firebase.database().ref("mesas");
     
         pedidosRef.once("value", (snap) => {
     
           //let data = snap.val();
          // let esValido = true;
          let result = snap.val();
         for(let k in result){ //"k" provides key Id of each object
           this.user_data.push({
            id : k,
            carga : result[k].cantidadComensales,
            numeroMesa : result[k].numeroMesa,
            name : "adasdasd"
          });
         }
     
     
     
           
         });*/
        //this.ocultar=true;
        //CAMBIAR ESTO PARA PROBAR
        //this.vistaCocinero=true;
        //this.vistaBartender=true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (this.usuario.tipo == "cocinero") {
            this.vistaCocinero = true;
        }
        if (this.usuario.tipo == "bartender") {
            this.vistaBartender = true;
        }
        this.ocultarUno = true;
        this.ocultarDos = true;
        this.ocultarTres = true;
        this.ocultarCuatro = true;
        this.ocultarCinco = true;
        this.ocultarSeis = true;
        this.ocultarSiete = true;
        this.ocultarOcho = true;
        this.ocultarNueve = true;
        this.ocultarDiez = true;
        this.cocina = [];
        this.bartender = [];
        this.pedidos = [];
        this.pedidosCocinaUno = [];
        this.pedidosBartenderUno = [];
        this.pedidosCocinaDos = [];
        this.pedidosBartenderDos = [];
        this.pedidosCocinaTres = [];
        this.pedidosBartenderTres = [];
        this.pedidosCocinaCuatro = [];
        this.pedidosBartenderCuatro = [];
        this.pedidosCocinaCinco = [];
        this.pedidosBartenderCinco = [];
        this.pedidosCocinaSeis = [];
        this.pedidosBartenderSeis = [];
        this.pedidosCocinaSiete = [];
        this.pedidosBartenderSiete = [];
        this.pedidosCocinaOcho = [];
        this.pedidosBartenderOcho = [];
        this.pedidosCocinaNueve = [];
        this.pedidosBartenderNueve = [];
        this.pedidosCocinaDiez = [];
        this.pedidosBartenderDiez = [];
        this.pedidosDeliveryCocinero = [];
        this.pedidosDeliveryBartender = [];
        this.vistaDeliveryCocinero = false;
        this.vistaDeliveryBartender = false;
        //PROBANDO DELIVERY COCINERO
        var deliveryCocinero = this.firebase.database().ref("pedidos/");
        deliveryCocinero.on("value", function (snap) {
            _this.pedidosDeliveryCocinero = [];
            //this.vistaDeliveryCocinero=false;
            var result = snap.val();
            for (var item in result) {
                if (item == "1" || item == "2" || item == "3" || item == "4" || item == "5" || item == "6" || item == "7" || item == "8" || item == "9" || item == "10") {
                    continue;
                }
                //this.pedidosDeliveryCocinero.push(item);
                //console.log(result[item]);
                for (var a in result[item]) {
                    if (a == "cocinero") {
                        _this.vistaDeliveryCocinero = true;
                        for (var j in result[item][a]) {
                            // console.log(result[item][a][j]);
                            if (result[item][a][j] == "tomado") {
                                console.log("llegue aca");
                                _this.pedidosDeliveryCocinero.push(item);
                                //console.log(result[item]);
                            }
                        }
                        //this.pedidosBartenderUno.push(result[k][a]);
                        //this.pedidosDeliveryCocinero.push(result[item][a]);
                        //console.log(result[item][a]);
                    }
                }
            }
        });
        //PROBANDO DELIVERY BARTENDER
        var deliveryBartender = this.firebase.database().ref("pedidos/");
        deliveryBartender.on("value", function (snap) {
            _this.pedidosDeliveryBartender = [];
            _this.vistaDeliveryBartender = false;
            var result = snap.val();
            for (var item in result) {
                if (item == "1" || item == "2" || item == "3" || item == "4" || item == "5" || item == "6" || item == "7" || item == "8" || item == "9" || item == "10") {
                    continue;
                }
                //this.pedidosDeliveryCocinero.push(item);
                //console.log(result[item]);
                for (var a in result[item]) {
                    if (a == "bartender") {
                        _this.vistaDeliveryBartender = true;
                        for (var j in result[item][a]) {
                            // console.log(result[item][a][j]);
                            if (result[item][a][j] == "tomado") {
                                console.log("llegue aca");
                                _this.pedidosDeliveryBartender.push(item);
                                //console.log(result[item]);
                            }
                        }
                        //this.pedidosBartenderUno.push(result[k][a]);
                        //this.pedidosDeliveryCocinero.push(result[item][a]);
                        //console.log(result[item][a]);
                    }
                }
            }
        });
        //PEDIDOS MESA 1
        var pedidosMesaUno = this.firebase.database().ref("pedidos/1/");
        pedidosMesaUno.on("value", function (snap) {
            _this.vistaCocinaMesaUno = false;
            _this.vistaBartenderMesaUno = false;
            _this.pedidosCocinaUno = [];
            _this.pedidosBartenderUno = [];
            //this.sinPedidos=false;
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") 
                        //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
                        {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        console.log("aca estoy");
                        _this.vistaCocinaMesaUno = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaUno.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaUno = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderUno.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaUno = result[k];
                }
            }
        });
        //PEDIDOS MESA 2
        var pedidosMesaDos = this.firebase.database().ref("pedidos/2/");
        pedidosMesaDos.on("value", function (snap) {
            _this.vistaBartenderMesaDos = false;
            _this.vistaCocinaMesaDos = false;
            _this.pedidosCocinaDos = [];
            _this.pedidosBartenderDos = [];
            // this.sinPedidos=false;
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") 
                        //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
                        {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaDos = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaDos.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaDos = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderDos.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaDos = result[k];
                }
            }
        });
        //PEDIDOS MESA 3
        var pedidosMesaTres = this.firebase.database().ref("pedidos/3/");
        pedidosMesaTres.on("value", function (snap) {
            _this.vistaCocinaMesaTres = false;
            _this.vistaBartenderMesaTres = false;
            _this.pedidosCocinaTres = [];
            _this.pedidosBartenderTres = [];
            // this.sinPedidos=false;
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") 
                        //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
                        {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaTres = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaTres.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaTres = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderTres.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaTres = result[k];
                }
            }
        });
        //PEDIDOS MESA 4
        var pedidosMesaCuatro = this.firebase.database().ref("pedidos/4/");
        pedidosMesaCuatro.on("value", function (snap) {
            _this.vistaCocinaMesaCuatro = false;
            _this.vistaBartenderMesaCuatro = false;
            _this.pedidosCocinaCuatro = [];
            _this.pedidosBartenderCuatro = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaCuatro = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaCuatro.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaCuatro = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderCuatro.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaCuatro = result[k];
                }
            }
        });
        //PEDIDOS MESA 5
        var pedidosMesaCinco = this.firebase.database().ref("pedidos/5/");
        pedidosMesaCinco.on("value", function (snap) {
            _this.vistaCocinaMesaCinco = false;
            _this.vistaBartenderMesaCinco = false;
            _this.pedidosCocinaCinco = [];
            _this.pedidosBartenderCinco = [];
            var result = snap.val();
            for (var k in result) {
                //this.vistaCocinaMesaCinco=true;
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaCinco = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaCinco.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaCinco = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderCinco.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaCinco = result[k];
                }
            }
        });
        //MESA SEIS
        var pedidosMesaSeis = this.firebase.database().ref("pedidos/6/");
        pedidosMesaSeis.on("value", function (snap) {
            _this.vistaCocinaMesaSeis = false;
            _this.vistaBartenderMesaSeis = false;
            _this.pedidosCocinaSeis = [];
            _this.pedidosBartenderSeis = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaSeis = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaSeis.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaSeis = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderSeis.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaSeis = result[k];
                }
            }
        });
        //PEDIDOS MESA 7
        var pedidosMesaSiete = this.firebase.database().ref("pedidos/7/");
        pedidosMesaSiete.on("value", function (snap) {
            _this.vistaCocinaMesaSiete = false;
            _this.vistaBartenderMesaSiete = false;
            _this.pedidosCocinaSiete = [];
            _this.pedidosBartenderSiete = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaSiete = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaSiete.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaSiete = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderSiete.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaSiete = result[k];
                }
            }
        });
        //PEDIDOS MESA 8
        var pedidosMesaOcho = this.firebase.database().ref("pedidos/8/");
        pedidosMesaOcho.on("value", function (snap) {
            _this.vistaCocinaMesaOcho = false;
            _this.vistaBartenderMesaOcho = false;
            _this.pedidosCocinaOcho = [];
            _this.pedidosBartenderOcho = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaOcho = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaOcho.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaOcho = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderOcho.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaOcho = result[k];
                }
            }
        });
        var pedidosMesaNueve = this.firebase.database().ref("pedidos/9/");
        pedidosMesaNueve.on("value", function (snap) {
            _this.vistaCocinaMesaNueve = false;
            _this.vistaBartenderMesaNueve = false;
            _this.pedidosCocinaNueve = [];
            _this.pedidosBartenderNueve = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaNueve = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaNueve.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaNueve = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderNueve.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaNueve = result[k];
                }
            }
        });
        var pedidosMesaDiez = this.firebase.database().ref("pedidos/10/");
        pedidosMesaDiez.on("value", function (snap) {
            _this.vistaCocinaMesaDiez = false;
            _this.vistaBartenderMesaDiez = false;
            _this.pedidosCocinaDiez = [];
            _this.pedidosBartenderDiez = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaDiez = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaDiez.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaDiez = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderDiez.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaDiez = result[k];
                }
            }
        });
        /* pedidosRef.once("value", (snap) => {
     
           //let data = snap.val();
          // let esValido = true;
          let result = snap.val();
     
          for(let k in result){
           this.user_data.push({
            numeroMesa : k,
            pedido : result[k].cocinero,
            name : "adasdasd"
          });
         }*/
        //alert(this.user_data);
    }
    TomarPedidoPage.prototype.toggleSection = function (i) {
        //this.information[i].open = !this.information[i].open;
        this.user_data[i].open = !this.user_data[i].open;
    };
    TomarPedidoPage.prototype.toggleItem = function (i, j) {
        //this.information[i].children[j].open = !this.information[i].children[j].open;
        this.user_data[i].cocinero[j].open = !this.user_data[i].cocinero[j].open;
    };
    TomarPedidoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TomarPedidoPage');
    };
    TomarPedidoPage.prototype.probando = function () {
        var _this = this;
        var pedidosRef = this.firebase.database().ref("mesas");
        pedidosRef.once("value", function (snap) {
            //let data = snap.val();
            // let esValido = true;
            var result = snap.val();
            for (var k in result) { //"k" provides key Id of each object
                _this.user_data.push({
                    id: k,
                    carga: result[k].cantidadComensales,
                    numeroMesa: result[k].numeroMesa,
                    name: "adasdasd"
                });
            }
        });
    };
    TomarPedidoPage.prototype.pregunta1 = function () {
        this.tiempoMinimoUno = this.tiempoMesaUno;
        this.ocultarUno = false;
    };
    TomarPedidoPage.prototype.pregunta2 = function () {
        this.tiempoMinimoDos = this.tiempoMesaDos;
        this.ocultarDos = false;
    };
    TomarPedidoPage.prototype.pregunta3 = function () {
        this.tiempoMinimoTres = this.tiempoMesaTres;
        this.ocultarTres = false;
    };
    TomarPedidoPage.prototype.pregunta4 = function () {
        this.tiempoMinimoCuatro = this.tiempoMesaCuatro;
        this.ocultarCuatro = false;
    };
    TomarPedidoPage.prototype.pregunta5 = function () {
        this.tiempoMinimoCinco = this.tiempoMesaCinco;
        this.ocultarCinco = false;
    };
    TomarPedidoPage.prototype.pregunta6 = function () {
        this.tiempoMinimoSeis = this.tiempoMesaSeis;
        this.ocultarSeis = false;
    };
    TomarPedidoPage.prototype.pregunta7 = function () {
        this.tiempoMinimoSiete = this.tiempoMesaSiete;
        this.ocultarSiete = false;
    };
    TomarPedidoPage.prototype.pregunta8 = function () {
        this.tiempoMinimoOcho = this.tiempoMesaOcho;
        this.ocultarOcho = false;
    };
    TomarPedidoPage.prototype.pregunta9 = function () {
        this.tiempoMinimoNueve = this.tiempoMesaNueve;
        this.ocultarNueve = false;
    };
    TomarPedidoPage.prototype.pregunta10 = function () {
        this.tiempoMinimoDiez = this.tiempoMesaDiez;
        this.ocultarDiez = false;
    };
    TomarPedidoPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    TomarPedidoPage.prototype.Aceptar1 = function () {
        var _this = this;
        if (this.tiempoMesaUno < this.tiempoMinimoUno) {
            this.ocultarUno = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarUno = true;
        var refUno = this.firebase.database().ref("mesas");
        refUno.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (1 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaUno;
                    refUno.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaUnoIcono = false;
                    _this.terminarPedidoMesaCocinaUnoIcono = true;
                }
            }
        });
        //this.tiempoMesaCuatro;
        /*var refUno = this.firebase.database().ref("mesas");
                            
                            refUno.once('value', (snap) =>
                            {
                                var data = snap.val();
                                //this.estaLibre=true;
                              // ocup=true;
                                for(var key in data)
                                {
    
                                  if (1 == data[key].numeroMesa)
                                  {
                                    data[key].tiempoMinimo = this.tiempoMesaUno;
                                    refUno.child(key).update(data[key]);
    
                                    
                                  }
    
                                  
                                }
    
                                
                              });*/
    };
    TomarPedidoPage.prototype.Aceptar2 = function () {
        // while(this.tiempoMesaDos)
        //let z=this.tiempoMesaDos;
        var _this = this;
        if (this.tiempoMesaDos < this.tiempoMinimoDos) {
            this.ocultarDos = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarDos = true;
        var refDos = this.firebase.database().ref("mesas");
        refDos.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (2 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaDos;
                    refDos.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaDosIcono = false;
                    _this.terminarPedidoMesaCocinaDosIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar3 = function () {
        var _this = this;
        if (this.tiempoMesaTres < this.tiempoMinimoTres) {
            this.ocultarTres = true;
            // alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarTres = true;
        var refTres = this.firebase.database().ref("mesas");
        refTres.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (3 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaTres;
                    refTres.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaTresIcono = false;
                    _this.terminarPedidoMesaCocinaTresIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar4 = function () {
        var _this = this;
        if (this.tiempoMesaCuatro < this.tiempoMinimoCuatro) {
            this.ocultarCuatro = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        //this.ocultar=true;
        //this.ocultarDos=true;
        this.ocultarCuatro = true;
        //this.tiempoMesaCuatro;
        var refCuatro = this.firebase.database().ref("mesas");
        refCuatro.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (4 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaCuatro;
                    refCuatro.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaCuatroIcono = false;
                    _this.terminarPedidoMesaCocinaCuatroIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar5 = function () {
        var _this = this;
        if (this.tiempoMesaCinco < this.tiempoMinimoCinco) {
            this.ocultarCinco = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        //this.ocultar=true;
        this.ocultarCinco = true;
        //this.tiempoMesaCuatro;
        var refCinco = this.firebase.database().ref("mesas");
        refCinco.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (5 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaCinco;
                    refCinco.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaCincoIcono = false;
                    _this.terminarPedidoMesaCocinaCincoIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar6 = function () {
        var _this = this;
        if (this.tiempoMesaSeis < this.tiempoMinimoSeis) {
            this.ocultarSeis = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        //this.ocultar=true;
        //this.ocultarTres=true;
        this.ocultarSeis = true;
        //this.tiempoMesaCuatro;
        var refSeis = this.firebase.database().ref("mesas");
        refSeis.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (6 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaSeis;
                    refSeis.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaSeisIcono = false;
                    _this.terminarPedidoMesaCocinaSeisIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar7 = function () {
        var _this = this;
        if (this.tiempoMesaSiete < this.tiempoMinimoSiete) {
            this.ocultarSiete = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarSiete = true;
        var refSiete = this.firebase.database().ref("mesas");
        refSiete.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (7 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaSiete;
                    refSiete.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaSieteIcono = false;
                    _this.terminarPedidoMesaCocinaSieteIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar8 = function () {
        var _this = this;
        if (this.tiempoMesaOcho < this.tiempoMinimoOcho) {
            this.ocultarOcho = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarOcho = true;
        var refOcho = this.firebase.database().ref("mesas");
        refOcho.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (8 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaOcho;
                    refOcho.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaOchoIcono = false;
                    _this.terminarPedidoMesaCocinaOchoIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar9 = function () {
        var _this = this;
        if (this.tiempoMesaNueve < this.tiempoMinimoNueve) {
            this.ocultarNueve = true;
            // alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarNueve = true;
        var refNueve = this.firebase.database().ref("mesas");
        refNueve.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (9 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaNueve;
                    refNueve.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaNueveIcono = false;
                    _this.terminarPedidoMesaCocinaNueveIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar10 = function () {
        var _this = this;
        if (this.tiempoMesaDiez < this.tiempoMinimoDiez) {
            this.ocultarDiez = true;
            // alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarDiez = true;
        var refDiez = this.firebase.database().ref("mesas");
        refDiez.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (10 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaDiez;
                    refDiez.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaDiezIcono = false;
                    _this.terminarPedidoMesaCocinaDiezIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.terminarPedidoUnoCocinero = function () {
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/1/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarUnoCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarUnoCocinero.child(k).child(a).update(data[k][a]);
                        }
                        //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.TerminarPedidoUnoBartender = function () {
        var refTerminarUnoBartender = this.firebase.database().ref("pedidos/1/");
        refTerminarUnoBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarUnoBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarUnoBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoDosCocinero = function () {
        var refTerminarDosCocinero = this.firebase.database().ref("pedidos/2/");
        refTerminarDosCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDosCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDosCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.TerminarPedidoDosBartender = function () {
        var refTerminarDosBartender = this.firebase.database().ref("pedidos/2/");
        refTerminarDosBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDosBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDosBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoTresCocinero = function () {
        var refTerminarTresCocinero = this.firebase.database().ref("pedidos/3/");
        refTerminarTresCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarTresCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarTresCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
            //this.estaLibre=true;
            // ocup=true;
            /*  for(var key in data)
              {

                if (3 == data[key].numeroMesa)
                {
                  data[key].tiempoMinimo = this.tiempoMesaSeis;
                  refTerminarTresCocinero.child(key).update(data[key]);

                  
                }

                
              }*/
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoTresBartender = function () {
        var refTerminarTresBartender = this.firebase.database().ref("pedidos/3/");
        refTerminarTresBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarTresBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarTresBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCuatroCocinero = function () {
        var refTerminarCuatroCocinero = this.firebase.database().ref("pedidos/4/");
        refTerminarCuatroCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCuatroCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCuatroCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //   this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCuatroBartender = function () {
        var refTerminarCuatroBartender = this.firebase.database().ref("pedidos/4/");
        refTerminarCuatroBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCuatroBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCuatroBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCincoCocinero = function () {
        var refTerminarCincoCocinero = this.firebase.database().ref("pedidos/5/");
        refTerminarCincoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCincoCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCincoCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCincoBartender = function () {
        var refTerminarCincoBartender = this.firebase.database().ref("pedidos/5/");
        refTerminarCincoBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCincoBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCincoBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSeisCocinero = function () {
        var refTerminarSeisCocinero = this.firebase.database().ref("pedidos/6/");
        refTerminarSeisCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSeisCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSeisCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSeisBartender = function () {
        var refTerminarSeisBartender = this.firebase.database().ref("pedidos/6/");
        refTerminarSeisBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSeisBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSeisBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSieteCocinero = function () {
        var refTerminarSieteCocinero = this.firebase.database().ref("pedidos/7/");
        refTerminarSieteCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSieteCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSieteCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSieteBartender = function () {
        var refTerminarSieteBartender = this.firebase.database().ref("pedidos/7/");
        refTerminarSieteBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSieteBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSieteBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoOchoCocinero = function () {
        var refTerminarOchoCocinero = this.firebase.database().ref("pedidos/8/");
        refTerminarOchoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarOchoCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarOchoCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoOchoBartender = function () {
        var refTerminarOchoBartender = this.firebase.database().ref("pedidos/8/");
        refTerminarOchoBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarOchoBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarOchoBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoNueveCocinero = function () {
        var refTerminarNueveCocinero = this.firebase.database().ref("pedidos/9/");
        refTerminarNueveCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarNueveCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarNueveCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoNueveBartender = function () {
        var refTerminarNueveBartender = this.firebase.database().ref("pedidos/9/");
        refTerminarNueveBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarNueveBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarNueveBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoDiezCocinero = function () {
        var refTerminarDiezCocinero = this.firebase.database().ref("pedidos/10/");
        refTerminarDiezCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDiezCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDiezCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoDiezBartender = function () {
        var refTerminarDiezBartender = this.firebase.database().ref("pedidos/10/");
        refTerminarDiezBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDiezBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDiezBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.Logout = function () {
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
                            _this.navCtrl.setRoot("");
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot("");
                        }
                    });
                    break;
                }
            }
        });
    };
    TomarPedidoPage.prototype.volver = function () {
        this.navCtrl.pop();
    };
    TomarPedidoPage.prototype.terminarDeliveryCocinero = function (probando) {
        var deliveryCocinero = this.firebase.database().ref("pedidos/");
        deliveryCocinero.once("value", function (snap) {
            var result = snap.val();
            for (var item in result) {
                if (item == probando) {
                    for (var a in result[item]) {
                        if (a == "cocinero") {
                            for (var j in result[item][a]) {
                                if (result[item][a][j] == "tomado") {
                                    console.log("llegue aca");
                                    console.log(result[item][a].estado);
                                    result[item][a].estado = "terminado";
                                    deliveryCocinero.child(item).child(a).update(result[item][a]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        });
    };
    TomarPedidoPage.prototype.terminarDeliveryBartender = function (probando) {
        var deliveryBartender = this.firebase.database().ref("pedidos/");
        deliveryBartender.once("value", function (snap) {
            var result = snap.val();
            for (var item in result) {
                if (item == probando) {
                    for (var a in result[item]) {
                        if (a == "bartender") {
                            for (var j in result[item][a]) {
                                if (result[item][a][j] == "tomado") {
                                    console.log("llegue aca");
                                    console.log(result[item][a].estado);
                                    result[item][a].estado = "terminado";
                                    deliveryBartender.child(item).child(a).update(result[item][a]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        });
    };
    TomarPedidoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-tomar-pedido',
            templateUrl: 'tomar-pedido.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AngularFireAuth, ToastController])
    ], TomarPedidoPage);
    return TomarPedidoPage;
}());
export { TomarPedidoPage };
//# sourceMappingURL=tomar-pedido.js.map