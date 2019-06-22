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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { NativeAudio } from '@ionic-native/native-audio';
import firebase from "firebase";
import { LoginPage } from '../login/login';
/**
 * Generated class for the JuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JuegoPage = /** @class */ (function () {
    function JuegoPage(navCtrl, navParams, authInstance, nativeAudio) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.nativeAudio = nativeAudio;
        this.firebase = firebase;
        this.taparJuego = false;
        this.animacion = [];
        this.fotos = [];
        this.coincide = false;
        this.imgMostrar = [];
        this.contadorJugadas = 0;
        this.tiempo = "";
        this.mensaje = "";
        this.juegoIniciado = false;
        this.gano = false;
        this.mostrarAlert = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        //this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        this.nativeAudio.preloadSimple('simple', 'assets/audio/beta/simple.mp3').catch(function () { });
        this.nativeAudio.preloadSimple('coincide', 'assets/audio/beta/coincide.mp3').catch(function () { });
        //Ademas de obtener la mesa tambien me fijo si el usuario ya jugo este juego
        this.ObtenerMesa();
        for (var i = 0; i < 16; i++) {
            this.imgMostrar.push({ img: "assets/imgs/beta/elLogo.png", ok: true });
            this.animacion.push(false);
        }
        this.fotos.push({ img: "assets/imgs/beta/empanada.jpg", clave: 1, id: 1 });
        this.fotos.push({ img: "assets/imgs/beta/pizza.jpg", clave: 2, id: 2 });
        this.fotos.push({ img: "assets/imgs/beta/hamburguesa.jpg", clave: 3, id: 3 });
        this.fotos.push({ img: "assets/imgs/beta/milanesa.jpg", clave: 4, id: 4 });
        this.fotos.push({ img: "assets/imgs/beta/vino.jpg", clave: 5, id: 5 });
        this.fotos.push({ img: "assets/imgs/beta/jugo.jpg", clave: 6, id: 6 });
        this.fotos.push({ img: "assets/imgs/beta/papas.jpg", clave: 7, id: 7 });
        this.fotos.push({ img: "assets/imgs/beta/fondoPedido.jpg", clave: 8, id: 8 });
        this.fotos.push({ img: "assets/imgs/beta/empanada.jpg", clave: 1, id: 9 });
        this.fotos.push({ img: "assets/imgs/beta/pizza.jpg", clave: 2, id: 10 });
        this.fotos.push({ img: "assets/imgs/beta/hamburguesa.jpg", clave: 3, id: 11 });
        this.fotos.push({ img: "assets/imgs/beta/milanesa.jpg", clave: 4, id: 12 });
        this.fotos.push({ img: "assets/imgs/beta/vino.jpg", clave: 5, id: 13 });
        this.fotos.push({ img: "assets/imgs/beta/jugo.jpg", clave: 6, id: 14 });
        this.fotos.push({ img: "assets/imgs/beta/papas.jpg", clave: 7, id: 15 });
        this.fotos.push({ img: "assets/imgs/beta/fondoPedido.jpg", clave: 8, id: 16 });
        this.fotos = this.fotos.sort(function () { return Math.random() - 0.5; });
        this.puntos = 0;
    }
    JuegoPage.prototype.Jugar = function () {
        var _this = this;
        this.juegoIniciado = true;
        var tope = new Date().getTime();
        tope = tope + 60 * 1000;
        var countDownDate = new Date(tope).getTime();
        this.x = setInterval(function () {
            // Get todays date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            _this.tiempo = minutes + ":" + seconds;
            if (distance < 0) {
                clearInterval(_this.x);
                _this.gano = false;
                //Me fijo si jugo o si no para subirle el estado
                if (!_this.yaJugo) {
                    console.log(_this.jugadorActual);
                    console.log(_this.claveJugador);
                    var usuariosRef = firebase.database().ref("usuarios/" + _this.claveJugador);
                    //this.claveActual=key;
                    usuariosRef.set(_this.jugadorActual).then(function () {
                        _this.mensaje = "El tiempo se acabó, juego terminado, ustéd pierde";
                        _this.mostrarAlert = true;
                        setTimeout(function () {
                            _this.mostrarAlert = false;
                            _this.navCtrl.pop();
                        }, 4000);
                    });
                }
                _this.tiempo = "Juego finalizado";
                _this.taparJuego = true;
                _this.puntos = 0;
                for (var i = 0; i < 16; i++) {
                    _this.imgMostrar[i] = { img: "assets/imgs/beta/elLogo.png", ok: true };
                }
                //Aca muestro el alert de que perdio.
                _this.mensaje = "El tiempo se acabó, juego terminado, ustéd pierde";
                _this.mostrarAlert = true;
                setTimeout(function () {
                    _this.mostrarAlert = false;
                    _this.navCtrl.pop();
                }, 4000);
            }
        });
    };
    JuegoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JuegoPage');
    };
    JuegoPage.prototype.Salir = function () {
        this.navCtrl.pop();
    };
    JuegoPage.prototype.cambiarImagen = function (valor) {
        var _this = this;
        console.log(this.contadorJugadas);
        console.log(this.puntos);
        valor = parseInt(valor);
        valor = valor - 1;
        var imgMostrar = "imgMostrar" + valor;
        if (this.imgMostrar[valor].ok == false) {
            return;
        }
        this.contadorJugadas = this.contadorJugadas + 1;
        this.imgMostrar[valor].img = this.fotos[valor].img;
        //this.contadorJugadas = this.contadorJugadas +1;
        if (this.contadorJugadas == 1) {
            //Pregunto si esta desactivado el sonido.
            if (localStorage.getItem("sonidos") != "false") {
                this.nativeAudio.play('simple').catch(function () { });
            }
            //Aca permito que se de vuelta la imagen
            this.valorViejo = valor;
            this.primerId = this.fotos[valor].id;
            this.claveActual = this.fotos[valor].clave;
        }
        if (this.contadorJugadas == 2) {
            //Aca necesito que aunque clikee no me de vuelta la imagen ni haga nada
            this.taparJuego = true;
            if (this.primerId == this.fotos[valor].id) {
                console.log(this.primerId);
                console.log(this.fotos[valor].id);
                this.contadorJugadas = 1;
                this.taparJuego = false;
                return;
            }
            if (this.claveActual == this.fotos[valor].clave) {
                this.claveActual = "";
                this.coincide = true;
                this.imgMostrar[this.valorViejo].ok = false;
                this.imgMostrar[valor].ok = false;
                this.animacion[valor] = true;
                this.animacion[this.valorViejo] = true;
                if (localStorage.getItem("sonidos") != "false") {
                    this.nativeAudio.play('coincide').catch(function () { });
                }
                this.puntos = this.puntos + 10;
                if (this.puntos == 80) {
                    //  this.miCon.CargarScore(this.token.correo, "puntajeJM", this.puntos.toString()).subscribe(
                    //exito => console.log("Exito" + JSON.stringify(exito)),
                    // error => console.log("Error" + JSON.stringify(error))
                    // );
                    // this.IniciarJuego();
                    this.gano = true;
                }
            }
            else {
                if (localStorage.getItem("sonidos") != "false") {
                    this.nativeAudio.play('simple').catch(function () { });
                }
                this.claveActual = "";
            }
            this.contadorJugadas = 0;
            // this.taparJuego=true;
            setTimeout(function () {
                for (var i = 0; i < 16; i++) {
                    if (_this.imgMostrar[i].ok == false) {
                        _this.imgMostrar[i].img = "assets/imgs/beta/ok2.png";
                    }
                    else {
                        _this.imgMostrar[i].img = "assets/imgs/beta/elLogo.png";
                    }
                    _this.taparJuego = false;
                }
                if (_this.gano) {
                    if (!_this.yaJugo) {
                        _this.SubirDescuento();
                        _this.mensaje = "!!Felicitaciones usted ganó un 10% de descuento!!";
                        var usuariosRef = firebase.database().ref("usuarios/" + _this.claveJugador);
                        usuariosRef.set(_this.jugadorActual).then(function () {
                            _this.mostrarAlert = true;
                            setTimeout(function () {
                                _this.mostrarAlert = false;
                                _this.navCtrl.pop();
                            }, 4000);
                            clearInterval(_this.x);
                            _this.tiempo = "juego finalizado";
                        });
                    }
                    else {
                        _this.mensaje = "!!Felicitaciones ganó el juego!!";
                        _this.mostrarAlert = true;
                        setTimeout(function () {
                            _this.mostrarAlert = false;
                            _this.navCtrl.pop();
                        }, 4000);
                        clearInterval(_this.x);
                        _this.tiempo = "juego finalizado";
                    }
                }
            }, 500);
        }
    };
    JuegoPage.prototype.ObtenerMesa = function () {
        var _this = this;
        var usuariosRef = firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].correo == _this.correo) {
                    //Si noo jugo pongo mi variable a false y subo que ya jugo a firebase
                    if (data[key].juegoFacu == undefined) {
                        _this.yaJugo = false;
                        _this.jugadorActual = data[key];
                        _this.jugadorActual.juegoFacu = "si";
                        _this.claveJugador = key;
                    } //Si jugo simplemente le aviso a mi variable local.
                    else {
                        _this.jugadorActual = data[key];
                        _this.jugadorActual.juegoFacu = "si";
                        _this.claveJugador = key;
                        _this.yaJugo = true;
                    }
                    //Siempre va a tener mesa sino sera su correo pero el campo mesa siempre estara seteado asi que tranqui
                    _this.mesa = data[key].mesa;
                }
            }
        }).catch(function () { console.log("Por las dudas"); });
    };
    JuegoPage.prototype.SubirDescuento = function () {
        var desc = firebase.database().ref().child("pedidos/" + this.mesa);
        desc.update({ desc: "10%" });
    };
    JuegoPage.prototype.Logout = function () {
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
    JuegoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-juego',
            templateUrl: 'juego.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AngularFireAuth, NativeAudio])
    ], JuegoPage);
    return JuegoPage;
}());
export { JuegoPage };
//# sourceMappingURL=juego.js.map