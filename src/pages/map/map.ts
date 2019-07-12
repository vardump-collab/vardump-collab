import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import firebase from "firebase";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public url: string = '';

  public urlMapa: SafeResourceUrl = [];

  public clientesConPedidos: Array<any>;

  public origen = "Mitre 750 Avellaneda";

  public destino = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public dom: DomSanitizer) {

    let genteRef = firebase.database().ref("usuarios");

    genteRef.on("value", (snap) => {

    this.clientesConPedidos=[];
    //this.sinPedidos=true;

    let data = snap.val();

    for (let item in data)
    {
       //console.log(item);
      if(data[item].estado=="delivery")
      {
        this.destino = data[item].direccion + "," + data[item].localidad;
        break;
      }
    }

    });

    this.url += "https://www.google.com/maps/embed/v1/directions?key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&origin=";

    this.url += this.origen;

    this.url += "&destination=";
    
    this.url += this.destino;

    this.urlMapa = dom.bypassSecurityTrustResourceUrl(this.url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
