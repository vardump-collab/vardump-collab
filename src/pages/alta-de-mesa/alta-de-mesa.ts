import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';
import fireBase from "firebase";
import "firebase/firestore";


@IonicPage()
@Component({
  selector: 'page-alta-de-mesa',
  templateUrl: 'alta-de-mesa.html',
})

export class AltaDeMesaPage {

  public navController: NavController;
  public navParams: NavParams;
  public angularFireAuth: AngularFireAuth;
  public toastController: ToastController;
  public camera: Camera;

  public fireBase = fireBase;
  public dataBase = fireBase.firestore();
  public numMesa;
  public cantComensales;
  public tipo = "normal";
  public foto: string = "";
  public nombreFoto: string;
  public cerrarQR = false;
  public esValido = false;
  public scanSub;
  public estado = "vertical-container";
  public arrayUsuarios;
  public arrayMesas: Array<any>;

  public test;

  public usuario;

  constructor(){

    this.arrayUsuarios = JSON.parse(localStorage.getItem("usuario"));

    this.arrayMesas = [];

    let mesasAux = this.fireBase.database().ref("mesas");

    mesasAux.once("value", (snap) => {
      
      let data = snap.val();

      for(let i in data){
        this.arrayMesas.push(data[i]);
      }

    this.arrayMesas = this.arrayMesas.sort((uno, dos) => {return uno.numero - dos.numero;});

    });

    this.foto = "../../assets/imgs/alfa/approves.png";

    this.test = true;

  }

  presentToast(mensaje: string) {

    let toast = this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      cssClass: "infoToast"
    });

    toast.present();
  }

  Alta(){

    if(!this.cantComensales || !this.numMesa || !this.tipo || this.foto == ""){
      this.presentToast("Porfavor complete todos los campos.");
      return;
    }
    else
    {
      this.presentToast("Solo hay disponible lugar mesas del 1 al 10.");
      return;
    }

    if(this.cantComensales < 1 || this.cantComensales > 8){
      this.presentToast("El rango de comensales solo puede ser de 1 a 8.");
      return;
    }
    else{}

    let mesasAux = this.fireBase.database().ref("mesas");

    mesasAux.once("value", (snap) => {
    
      let data = snap.val();

      this.esValido = true;

      for(let i in data){

        if(data[i].numMesa == parseInt(this.numMesa)){
          this.presentToast("Esa mesa ya fue registrada.");
          this.esValido = false;
        }
      }

      if(this.foto == "../../assets/imgs/alfa/approves.png" && this.esValido){

        let url = "../../assets/imgs/gamma/llama.jpeg";

        let mesasAux = this.fireBase.database().ref("mesas");

        mesasAux.push({
          numeroMesa: this.numMesa,
          cantidadComensales: this.cantComensales,
          tipo: this.tipo,
          estado: "libre",
          img: url
        }).then(() => 
        {
          this.numMesa="";
          this.cantComensales="";
          this.foto="";
          this.presentToast("La mesa fue cargada con éxito.");
        });;
      }

      if(this.foto != "../../assets/imgs/alfa/approves.png" && this.esValido){

        let mesasAux = this.fireBase.database().ref("mesas");

        let pictures = this.fireBase.storage().ref(`mesas/${this.nombreFoto+"mesaNumero:"+this.numeroMesa}`);

        pictures.putString(this.foto, "data_url").then(() => {

          pictures.getDownloadURL().then((url) => {

            mesasAux.push({
              numeroMesa: this.numMesa,
              cantidadComensales: this.cantComensales,
              tipo: this.tipo,
              estado: "libre",
              img: url
            }).then(() => 
            {
              this.numMesa="";
              this.cantComensales="";
              this.foto="";
            });;
            
          });

        });
      }

    });

   }

  async SacarFoto() {

    let date = new Date();
    let nombreFoto = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;

    try {

      let options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      let result = await this.camera.getPicture(options);

      this.foto = `data:image/jpeg;base64,${result}`;
      this.nombreFoto = nombreFoto;
    } catch (error) {
      this.presentToast(error);
    }
  }


  Logout() 
  {

    let usuariosAux = this.fireBase.database().ref("usuarios");

    usuariosAux.once("value", (snap) => {

      let data = snap.val();

      for (let i in data) {

        if (data[i].correo == this.usuario.correo) {

          usuariosAux.child(i).update({
            logueado: false
          }).then(() => {
              
              localStorage.clear();
              this.navController.setRoot(LoginPage);
           
          });

          break;
        }
      }
    });
  }


  volver(){
	  this.navController.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaDeMesaPage');
  }

}
