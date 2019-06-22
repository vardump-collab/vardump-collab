import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map'
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

@IonicPage()
@Component({
  selector: 'page-qr-de-la-mesa',
  templateUrl: 'qr-de-la-mesa.html',
})
export class QrDeLaMesaPage {

  user_data= [];
  public firebase = firebase;
  public firebaseDos= firebase;
  public db = firebase.firestore();
  public scanSub;
  public cerrarqr=false;
  public probandingg=true;
  public clientovich;
  public estaLibre=false;
  public ocultarQR = false;
  public estaOcupada=false;

  public usuarios: Array<any>;
  public espera: Array<any>;
  public atendidos: Array<any>;
  
  public tiempopedidos;

  public pedidos=false;


  public usuario;
  public vistaMozo:boolean;
  public vistaCliente:boolean;

  options : any;

  miScan;


public estadoBoton: boolean = false;
public ocultarAlert: boolean = true;
public alertTitulo;
public alertMensaje;
public alertMensajeBoton;
public alertHandler;

public pedidosPruebaUno : Array<any>;
public pedidosPruebaDos : Array<any>;
public pedidosPruebaTres : Array<any>;
public pedidosPruebaCuatro : Array<any>;
public pedidosPruebaCinco : Array<any>;
public pedidosPruebaSeis : Array<any>;
public pedidosPruebaSiete : Array<any>;
public pedidosPruebaOcho : Array<any>;
public pedidosPruebaNueve : Array<any>;
public pedidosPruebaDiez : Array<any>;

public moment = moment;

public sinPersonasEnEspera;
public sinPersonasAtendidas;

public sinPedidosParaEntregar;




  

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,private authInstance: AngularFireAuth,private barcode: BarcodeScanner)
   {
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

    //this.vistaCliente=true;
    //this.usuario.tipo="cliente";
    //this.vistaMozo=true;
   // this.usuario = JSON.parse(localStorage.getItem("usuario"));

   this.sinPersonasEnEspera=false;
   this.sinPersonasAtendidas=false;
   this.sinPedidosParaEntregar=false;

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if(this.usuario.tipo=="mozo")
    {
      this.vistaMozo=true;
    }

    if(this.usuario.tipo=="cliente" || this.usuario.tipo=="anonimo")
    {
      this.vistaCliente=true;
    }

    
    setInterval(() => {
      if(this.ocultarQR) {
        this.OcultarLectorQR();
        this.ocultarQR = false;
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
    this.estaLibre=false;
    this.usuarios = [];
    this.espera = [];
    this.atendidos = [];
    this.pedidosPruebaUno=[];
    this.pedidosPruebaDos=[];
    this.pedidosPruebaTres=[];
    this.pedidosPruebaCuatro=[];
    this.pedidosPruebaCinco=[];
    this.pedidosPruebaSeis=[];
    this.pedidosPruebaSiete=[];
    this.pedidosPruebaOcho=[];
    this.pedidosPruebaNueve=[];
    this.pedidosPruebaDiez=[];


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

    let genteRef = this.firebase.database().ref("usuarios");

    genteRef.on("value", (snap) => {

      this.usuarios=[];
      this.sinPersonasEnEspera=false;
      this.sinPersonasAtendidas=false;
      console.log("asd");

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }

      this.espera = this.usuarios.filter(item => {

        if(item.estado=="espera")
        {
          this.sinPersonasEnEspera=true;
        }
        
        //console.log("aca estoy");
        return item.estado=="espera";
      });

      this.atendidos = this.usuarios.filter(item => {

        if(item.estado=="atendido")
        {
          this.sinPersonasAtendidas=true;
        }

       
       return item.estado=="atendido";
      });

      console.log(this.usuarios);


    });

      
            let pedidosProbandoUno = this.firebase.database().ref("pedidos/1");


            pedidosProbandoUno.on("value", (snap) => {

              this.pedidosPruebaUno=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }

                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 

              
                if (result[k].estado=="preparacion")
                {
                  vale++;

                        if(terminadisimo==true)
                        {
                          this.pedidosPruebaUno.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        
                        this.pedidosPruebaUno.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;



                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaUno.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaUno.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                 

                }

              }
              
            });

            let pedidosProbandoDos = this.firebase.database().ref("pedidos/2");


            pedidosProbandoDos.on("value", (snap) => {

              this.pedidosPruebaDos=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaDos.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaDos.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaDos.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaDos.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                }

              }
              
            });

            let pedidosProbandoTres = this.firebase.database().ref("pedidos/3");


            pedidosProbandoTres.on("value", (snap) => {

              this.pedidosPruebaTres=[];
              //this.pedidosPruebaTres=new Array(0);
              this.sinPedidosParaEntregar=false;
              let vale=0;
              let terminado=true;
              let cocinero=false;
              let bartender=false;
              let terminadisimo=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {
                  /*vale++;
                  if(vale==2)
                  {
                    this.pedidosPruebaTres.push(result[k]);
                  }*/
                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaTres.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaTres.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaTres.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaTres.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  
                  

                }

              }
              
            });

            let pedidosProbandoCuatro = this.firebase.database().ref("pedidos/4");


            pedidosProbandoCuatro.on("value", (snap) => {

              this.pedidosPruebaCuatro=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;

              let cocinero=false;
              let bartender=false;
              let terminadisimo=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaCuatro.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaCuatro.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaCuatro.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaCuatro.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }

                }

              }
              
            });

            let pedidosProbandoCinco = this.firebase.database().ref("pedidos/5");


            pedidosProbandoCinco.on("value", (snap) => {

              this.pedidosPruebaCinco=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }


              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaCinco.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaCinco.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaCinco.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaCinco.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }

                }

              }
              
            });

            let pedidosProbandoSeis = this.firebase.database().ref("pedidos/6");


            pedidosProbandoSeis.on("value", (snap) => {

              this.pedidosPruebaSeis=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaSeis.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaSeis.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaSeis.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaSeis.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }

                }

              }
              
            });

            let pedidosProbandoSiete = this.firebase.database().ref("pedidos/7");


            pedidosProbandoSiete.on("value", (snap) => {

              this.pedidosPruebaSiete=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaSiete.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaSiete.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaSiete.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaSiete.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }

                }

              }
              
            });

            let pedidosProbandoOcho = this.firebase.database().ref("pedidos/8");


            pedidosProbandoOcho.on("value", (snap) => {

              this.pedidosPruebaOcho=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaOcho.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaOcho.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaOcho.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaOcho.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                }

              }
              
            });

            let pedidosProbandoNueve = this.firebase.database().ref("pedidos/9");


            pedidosProbandoNueve.on("value", (snap) => {

              this.pedidosPruebaNueve=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaNueve.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaNueve.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaNueve.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaNueve.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }

                }

              }
              
            });

            
            let pedidosProbandoDiez = this.firebase.database().ref("pedidos/10");


            pedidosProbandoDiez.on("value", (snap) => {

              this.pedidosPruebaDiez=[];
              let vale=0;
              this.sinPedidosParaEntregar=false;
              let terminadisimo=false;

              let cocinero=false;
              let bartender=false;


              let result = snap.val();

              for(let k in result)
              {
                if(k=="cocinero")
                {
                  cocinero=true;
                }
                if(k=="bartender")
                {
                  bartender=true;
                }
                if(result[k].estado=="terminado")
                {
                  terminadisimo=true;
                }

              }

              for(let k in result)
              { 
                if (result[k].estado == "preparacion")
                {

                  vale++;

                  if(terminadisimo==true)
                        {
                          this.pedidosPruebaDiez.push(result[k]);
                          console.log("los 2,uno terminado y el otro añadido")
                          this.sinPedidosParaEntregar=true;
                          break;

                        }

                  if(bartender==true && cocinero==true)
                  {
                    if(vale==2)
                      {
                        this.pedidosPruebaDiez.push(result[k]);
                        console.log("los 2")
                        this.sinPedidosParaEntregar=true;
                        break;
                      }

                  }

                  if(bartender==true && cocinero==false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaDiez.push(result[k]);
                      console.log("barteneder")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }
                  if(cocinero==true && bartender == false)
                  {
                    if(vale==1)
                    {
                      this.pedidosPruebaDiez.push(result[k]);
                      console.log("cocinero")
                      this.sinPedidosParaEntregar=true;
                      break;
                    }

                  }

                }

              }
              
            });




    



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

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad QrDeLaMesaPage');
  }


  MostrarQr(correo)
  {

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

  }

  OcultarLectorQR() {
/*
    this.qrScanner.hide().then(() => {

      (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
      (window.document.querySelector('.close') as HTMLElement).classList.remove('mostrar');
      
      this.probandingg=true;
      this.cerrarqr=false;
    });

    this.scanSub.unsubscribe();*/
  }

  Modificar(correo,text,cantidad,mesa)
  {
    var ocup=true;
    

    this.estaLibre=true;
 
    

    let momentoActual = moment(new Date());
    let reservasRef = firebase.database().ref("reservas");

    reservasRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].mesa == text) {

          let diferencia = Math.abs(momentoActual.diff(moment(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));

          if (diferencia < 40) {

            if(data[item].correo == correo) {

              firebase.database().ref("usuarios").once("value", (snapUsuario) => {

                let dataUsuario = snapUsuario.val();

                for (let itemUsuario in dataUsuario) {

                  if (dataUsuario[itemUsuario].correo == correo) {

                    firebase.database().ref("usuarios").child(itemUsuario).update({estado: "atendido"}).then(() => {

                      firebase.database().ref("mesas").once("value", (snapMesa) => {

                        let dataMesa = snapMesa.val();

                        for (let itemMesa in dataMesa) {

                          if(dataMesa[itemMesa].numeroMesa == mesa) {

                            firebase.database().ref("mesas").child(itemMesa).update({estado: "ocupada"}).then(() => {

                              firebase.database().ref("mesas").child(itemMesa).update({cliente: correo}).then(() => {

                                this.MostrarAlert("", "Se ha asignado la mesa.", "Aceptar", this.limpiar);
                              })

                            })

                          }
                        }
                      })
                    })
                  }
                }
              })
            } else {
              //this.presentToast("Esa mesa esta reservada.");
              this.MostrarAlert("Error","Esta mesa está reservada.","Aceptar",this.limpiar);
              //reservadita=true;
              //otro=2;
              return;
            }

            
          }
        }
      }


                                    var refDos = this.firebase.database().ref("mesas");
                        
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
                                        this.MostrarAlert("¡Error!","Este cliente tiene otra mesa reservada.","Aceptar",this.limpiar);
                                        break;
                                      }

                                  }

                                  //agregue esto para ver si valida el que escanea un qr de mesa
                                  if(text=="1"||text=="2"||text=="3"||text=="4"||text=="5"||text=="6"||text=="7"||text=="8"||text=="9"||text=="10")
                                  {

                                  }

                                  else
                                  {
                                    this.MostrarAlert("¡Error!","Por favor escanee una mesa valida.","Aceptar",this.limpiar);
                                    break;

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
                                   this.MostrarAlert("Error!", "La mesa ya está ocupada.", "Aceptar", this.limpiar);
                                    break;
                                    //return;
                                    
                                  }

                                  if(data[key].cantidadComensales<cantidad)
                                  {
                                    this.MostrarAlert("Error!", "Esta mesa no soporta esa cantidad de comensales.", "Aceptar", this.limpiar);
                                    break;

                                  }





                                    data[key].cliente = correo;
                                    data[key].estado = "ocupada";
                                    refDos.child(key).update(data[key]);
                                    //alert("bienvenido,se relaciono la mesa tres")

                                    if(text==mesa)
                                    {


                                      let reservasRef = firebase.database().ref("reservas");
                                      let djActual = moment(new Date());

                                      reservasRef.once("value", (snap) => {

                                        let data = snap.val();
                                    
                                          for (let item in data) 
                                          {
                                    
                                            if (data[item].correo == correo) 
                                            {

                                              //AGREGANDO LOGIC APRA LA FUNCION
                                              let djReserva = moment(data[item].horario, "DD/MM/YYYY HH:mm");

                                              if(djReserva.diff(djActual, "m") > -40  && djReserva.diff(djActual, "m") < 20) {

                                                //AGREGANDO LOGIC APRA LA FUNCION
                                                data[item].terminada="si";
                                                reservasRef.child(item).update(data[item]);


                                                reservasRef.child(item).remove();
                                                break;

                                            }

                                          }
                                        }
                              


                                      });



                                    }



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
                                                this.MostrarAlert("Éxito!", "Se relacionó al cliente con la mesa." + text, "Aceptar", this.limpiar);
                                                //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                                //COMENTE ESTO
                                                return;
                                                
                                                
                                                
                     
                                            };                  
                                        }
                                    });





                                   
                                };                  
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
           
                          
  }

  MostrarPedidos(mesa)
  {

                   this.pedidos=true;

                          
                          var reftres = this.firebase.database().ref("probandopedidos");
             
                            reftres.once('value', (snap) => {
                                var data = snap.val();
                                for(var key in data){
                                   // if ("1" == data[key]) 
                                  // alert(key);
                                  if(key==mesa)
                                  {
                                    alert("El tiempo de espera es " + data[key].tiempo + " minutos")
                                    break;

                                  }
                                  else
                                  {
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




  }

  cargarPersonas()
  {
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

  }


  MostrarTiempoEsperaCliente()
  {

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

  }

  probandoBarcode(correo)
  {

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

  }

  ocuparMesaBarcode(correo,cantidad,mesa)
  {
    this.barcode.scan().then(barcodeData => {
      this.Modificar(correo,barcodeData.text,cantidad,mesa);
        //alert(barcodeData.text);
    });


  }

  mostrarTiempoBarcode()
  {
    let banderita=0;
    let comiendo=false;

    let usuario = JSON.parse(localStorage.getItem("usuario"));

    this.barcode.scan().then(barcodeData => {



      var refComiendo = this.firebase.database().ref("usuarios");
      refComiendo.once('value',(snap) =>{
          var dataDos = snap.val();
        for (var keyDos in dataDos)
        {
          //agregue esto para ver si funciona tambien
          if(barcodeData.text=="1"||barcodeData.text=="2"||barcodeData.text=="3"||barcodeData.text=="4"||barcodeData.text=="5"||barcodeData.text=="6"||barcodeData.text=="7"||barcodeData.text=="8"||barcodeData.text=="9"||barcodeData.text=="10")
          {

          }

          else
          {
            this.MostrarAlert("¡Error!","Por favor escanee una mesa valida.","Aceptar",this.limpiar);
            break;

          }


          if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo==usuario.correo && dataDos[keyDos].mesa==barcodeData.text)
          //if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo=="cliente@gmail.com" && dataDos[keyDos].mesa==barcodeData.text)
          {
            this.MostrarAlert("Terminado y entregado", "Su pedido ya debería estar en la mesa. Si no es así, comuniquese con su mozo.", "Aceptar", this.limpiar);
            banderita=1;
            comiendo=true;
            break;
          }

          if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo==usuario.correo && dataDos[keyDos].mesa!=barcodeData.text)
         //if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo=="cliente@gmail.com" && dataDos[keyDos].mesa!=barcodeData.text)
          {
            this.MostrarAlert("Error!!","Por favor escanee su mesa","Aceptar",this.limpiar);
            banderita=1;
            comiendo=true;
            break;
          }
          
        }




      });




     
        //alert(barcodeData.text);
        var refDos = this.firebase.database().ref("mesas");
                        
        refDos.once('value', (snap) => {
            var data = snap.val();
           
            for(var key in data)
            {
                //if (barcodeData.text == data[key].numeroMesa)
                if (barcodeData.text == data[key].numeroMesa) 
                {
                  if(data[key].cliente==usuario.correo)
                  {
                    if(data[key].tiempoMinimo!=null)
                    {
                    //alert("El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos");
                    if(comiendo==false)
                    {
                      this.MostrarAlert("¡Cocinándose!", "El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos", "Aceptar", this.limpiar);
                      banderita=1;

                    }
                    //this.MostrarAlert("¡Cocinandose!", "El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos", "Aceptar", this.limpiar);
                    //banderita=1;
                    break;

                    }
                    else
                    {
                      //alert("Su pedido fue tomado,falta que el cocinero ponga un tiempo minimo");
                      this.MostrarAlert("¡A esperar!", "Su pedido fue tomado, falta que el cocinero ponga un tiempo mínimo.", "Aceptar", this.limpiar);
                      banderita=1;
                      break;
                    }
                    
                  }
                  else
                  {
                    //alert("Esa no es su mesa");
                    this.MostrarAlert("¡Error!", "Esta no es su mesa.", "Aceptar", this.limpiar);
                    banderita=1;
                    break;
                  }
                    
                                                                        
                }
                
              }
            }).then(() => 
            {
              if(banderita==0)
              {
                //alert("Por favor escanee una mesa valida");
                this.MostrarAlert("¡Error!", "Por favor escanee una mesa válida.", "Aceptar", this.limpiar);
              }
            });

          




    });



  }


  MostrarAlert(titulo: string, mensaje: string, mensajeBoton: string, handler) 
  {
    this.ocultarAlert = false;
    this.alertTitulo = titulo;
    this.alertMensaje = mensaje;
    this.alertMensajeBoton = mensajeBoton;
    this.alertHandler = handler;

   
  }

  limpiar()
  {
    this.ocultarAlert=true;

  }

  Logout() 
  
  {

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

              localStorage.setItem("desloguear", "true");
              this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
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

  terminarPedidoUno()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/1/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaUno=[];
                          });


  }

  terminarPedidoDos()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/2/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaDos=[];
                          });


  }

  terminarPedidoTres()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/3/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaTres=[];
                          });

  }

  terminarPedidoCuatro()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/4/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaCuatro=[];
                          });


  }

  terminarPedidoCinco()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/5/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaCinco=[];
                          });

  }

  terminarPedidoSeis()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/6/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaSeis=[];
                          });


  }

  terminarPedidoSiete()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/7/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaSiete=[];
                          });


  }

  terminarPedidoOcho()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/8/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaOcho=[];
                          });


  }

  terminarPedidoNueve()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/9/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaNueve=[];
                          });


  }

  terminarPedidoDiez()
  {

    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/10/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 

                              if(k=="cocinero" || k=="bartender")
                                {
                                        
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                }
                              }

                              

                          }).then(() => 
                          {
                          //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          this.pedidosPruebaDiez=[];
                          });

  }

  volver()
  {
    this.navCtrl.pop();
  }

  prueba(text)
  {
    let momentoActual = moment(new Date());
                                  let reservasRef = firebase.database().ref("reservas");

                                  reservasRef.once("value", (snap) => {

                                    let data = snap.val();
                              
                                    for (let item in data) {
                              
                                      if (data[item].mesa == text) {
                              
                                        let diferencia = Math.abs(momentoActual.diff(moment(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));
                              
                                        if (diferencia < 40) {
                              
                                        
                                          //this.presentToast("Esa mesa esta reservada.");
                                          this.MostrarAlert("¡Error!","Esta mesa está reservada.","Aceptar",this.limpiar);
                              
                                          return true;
                                          
                                        }
                                      }
                                    }
                                    return false;
                              
                                 });

  }

  

}
