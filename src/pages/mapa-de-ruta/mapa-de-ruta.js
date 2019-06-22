var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content } from 'ionic-angular';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { EncuestaDeEmpleadoPage } from '../encuesta-de-empleado/encuesta-de-empleado';
import { LoginPage } from '../login/login';
//import { Content } from 'ionic-angular';
/**
 * Generated class for the MapaDeRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapaDeRutaPage = /** @class */ (function () {
    function MapaDeRutaPage(navCtrl, navParams, alert, authInstance) {
        //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alert = alert;
        this.authInstance = authInstance;
        this.nombre = "lucas";
        this.firebase = firebase;
        this.ListadoDeChats = ["asd", "probando", "gg"];
        this.sinPedidos = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (this.usuario.tipo == "repartidor") {
            this.clientes = true;
        }
        if (this.usuario.tipo == "cliente") {
            this.chat = true;
            this.mandar = true;
            this.ref = firebase.database().ref('mensajes/' + this.usuario.apellido);
            this.ref.on('value', function (data) {
                var tmp = [];
                data.forEach(function (data) {
                    tmp.push({
                        key: data.key,
                        name: data.val().name,
                        tiempo: data.val().tiempo,
                        //ame: ,
                        message: data.val().message
                    });
                });
                _this.messagesList = tmp;
            });
        }
        //this.clientes=true;
        //this.chat=false;
        //this.probanding="yo";
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.probanding = this.usuario.apellido;
        /*	let genteRef = firebase.database().ref("usuarios");
       
           genteRef.on("value", (snap) => {
       
             this.usuarios=[];
       
             let data = snap.val();
       
             for (let item in data) {
       
               this.usuarios.push(data[item]);
             }
       
             this.clientesConPedidos = this.usuarios.filter(item => {
       
               
               return item.estado=="delivery";
             });
       
            
       
             console.log(this.usuarios);
       
       
           });*/
        var genteRef = firebase.database().ref("usuarios");
        genteRef.on("value", function (snap) {
            _this.clientesConPedidos = [];
            //this.sinPedidos=true;
            var data = snap.val();
            var _loop_1 = function (item) {
                //console.log(item);
                if (data[item].estado == "delivery") {
                    console.log("aca toy");
                    //console.log(data[item]);
                    //this.clientesConPedidos.push(data[item]);
                    var probandoRef = firebase.database().ref("pedidos");
                    probandoRef.once("value", function (snap) {
                        _this.sinPedidos = true;
                        //this.clientesConPedidos=[];
                        var dataDos = snap.val();
                        for (var a in dataDos) {
                            //console.log(a);
                            var pruebita = data[item].correo;
                            var patron = '@';
                            var nuevo = '';
                            var cadena = pruebita.replace(patron, nuevo);
                            patron = '.';
                            nuevo = '';
                            cadena = cadena.replace(patron, nuevo);
                            pruebita = cadena;
                            //console.log(pruebita);
                            if (a == pruebita) {
                                var vale = 0;
                                var cocinero = false;
                                var bartender = false;
                                for (var dios in dataDos[a]) {
                                    //console.log(dios);
                                    if (dios == "cocinero") {
                                        cocinero = true;
                                        //console.log("asd");
                                    }
                                    if (dios == "bartender") {
                                        bartender = true;
                                        //console.log("Asd");
                                    }
                                }
                                for (var dios in dataDos[a]) {
                                    //console.log(dataDos[a]);
                                    if (dios != "tiempo") {
                                        /*	if(dataDos[a][dios].estado=="terminado")
                                            {
            
                                                    if(bartender==true && cocinero==true)
                                                    {
                                                    
                                                        this.clientesConPedidos.push(data[item]);
                                                        console.log("los dos")
                                                        break;
                                                    
                                                    }
    
                                                    //this.clientesConPedidos.push(data[item]);
            
                                            }*/
                                        if (dataDos[a][dios].estado == "terminado") {
                                            vale++;
                                            if (bartender == true && cocinero == true) {
                                                if (vale == 2) {
                                                    _this.clientesConPedidos.push(data[item]);
                                                    console.log("los 2");
                                                    _this.sinPedidos = false;
                                                    break;
                                                }
                                            }
                                            if (bartender == true && cocinero == false) {
                                                if (vale == 1) {
                                                    _this.clientesConPedidos.push(data[item]);
                                                    console.log("barteneder");
                                                    _this.sinPedidos = false;
                                                    break;
                                                }
                                            }
                                            if (cocinero == true && bartender == false) {
                                                if (vale == 1) {
                                                    _this.clientesConPedidos.push(data[item]);
                                                    console.log("cocinero");
                                                    _this.sinPedidos = false;
                                                    break;
                                                }
                                            }
                                        }
                                        //console.log(dataDos[a][dios].estado);
                                    }
                                    //console.log(dataDos[a][dios].estado);
                                    /*	if(dataDos[a][dios].estado=="terminado")
                                        {
        
                                                if(bartender==true && cocinero==true)
                                                {
                                                
                                                    this.clientesConPedidos.push(data[item]);
                                                    console.log("los dos")
                                                    break;
                                                
                                                }
        
                                        }*/
                                }
                                /*for(let dios in dataDos[a])
                                {
                                    if (data[a][dios].estado=="terminado")
                                    {
                                    vale++;
    
                                    if(bartender==true && cocinero==true)
                                    {
                                        if(vale==2)
                                        {
                                            this.clientesConPedidos.push(data[item]);
                                            console.log("los 2")
                                            break;
                                        }
    
                                    }
    
                                    if(bartender==true && cocinero==false)
                                    {
                                        if(vale==1)
                                        {
                                            this.clientesConPedidos.push(data[item]);
                                        console.log("barteneder")
                                        break;
                                        }
    
                                    }
                                    if(cocinero==true && bartender == false)
                                    {
                                        if(vale==1)
                                        {
                                            this.clientesConPedidos.push(data[item]);
                                        console.log("cocinero")
                                        break;
                                        }
    
                                    }
                                    
    
                                    }
    
                                //console.log("llegue papu");
                            }*/
                            }
                        }
                    });
                }
            };
            for (var item in data) {
                _loop_1(item);
            }
        });
        /*this.ref=firebase.database().ref('mensajes/' + this.nombreCliente);
        
        this.ref.on('value',data => {
            let tmp = [];
            data.forEach( data => {
                tmp.push({
                    key: data.key,
                    name: data.val().name,
                    message: data.val().message
                })
            });
            this.messagesList = tmp;
    
            
        });*/
        //setTimeout(() => {
        //	this.content.scrollToBottom(300);
        //}, 1000);
    }
    MapaDeRutaPage.prototype.ionViewDidLoad = function () {
        //alert(this.usuario.tipo);
        //this.content.scrollToBottom(300);
        //console.log('ionViewDidLoad MapaDeRutaPage');
        // Presenting popup
        /*  	this.alert.create({
                title:'Username',
                inputs:[{
                    name:'username',
                    placeholder: 'username'
                }],
                buttons:[{
                    text: 'Continue',
                    handler: username =>{
                  this.name = username
                 
                    }
                }]
            }).present();
            
             this.ref = firebase.database().ref('mensajes/' + this.nombre);
        
            
            this.ref.on('value',data => {
                let tmp = [];
                data.forEach( data => {
                    tmp.push({
                        key: data.key,
                        name: data.val().name,
                        message: data.val().message
                    })
                });
                this.messagesList = tmp;
            });
        
        
        
                */
    };
    MapaDeRutaPage.prototype.send = function () {
        this.ref;
        /*this.ref.on('value',data => {
            let tmp = [];
            data.forEach( data => {
                tmp.push({
                    key: data.key,
                    name: data.val().name,
                    message: data.val().message
                })
            });
            this.messagesList = tmp;
          });*/
        if (this.usuario.tipo == "cliente") {
            this.ref = firebase.database().ref('mensajes/' + this.usuario.apellido);
        }
        //this.ref=firebase.database().ref('mensajes/' + this.usuario.apellido);
        // add new data to firebase
        this.ref.push({
            //name: this.name.username,
            //name: "yo",
            name: this.usuario.apellido,
            message: this.newmessage,
            tiempo: Date(),
        });
        this.newmessage = "";
    };
    MapaDeRutaPage.prototype.chatear = function (item) {
        var _this = this;
        this.clientes = false;
        this.chat = true;
        this.mandar = true;
        this.probando = item.img;
        this.nombreCliente = item.nombre;
        this.direccionCliente = item.correo;
        var apellido = item.apellido;
        //this.ref=firebase.database().ref('mensajes/' + this.nombreCliente);
        this.ref = firebase.database().ref('mensajes/' + apellido);
        console.log(apellido);
        this.ref.on('value', function (data) {
            var tmp = [];
            data.forEach(function (data) {
                tmp.push({
                    key: data.key,
                    name: data.val().name,
                    tiempo: data.val().tiempo,
                    //ame: ,
                    message: data.val().message
                });
            });
            _this.messagesList = tmp;
            setTimeout(function () {
                try {
                    _this.content.scrollToBottom(0);
                }
                catch (error) {
                    console.log("Entre al catch del scrollbottom()");
                }
            }, 100);
        });
    };
    MapaDeRutaPage.prototype.volver = function () {
        this.navCtrl.pop();
    };
    MapaDeRutaPage.prototype.entregar = function (item) {
        var pruebita = item.correo;
        var patron = '@';
        var nuevo = '';
        var cadena = pruebita.replace(patron, nuevo);
        patron = '.';
        nuevo = '';
        cadena = cadena.replace(patron, nuevo);
        pruebita = cadena;
        console.log(item);
        var probandoRef = firebase.database().ref("usuarios");
        probandoRef.once("value", function (snap) {
            var data = snap.val();
            for (var a in data) {
                if (data[a].correo == item.correo) {
                    //console.log("llegb ro");
                    data[a].estado = "deliveryTerminado";
                    probandoRef.child(a).update(data[a]);
                    var pedidoRef = firebase.database().ref("pedidos").child(pruebita);
                    pedidoRef.remove();
                    var mensajesRef = firebase.database().ref("mensajes").child(item.apellido);
                    mensajesRef.remove();
                }
            }
        });
        //let clienteRef = firebase.database().ref("usuarios").child(item.key);
        //clienteRef.child(item).update({ pago: "si" });
        //let pedidoRef = firebase.database().ref("pedidos").child(pruebita);
        //pedidoRef.remove();
    };
    MapaDeRutaPage.prototype.Logout = function () {
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
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], MapaDeRutaPage.prototype, "content", void 0);
    MapaDeRutaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mapa-de-ruta',
            templateUrl: 'mapa-de-ruta.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController, AngularFireAuth])
    ], MapaDeRutaPage);
    return MapaDeRutaPage;
}());
export { MapaDeRutaPage };
//# sourceMappingURL=mapa-de-ruta.js.map