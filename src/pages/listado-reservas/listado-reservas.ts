import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { LoginPage } from "../login/login";

import firebase from "firebase";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-listado-reservas',
  templateUrl: 'listado-reservas.html',
})
export class ListadoReservasPage {

  public reservas: Array<any>;
  public reservasPendientes: Array<any>;
  public reservasConfirmadas: Array<any>;
  public mesas: Array<any>;
  public reservaSeleccionada;
  public reservaSeleccionadaParaCancelar;

  public image = "";
  public ocultarImagen = true;
  public ocultarSpinner: boolean = false;
  public ocultarInterfazMesas: boolean;
  public ejecutarSetInterval: boolean;

  public estadoBoton: boolean = false;
  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;

  public firebase = firebase;
  public usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.reservas = [];
    this.reservasPendientes = [];
    this.reservasConfirmadas = [];
    this.mesas = [];
    this.ocultarInterfazMesas = true;
    this.ejecutarSetInterval = true;

    setInterval(() => {
      this.reservasPendientes = this.reservasPendientes;
      this.reservasConfirmadas = this.reservasConfirmadas;
    }, 500);

    let reservasRef = this.firebase.database().ref("reservas");

    reservasRef.on("value", (snap) => {

      let data = snap.val();
      this.reservas = [];
      let contador = 0;

      console.clear();

      for (let item in data) {

        this.reservas.push(data[item]);
        this.reservas[contador].key = item;
        contador++;
      }

      this.reservasPendientes = this.reservas.filter(item => {

        return item.estado == "pendiente";
      });

      this.reservasConfirmadas = this.reservas.filter(item => {

        return item.estado == "confirmada";
      });

      if (this.ejecutarSetInterval) {

        this.VerificarReservasPasadasDeTiempo();
        this.ejecutarSetInterval = false;

        setInterval(() => {

          this.VerificarReservasPasadasDeTiempo();
        }, 1000 * 60);
      }

      this.ocultarSpinner = true;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoReservasPage');
  }

  VerificarReservasPasadasDeTiempo() {

    let momentoActual = moment(new Date());

    for (let item of this.reservas) {

      if (momentoActual.diff(moment(item.horario, "DD/MM/YYYY HH:mm"), "m") > 20) {

        firebase.database().ref("reservas").child(item.key).remove().catch(() => this.presentToast("Ups... Tenemos problemas técnicos"));
      }

    }

  }

  DesplegarMesas(reservaSeleccionada) {

    this.mesas = [];

    this.reservaSeleccionada = reservaSeleccionada;
    let mesasRef = this.firebase.database().ref("mesas");
    let momentoReservaSeleccionada = moment(reservaSeleccionada.horario, "DD/MM/YYYY HH:mm");

    mesasRef.once("value", (snap) => {

      let data = snap.val();
      this.reservas = [];
      let estaDesocupada: boolean;

      for (let item in data) {

        estaDesocupada = true;

        for (let reserva of this.reservasConfirmadas) {

          if (data[item].numeroMesa == reserva.mesa) {

            let momentoReservaMesa = moment(reserva.horario, "DD/MM/YYYY HH:mm");

            if (Math.abs(momentoReservaSeleccionada.diff(momentoReservaMesa, "m")) < 40) {

              estaDesocupada = false;
              break;
            }
          }
        }

        if (data[item].cantidadComensales >= reservaSeleccionada.cantidadPersonas && estaDesocupada)
          this.mesas.push({ numero: data[item].numeroMesa, seleccionado: "" });
      }

      this.mesas = this.mesas.sort((a, b) => {
        return a.numero - b.numero;
      });

      this.ocultarInterfazMesas = false;
    });

  }

  Seleccionar(numero) {

    for (const item of this.mesas) {

      if (item.numero == numero)
        item.seleccionado = "selected";
      else
        item.seleccionado = "";
    }
  }

  Confirmar() {

    let reservaRef = this.firebase.database().ref("reservas").child(this.reservaSeleccionada.key);
    let numeroDeMesa;
    let seleccionoMesa = false;

    for (const item of this.mesas) {

      if (item.seleccionado == "selected") {
        numeroDeMesa = item.numero;
        seleccionoMesa = true;
        break;
      }
    }

    if (seleccionoMesa) {

      this.ocultarSpinner = false;

      reservaRef.update({
        estado: "confirmada",
        mesa: numeroDeMesa
      }).then(() => {

        this.ocultarSpinner = true;
        this.OcultarInterfaz();
        this.presentToast("Se ha confirmado la reserva.");
      });

    } else {

      this.presentToast("Selecciona una mesa antes de continuar.");
    }

  }

  ConfirmarCancelarReserva(reserva) {

    this.reservaSeleccionadaParaCancelar = reserva;
    this.MostrarAlert("", `¿Seguro que deseas cancelar la reserva de ${this.reservaSeleccionadaParaCancelar.apellido}, ${this.reservaSeleccionadaParaCancelar.nombre} para el ${this.reservaSeleccionadaParaCancelar.horario} Hs.?`, "Sí", this.CancelarRerserva);
  }

  CancelarRerserva() {

    this.OcultarAlert();

    firebase.database().ref("reservas").child(this.reservaSeleccionadaParaCancelar.key).remove().then(() => {
      this.ocultarSpinner = true;
      this.presentToast("Se ha cancelado la reserva.");
    })
  }

  OcultarInterfaz() {
    this.ocultarInterfazMesas = true;
  }

  MostrarImagen(imagen: string) {
    this.image = imagen;
    this.ocultarImagen = false;
  }

  OcultarImagen() {
    this.ocultarImagen = true;
  }

  MostrarAlert(titulo: string, mensaje: string, mensajeBoton: string, handler) {
    this.ocultarAlert = false;
    this.alertTitulo = titulo;
    this.alertMensaje = mensaje;
    this.alertMensajeBoton = mensajeBoton;
    this.alertHandler = handler;
  }

  OcultarAlert() {
    this.ocultarAlert = true;
  }

  presentToast(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      cssClass: "infoToast"
    });

    toast.present();
  }

  Logout() {

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          usuariosRef.child(item).update({
            logueado: false
          }).then(() => {
            if (this.usuario.tipo == "mozo"
              || this.usuario.tipo == "cocinero"
              || this.usuario.tipo == "bartender"
              || this.usuario.tipo == "metre"
              || this.usuario.tipo == "repartidor") {

              // Para redireccionar a la encuesta de axel.
              // localStorage.setItem("desloguear", "true");
              // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);

              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            } else {

              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            }
          });

          break;
        }
      }
    });
  }

}
