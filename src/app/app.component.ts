import { Component } from '@angular/core';
import { Platform , ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SplashPage } from '../pages/splash/splash';

import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { MapaDeRutaPage } from "../pages/mapa-de-ruta/mapa-de-ruta";
//import { MapPage } from "../pages/map/map";

import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Component({
  templateUrl: 'app.html'
})
@Injectable()
export class MyApp {
  rootPage:any = LoginPage;

  constructor(public platform: Platform, public statusBar: StatusBar,
     public splashScreen: SplashScreen,public modalCtrl: ModalController,public toastCtrl: ToastController,
     public nativeAudio: NativeAudio, public fcm: FCM,
  public router: Router) {
    
    this.initializeApp();
    platform.ready().then(() => {

      statusBar.styleDefault();

      if(localStorage.getItem("usuario")) {
        this.rootPage = PrincipalPage;
      } 
      let splash = modalCtrl.create(SplashPage);
      splash.present();

            

      this.fcm.getToken().then(token => {
        console.log("Token: ",token);
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("Token: ",token);
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });



    });
  }

  initializeApp() {

  }

}
