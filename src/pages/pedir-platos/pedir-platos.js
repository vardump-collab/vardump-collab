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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the PedirPlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PedirPlatosPage = /** @class */ (function () {
    function PedirPlatosPage(navCtrl, navParams, authInstance, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.contErrores = 0;
        this.animacionMonto = true;
        this.mostrarSpinnerMonto = true;
        this.ocultarMontoPrincipal = true;
        this.mostrarAlert = false;
        this.erroresPedidos = 0;
        this.platos = [];
        this.bebidas = [];
        this.mostrarSpinner = false;
        this.mostrarAlert2 = false;
        this.ocultarMonto = true;
        this.mostrarAlert3 = false;
        this.miValor = undefined;
        this.esDelivery = false;
        this.eligio = false;
        this.yaPidio = false;
        this.cantidadNueva = undefined;
        this.apreto = 1;
        this.tiempoPedido = 0;
        this.pedido = [];
        this.for = "let plato of platos";
        this.monto = 0;
        this.montoPlatos = 0;
        this.montoBebidas = 0;
        this.ocultarElMonto = false;
        this.mostrarSpinnerPlatos = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.ocultarPlatos = true;
        this.ocultarBebidas = true;
        this.mostrarslide = false;
        this.TraerPlatos();
        this.contador = 0;
        this.tipo1 = localStorage.getItem("usuario");
        this.tipo1 = (JSON.parse(this.tipo1)).tipo;
        this.ocultarTitulo = false;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        this.mensaje = "Su pedido ha sido enviado en breve se lo llevaremos...";
        this.foto = "";
        //DESCOMENTAR ESTA LINEA PARA TRABAJAR A NIVEL LOCAL!!!!!
        //this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
        if (this.tipo1 == "mozo") {
            this.mostrarAlert2 = true;
            return;
        }
        this.TraerTipoMesa();
    }
    PedirPlatosPage.prototype.onChangeTime = function (value) {
        this.cantidad = value;
    };
    PedirPlatosPage.prototype.ionViewDidLoad = function () {
    };
    PedirPlatosPage.prototype.CancelarAlert2 = function () {
        this.navCtrl.pop();
    };
    PedirPlatosPage.prototype.AceptarAlert2 = function () {
        var _this = this;
        var valida = true;
        //Valido el campo de la mesa
        if (!this.mesa) {
            valida = false;
            this.mensaje = "Ingrese el numero de mesa";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.mensaje = "Su pedido ha sido enviado en breve se lo llevaremos";
            }, 2000);
            return;
        }
        //Valido que la mesa exista:
        var mensaje = firebase.database().ref().child("mesas/");
        mensaje.once("value", function (snap) {
            var esta = false;
            var ocupada = false;
            var data = snap.val();
            for (var item in data) {
                if (data[item].numeroMesa == _this.mesa) {
                    console.log(_this.mesa);
                    console.log(data[item].estado);
                    esta = true;
                    if (data[item].estado == "ocupada") {
                        ocupada = true;
                    }
                }
            }
            if (!esta) {
                _this.presentToast("El numero de mesa ingresado no existe!!");
                return;
            }
            else {
                //Aca valido que la mesa no esta ocupada
                if (!ocupada) {
                    _this.presentToast("La mesa ingresada no es la corrcta ya que esta vacia");
                    return;
                }
                else {
                    _this.mostrarAlert2 = false;
                    _this.TraerClaveMozo();
                    _this.CalcularMonto();
                }
            }
        });
        //Valido que la mesa no este ocupada
    };
    PedirPlatosPage.prototype.swipeLeftEvent = function ($event) {
        console.log($event.direction);
        if ($event.direction == 4) {
            if (this.contador == 0) {
                return;
            }
            if (this.contador == 1) {
                this.foto = this.foto1;
                this.contador = 0;
                return;
            }
            if (this.contador == 2) {
                this.foto = this.foto2;
                this.contador = 1;
                return;
            }
        }
        if ($event.direction == 2) {
            if (this.contador == 0) {
                this.foto = this.foto2;
                this.contador = 1;
                return;
            }
            if (this.contador == 1) {
                this.foto = this.foto3;
                this.contador = 2;
                return;
            }
            if (this.contador == 2) {
                return;
            }
        }
    };
    PedirPlatosPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    PedirPlatosPage.prototype.ElegirPlato = function (nombre, valor, es, tiempo, para, precio, id) {
        //this.miValor=undefined;
        var _this = this;
        if (parseInt(valor) <= 0 || valor == undefined || valor == "") {
            if (this.contErrores == 3) {
                this.contErrores = 0;
                this.mensaje = "Coloque la cantidad del elemento del menu";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.mensaje = "Su pedido ha sido enviado en breve se lo llevaremos...";
                }, 3000);
                return;
            }
            this.contErrores++;
            return;
        }
        if (parseInt(valor) > 20) {
            this.mensaje = "La cantidad del elemento del menú no puede ser mayor a 20.";
            this.mostrarAlert3 = true;
            this.valorPlatos = 0;
            this.valor = null;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.mensaje = "Su pedido ha sido enviado en bréve se lo llevaremos...";
            }, 3000);
            return;
        }
        if (tiempo == "cero") {
            tiempo = 0;
        }
        this.pedido.push({ cant: valor, nombre: nombre, es: es, tiempo: tiempo, para: para, precio: precio, id: id });
        console.log("Elegi" + this.pedido[this.pedido.length - 1]);
        window.document.querySelector('#' + id).classList.add("mostrarElegido");
        console.log(this.pedido);
        //Si es plato le sumo el monto a plato si es bebida a bebida:
        var total = 0;
        if (es == "plato") {
            var sumar = parseInt(valor) * parseInt(precio);
            console.log(sumar);
            this.montoPlatos = this.montoPlatos + sumar;
            total = sumar;
        }
        else {
            var sumar = parseInt(valor) * parseInt(precio);
            console.log(sumar);
            this.montoBebidas = this.montoBebidas + sumar;
            total = sumar;
        }
        this.monto = this.monto + total;
    };
    PedirPlatosPage.prototype.mostrarSlide = function (foto1, foto2, foto3, nombre, desc) {
        this.foto = foto1;
        this.foto1 = foto1;
        this.foto2 = foto2;
        this.foto3 = foto3;
        this.nombre = nombre;
        this.desc = desc;
        this.mostrarslide = true;
    };
    PedirPlatosPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Mesa',
            inputs: [
                {
                    name: 'mesa',
                    placeholder: 'Ingrese numero de mesa'
                },
                {
                    name: 'number',
                    placeholder: 'numero',
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function (data) {
                        _this.mesa = data;
                    }
                }
            ]
        });
        alert.present();
    };
    PedirPlatosPage.prototype.Platos = function () {
        this.mostrarSpinnerPlatos = true;
        if ((this.platos.length > 0)) {
            this.mostrarSpinnerPlatos = false;
        }
        this.ocultarPlatos = false;
        this.ocultarTitulo = true;
        this.titulo = "Nuestros platos";
        this.ocultarMonto = false;
    };
    PedirPlatosPage.prototype.Bebidas = function () {
        this.mostrarSpinnerPlatos = true;
        if ((this.platos.length > 0)) {
            this.mostrarSpinnerPlatos = false;
        }
        this.miValor = undefined;
        this.ocultarPlatos = true;
        this.valor = undefined;
        this.ocultarBebidas = false;
        this.ocultarTitulo = true;
        this.titulo = "Nuestras bebidas";
        this.ocultarMonto = false;
    };
    PedirPlatosPage.prototype.Cerrar = function () {
        //Esta la pongo de prueba
        this.ocultarPlatos = true;
        this.ocultarTitulo = false;
        this.ocultarBebidas = true;
        this.ocultarMonto = true;
        if (this.monto == 0) {
            console.log("no se tendria  que ver el monto");
            this.ocultarMontoPrincipal = true;
        }
        else {
            console.log("se tendria  que ver el monto");
            this.ocultarMontoPrincipal = false;
        }
        // this.ocultarMontoPrincipal=false;
    };
    PedirPlatosPage.prototype.cerrarSlide = function () {
        this.mostrarslide = false;
        this.contador = 0;
    };
    PedirPlatosPage.prototype.TraerPlatos = function () {
        var _this = this;
        var mensaje = firebase.database().ref().child("platos/");
        mensaje.on("value", function (snap) {
            var data = snap.val();
            _this.platos = [];
            _this.bebidas = [];
            for (var key in data) {
                if (data[key].carga.es == "plato") {
                    _this.platos.push(data[key]);
                    _this.platos[_this.platos.length - 1].MiCantidad = undefined;
                    var nombre = (_this.platos[_this.platos.length - 1].carga.nombre).split(" ");
                    console.log(_this.platos[_this.platos.length - 1].carga.nombre);
                    if (nombre.length > 1) {
                        var nombreFinal = "";
                        for (var i = 0; i < nombre.length; i++) {
                            nombreFinal = nombreFinal + nombre[i];
                        }
                        _this.platos[_this.platos.length - 1].carga.id = nombreFinal;
                        console.log("id compuesto de nombre" + _this.platos[_this.platos.length - 1].carga.id);
                    }
                    else {
                        _this.platos[_this.platos.length - 1].carga.id = _this.platos[_this.platos.length - 1].carga.nombre;
                        console.log("id  de nombre simple" + _this.platos[_this.platos.length - 1].carga.id);
                    }
                }
                else {
                    _this.bebidas.push(data[key]);
                    _this.bebidas[_this.bebidas.length - 1].MiCantidad = undefined;
                    var nombre = (_this.bebidas[_this.bebidas.length - 1].carga.nombre).split(" ");
                    if (nombre.length > 1) {
                        var nombreFinal = "";
                        for (var i = 0; i < nombre.length; i++) {
                            nombreFinal = nombreFinal + nombre[i];
                        }
                        _this.bebidas[_this.bebidas.length - 1].carga.id = nombreFinal;
                    }
                    else {
                        _this.bebidas[_this.bebidas.length - 1].carga.id = _this.bebidas[_this.bebidas.length - 1].carga.nombre;
                    }
                }
            }
            _this.mostrarSpinnerPlatos = false;
        });
    };
    PedirPlatosPage.prototype.AceptarPedido = function () {
        this.eligio = true;
        this.Cerrar();
    };
    PedirPlatosPage.prototype.CancelarPedido = function (cual) {
        this.valorPlatos = null;
        if (cual == "plato") {
            this.monto = this.monto - this.montoPlatos;
            this.montoPlatos = 0;
            this.valorPlatos = null;
            //Solo estoy probando la variable si funca aca tambien  
        }
        else {
            this.monto = this.monto - this.montoBebidas;
            this.montoBebidas = 0;
            this.valor = null;
            console.log("valor " + this.valor);
        }
        this.eligio = false;
        console.log("elementos en array pedidios" + this.pedido.length);
        var posicionBorrar = [];
        for (var i = 0; i < this.pedido.length; i++) {
            console.log("Le saco la selecccion a ");
            if (this.pedido[i].es == cual) {
                window.document.querySelector('#' + this.pedido[i].id).classList.remove("mostrarElegido");
                //  this.pedido.splice(i, 1);
                //Guardo las posiciones del array que tengo que borrar
                posicionBorrar.push(i);
                this.pedido[i] = null;
                //console.log("Deberia borrar este pedido:" + this.pedido[i]);
                //console.log("Esta es la posicion : " + i);
            }
        }
        //Aca cargo el array de pedidos con elementos del pedido que no hallan sido borrados
        var pedidoSec = [];
        for (var i = 0; i < this.pedido.length; i++) {
            if (this.pedido[i] != null) {
                pedidoSec.push(this.pedido[i]);
            }
            //  this.pedido.splice(posicionBorrar[i], 1);
        }
        this.pedido = pedidoSec;
        // this.pedido.splice(0, this.pedido.length);
        this.Cerrar();
        console.log(this.pedido);
    };
    PedirPlatosPage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    PedirPlatosPage.prototype.PedirFinal = function () {
        var _this = this;
        if (this.erroresPedidos == 3) {
            this.erroresPedidos = 0;
            this.mensaje = "Para agregar un plato o bebida a su orden, coloque una cantidad del plato que desea y presione sobre el botón elegir del plato.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 7000);
            return;
        }
        if (this.pedido.length <= 0) {
            this.erroresPedidos++;
            this.mensaje = "No agrego ningun pedido a la orden.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 2000);
            return;
        }
        this.mostrarSpinner = true;
        var mensaje = firebase.database().ref().child("pedidos/" + this.mesa + "/cocinero");
        var mensaje2 = firebase.database().ref().child("pedidos/" + this.mesa + "/bartender");
        var tiempoMax = 0;
        var nodoPadre;
        var tieneBartender = false;
        var tieneCocinero = false;
        for (var i = 0; i < this.pedido.length; i++) {
            console.log(this.pedido[i].para);
            if (this.pedido[i].para == "bartender") {
                console.log("El de abajo es de bartender");
                console.log(this.pedido[i]);
                tieneBartender = true;
                mensaje2.push({ nombre: this.pedido[i].nombre, cantidad: this.pedido[i].cant, precio: this.pedido[i].precio });
            }
            if (this.pedido[i].para == "cocinero") {
                console.log("El de abajo es de cocinero");
                console.log(this.pedido[i]);
                tieneCocinero = true;
                if (tiempoMax < this.pedido[i].tiempo) {
                    tiempoMax = this.pedido[i].tiempo;
                }
                console.log(this.pedido[i].nombre);
                mensaje.push({ nombre: this.pedido[i].nombre, cantidad: this.pedido[i].cant, precio: this.pedido[i].precio });
                this.yaPidio = true;
            }
        }
        if (tieneCocinero) {
            mensaje.update({ estado: "tomado" }).then(function () {
                for (var i = 0; i < _this.pedido.length; i++) {
                    window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                }
                _this.pedido = [];
            });
        }
        if (tieneBartender) {
            mensaje2.update({ estado: "tomado" }).then(function () {
                for (var i = 0; i < _this.pedido.length; i++) {
                    window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                }
                _this.pedido = [];
            });
            ;
        }
        //Establecer tiempo:
        var refTiempo = firebase.database().ref().child("pedidos/" + this.mesa);
        refTiempo.once("value", function (snap) {
            var data = snap.val();
            var tiempo = data.tiempo;
            if (!tiempo || tiempo < tiempoMax) {
                var mensaje3 = firebase.database().ref().child("pedidos/" + _this.mesa);
                mensaje3.update({ tiempo: tiempoMax }).then(function () {
                    for (var i = 0; i < _this.pedido.length; i++) {
                        window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                    }
                    _this.pedido = [];
                });
            }
            if (tiempo > tiempoMax) {
                for (var i = 0; i < _this.pedido.length; i++) {
                    window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                }
                _this.pedido = [];
            }
        });
        //Guardo el estado pidio  al cliente
        if (!this.esDelivery) {
            var usuariosRef = firebase.database().ref().child("usuarios/" + this.claveUsuarioActual);
            usuariosRef.update({ estado: "pidio" }).then(function () {
                console.log(_this.claveUsuarioActual);
                console.log("No delivery");
                _this.mostrarSpinner = false;
                _this.mensaje = "El pedido ha sido enviado en breve se lo llevaremos";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.navCtrl.pop();
                }, 4000);
            });
        }
        else {
            var usuariosRef = firebase.database().ref().child("usuarios/" + this.claveUsuarioActual);
            usuariosRef.update({ estado: "delivery" }).then(function () {
                console.log(" delivery");
                console.log(_this.claveUsuarioActual);
                _this.mostrarSpinner = false;
                _this.mensaje = "El pedido ha sido enviado en breve se lo llevaremos";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.navCtrl.pop();
                }, 4000);
            });
        }
    };
    PedirPlatosPage.prototype.TraerClaveMozo = function () {
        var _this = this;
        var usuariosRef = firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].mesa == _this.mesa) {
                    _this.claveUsuarioActual = key;
                    break;
                }
            }
            console.log(_this.mesa + _this.tipo);
        });
    };
    PedirPlatosPage.prototype.TraerTipoMesa = function () {
        var _this = this;
        console.log("Estoy trayendo la mesa");
        /*   if(this.tipo1=="mozo")
            {
              return;
            }*/
        var usuariosRef = firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].correo == _this.correo) {
                    _this.tipo = data[key].tipo;
                    if (_this.tipo != "mozo") {
                        //Si no tiene mesa la mesa va a ser su correo
                        if (!data[key].mesa) {
                            _this.mesa = _this.correo;
                            //Le saco el arroba y el punto al string
                            var patron = '@';
                            var nuevo = '';
                            var cadena = _this.mesa.replace(patron, nuevo);
                            patron = '.';
                            nuevo = '';
                            cadena = cadena.replace(patron, nuevo);
                            _this.mesa = cadena;
                            _this.esDelivery = true;
                            _this.claveUsuarioActual = key;
                            //Le pongo estado al cliente como delivery
                            //   let usuario= data[key];
                            // usuario.estado="delivery";
                            /*   this.usuarioDelivery=data[key];
                               this.usuarioDelivery.estado="delivery";
                              
                            
                               //let usuariosRef = firebase.database().ref("usuarios/"+key);
                            
                               //usuariosRef.set(usuario);*/
                            _this.CalcularMonto();
                            return;
                        }
                        else {
                            _this.mesa = data[key].mesa;
                            console.log(_this.mesa);
                            _this.claveUsuarioActual = key;
                            _this.CalcularMonto();
                            return;
                        }
                    }
                    if (_this.tipo1 == "mozo") {
                        console.log("Soy mozo");
                        _this.CalcularMonto();
                        if (data[key].mesa == _this.mesa) {
                            _this.claveUsuarioActual = key;
                        }
                    }
                    break;
                }
            }
        });
    };
    PedirPlatosPage.prototype.CalcularMonto = function () {
        var _this = this;
        console.log("soy: " + this.correo);
        console.log("Estoy en sunmar montos");
        var montos = [];
        var montoGuardado = 0; //ACA ME FIJO EL MONTO DE LA MESA
        var usuariosRef2 = firebase.database().ref("pedidos").child(this.mesa);
        usuariosRef2.once("value", function (snap) {
            var data = snap.val();
            if (data == null) {
                _this.monto = 0;
            }
            for (var item in data) {
                for (var subItem in data[item]) {
                    montos.push(data[item][subItem]);
                    console.log("esto estoy pusheando a montos" + data[item][subItem]);
                }
            }
            console.log(montos);
            //SUMO LOS VALORES:
            for (var i = 0; i < montos.length - 1; i++) {
                console.log(montos[i]);
                console.log("cantidad " + montos[i].cantidad);
                console.log("precio " + montos[i].precio);
                //Fijarme Si esto se soluciona.
                if (montos[i] != "tomado" && montos[i] != "preparacion" && montos[i] != "terminado" && montos[i] != "1" && montos[i] != "0" && montos[i] != "%") {
                    console.log("cantidad " + montos[i].cantidad);
                    console.log("precio " + montos[i].precio);
                    var suma = parseInt(montos[i].cantidad) * montos[i].precio;
                    console.log(suma);
                    console.log(montos[i]);
                    console.log("cantidad " + montos[i].cantidad);
                    console.log("precio " + montos[i].precio);
                    montoGuardado = montoGuardado + suma;
                }
            }
            _this.monto = montoGuardado;
            _this.mostrarSpinnerMonto = false;
            _this.animacionMonto = false;
            _this.ocultarElMonto = true;
        });
    };
    __decorate([
        ViewChild('cant'),
        __metadata("design:type", Object)
    ], PedirPlatosPage.prototype, "cant", void 0);
    __decorate([
        ViewChild('cant2'),
        __metadata("design:type", Object)
    ], PedirPlatosPage.prototype, "cant2", void 0);
    PedirPlatosPage = __decorate([
        Component({
            selector: 'page-pedir-platos',
            templateUrl: 'pedir-platos.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireAuth,
            AlertController,
            ToastController])
    ], PedirPlatosPage);
    return PedirPlatosPage;
}());
export { PedirPlatosPage };
//# sourceMappingURL=pedir-platos.js.map