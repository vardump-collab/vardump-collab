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
import { NativeAudio } from '@ionic-native/native-audio';
import { LoginPage } from "../login/login";
import firebase from "firebase";
var JuegoFerPage = /** @class */ (function () {
    function JuegoFerPage(navCtrl, navParams, toastCtrl, nativeAudio) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.nativeAudio = nativeAudio;
        this.firebase = firebase;
        this.estadoBoton = true;
        this.ocultarAlert = true;
        this.ocultarSpinner = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.puedeGanarPostre = true;
        this.segundos = 10;
        this.MostrarAlert("Preguntas y respuestas", "Responde correctamente 5 preguntas aleatorias seguidas para ganar! Un postre gratis espera a quienes triunfen en el primer intento!", "Hecho", this.EmpezarJuego);
        this.nativeAudio.preloadSimple('acierto', 'assets/audios/alfa/acierto.mp3').catch(function (error) { });
        this.nativeAudio.preloadSimple('fallo', 'assets/audios/alfa/fallo.mp3').catch(function (error) { });
        var usuariosRef = firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.usuarioKey = item;
                    _this.usuarioMesa = data[item].mesa;
                    if (data[item].juegoFer) {
                        _this.puedeGanarPostre = false;
                    }
                }
            }
        }).then(function () {
            _this.estadoBoton = false;
            _this.ocultarSpinner = true;
        });
        this.preguntas = [
            { pregunta: "¿Cuál es la ciudad más poblada del mundo?", respuesta: "Tokio", opcion1: "Nueva York", opcion2: "Tokio", opcion3: "Seúl", opcion4: "Los Ángeles" },
            { pregunta: "¿Cuántos huesos tiene el cuerpo humano?", respuesta: "206", opcion1: "208", opcion2: "200", opcion3: "206", opcion4: "210" },
            { pregunta: "¿Cuál es el río más grande del mundo?", respuesta: "Río Amazonas", opcion1: "Río Amazonas", opcion2: "Nilo", opcion3: "Río Misisipi", opcion4: "Río Amarillo" },
            { pregunta: "¿De dónde son originarios los juegos olímpicos?", respuesta: "Olimpia", opcion1: "Londres", opcion2: "Chipre", opcion3: "Cerdeña", opcion4: "Olimpia" },
            { pregunta: "¿Quién escribió \"La Odisea\"?", respuesta: "Homero", opcion1: "Homero", opcion2: "Miguel de Cervantes", opcion3: "Jorge Luis Borges", opcion4: "Julio Verne" },
            { pregunta: "¿Quién pintó \"La última cena\"?", respuesta: "Leonardo da Vinci", opcion1: "Pablo Picasso", opcion2: "Vincent van Gogh", opcion3: "Leonardo da Vinci", opcion4: "Salvador Dalí" },
            { pregunta: "¿Cuál es el país más grande del mundo?", respuesta: "Rusia", opcion1: "Estados Unidos", opcion2: "Rusia", opcion3: "Brazil", opcion4: "Australia" },
            { pregunta: "¿En qué año empezó la segunda guerra mundial?", respuesta: "1939", opcion1: "1940", opcion2: "1935", opcion3: "1942", opcion4: "1939" },
            { pregunta: "¿Cuál es el quinto planeta en el sistema solar?", respuesta: "Júpiter", opcion1: "Júpiter", opcion2: "Urano", opcion3: "Marte", opcion4: "Venus" },
            { pregunta: "¿Cuál es la capital de Suecia?", respuesta: "Estocolmo", opcion1: "Gotemburgo", opcion2: "Upsala", opcion3: "Estocolmo", opcion4: "Kalmar" },
            { pregunta: "¿Cuál es el nombre oficial de la lengua china?", respuesta: "Mandarín", opcion1: "Chino", opcion2: "Hiragano", opcion3: "Asiático", opcion4: "Mandarín" },
            { pregunta: "¿Cómo se llama la estación espacial rusa?", respuesta: "MIR", opcion1: "NASA", opcion2: "MIR", opcion3: "ISS", opcion4: "La Salyut" },
            { pregunta: "¿Cuál fue el primer metal que empleó el hombre?", respuesta: "Cobre", opcion1: "Cobre", opcion2: "Acero", opcion3: "Plata", opcion4: "Titanio" },
            { pregunta: "¿De qué lengua proviene el español?", respuesta: "Latín", opcion1: "Italiano", opcion2: "Griego", opcion3: "Castellano", opcion4: "Latín" },
            { pregunta: "¿Quién originó la frase \"solo sé que no sé nada\"?", respuesta: "Sócrates", opcion1: "Platón", opcion2: "Sócrates", opcion3: "Aristóteles", opcion4: "Pitágoras" },
            { pregunta: "¿Quién es el autor de la novela \"Don Quijote de la Mancha\"?", respuesta: "Miguel de Cervantes", opcion1: "Homero", opcion2: "Miguel de Cervantes", opcion3: "Jorge Luis Borges", opcion4: "Julio Verne" },
            { pregunta: "¿Qué instrumento óptico permite ver los astros de cerca?", respuesta: "Telescopio", opcion1: "Telescopio", opcion2: "Microscopio", opcion3: "Television", opcion4: "Lupa" },
            { pregunta: "¿Cuál es el único mamífero capaz de volar?", respuesta: "Murciélago", opcion1: "Colibrí barbinegro", opcion2: "Pez volador", opcion3: "Búho", opcion4: "Murciélago" },
            { pregunta: "¿Cuántos dientes tiene una persona adulta?", respuesta: "32", opcion1: "32", opcion2: "35", opcion3: "30", opcion4: "34" },
            { pregunta: "Según los escritos bíblicos, ¿Quién traicionó a Jesús?", respuesta: "Judas", opcion1: "Abel", opcion2: "Jacob‎", opcion3: "Judas", opcion4: "Moisés‎" },
            { pregunta: "¿Cuántos años duró la guerra de los 100 años?", respuesta: "116 años", opcion1: "100 años", opcion2: "116 años", opcion3: "117 años", opcion4: "105 años" },
            { pregunta: "¿Cómo se llama la ciencia que estudia los mapas?", respuesta: "Cartografía", opcion1: "Cartografía", opcion2: "Geografía", opcion3: "Oceanografía", opcion4: "Ciencias sociales" },
            { pregunta: "¿Cuál es el lugar más frío de la tierra?", respuesta: "La Antártida", opcion1: "Polo sur", opcion2: "Polo norte", opcion3: "Tierra del Fuego", opcion4: "La Antártida" },
            { pregunta: "¿En qué país se encuentra la torre de Pisa?", respuesta: "Italia", opcion1: "Grecia", opcion2: "Francia", opcion3: "Portugal", opcion4: "Italia" },
            { pregunta: "¿En qué año llegó Cristóbal Colón a América?", respuesta: "1942", opcion1: "1940", opcion2: "1942", opcion3: "1937", opcion4: "1945" },
            { pregunta: "¿Dónde se encuentra la famosa \"Torre Eiffel\"?", respuesta: "Francia", opcion1: "Francia", opcion2: "Grecia", opcion3: "Portugal", opcion4: "Italia" },
            { pregunta: "¿En qué lugar del cuerpo se produce la insulina?", respuesta: "En el pancreas", opcion1: "En el apéndice", opcion2: "En la vejiga", opcion3: "En el estómago", opcion4: "En el pancreas" },
            { pregunta: "¿Qué rama de la biología estudia los animales?", respuesta: "La zoología", opcion1: "La zoología", opcion2: "La ictiología", opcion3: "La entomología", opcion4: "La ornitología" }
        ];
        this.preguntasAcertadas = 0;
        this.indice = Math.floor(Math.random() * (this.preguntas.length - 0)) + 0;
        this.preguntaSeleccionada = this.preguntas[this.indice];
        this.respuestaUsuario = this.preguntaSeleccionada.opcion1;
    }
    JuegoFerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JuegoFerPage');
    };
    JuegoFerPage.prototype.ionViewDidLeave = function () {
        clearInterval(this.intervalID);
    };
    JuegoFerPage.prototype.Validar = function () {
        console.log(this.respuestaUsuario);
        if (this.respuestaUsuario == this.preguntaSeleccionada.respuesta) {
            this.NuevaPregunta();
        }
        else {
            this.Perder("¡Respuesta incorrecta!");
        }
    };
    JuegoFerPage.prototype.NuevaPregunta = function () {
        var _this = this;
        this.preguntasAcertadas++;
        if (localStorage.getItem("sonidos") != "false") {
            this.nativeAudio.play('acierto').catch(function (error) { });
        }
        if (this.preguntasAcertadas == 5) {
            if (this.puedeGanarPostre) {
                this.estadoBoton = true;
                this.ocultarSpinner = false;
                clearInterval(this.intervalID);
                this.MostrarAlert("¡Ganaste!", "¡Tu postre gratis aguarda!", "Volver", this.Volver);
                firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoFer: true }).then(function () {
                    firebase.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").push({
                        cantidad: 1,
                        nombre: "postre gratuito",
                        precio: 0
                    }).then(function () {
                        firebase.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").update({ estado: "tomado" }).then(function () {
                            _this.estadoBoton = false;
                            _this.ocultarSpinner = true;
                        });
                    });
                }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
            }
            else {
                clearInterval(this.intervalID);
                this.MostrarAlert("¡Ganaste!", "", "Volver", this.Volver);
            }
        }
        else {
            this.presentToast("¡Respuesta correcta!");
            this.preguntas.splice(this.indice, 1);
            this.indice = Math.floor(Math.random() * (this.preguntas.length - 0)) + 0;
            this.preguntaSeleccionada = this.preguntas[this.indice];
            this.respuestaUsuario = this.preguntaSeleccionada.opcion1;
            this.segundos = 10;
        }
    };
    JuegoFerPage.prototype.EmpezarJuego = function () {
        this.OcultarAlert();
        this.Timer();
    };
    JuegoFerPage.prototype.Perder = function (titulo) {
        var _this = this;
        if (localStorage.getItem("sonidos") != "false") {
            this.nativeAudio.play('fallo').catch(function (error) { });
        }
        this.MostrarAlert(titulo, "M\u00E1s suerte la pr\u00F3xima.", "Volver", this.Volver);
        clearInterval(this.intervalID);
        if (this.puedeGanarPostre) {
            this.estadoBoton = true;
            this.ocultarSpinner = false;
            firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoFer: true }).then(function () {
                _this.estadoBoton = false;
                _this.ocultarSpinner = true;
            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
        }
    };
    JuegoFerPage.prototype.Timer = function () {
        var _this = this;
        this.intervalID = setInterval(function () {
            _this.segundos--;
            if (_this.segundos == 0) {
                _this.Perder("¡Se acabó el tiempo!");
            }
        }, 1000);
    };
    JuegoFerPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    JuegoFerPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    JuegoFerPage.prototype.Volver = function () {
        this.navCtrl.pop();
    };
    JuegoFerPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    JuegoFerPage.prototype.Logout = function () {
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
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(LoginPage);
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
    JuegoFerPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-juego-fer',
            templateUrl: 'juego-fer.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController, NativeAudio])
    ], JuegoFerPage);
    return JuegoFerPage;
}());
export { JuegoFerPage };
//# sourceMappingURL=juego-fer.js.map