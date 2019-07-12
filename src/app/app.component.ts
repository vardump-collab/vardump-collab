import { Component } from '@angular/core';
import { Platform , ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';

import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';

import { MapaDeRutaPage } from "../pages/mapa-de-ruta/mapa-de-ruta";
//import { MapPage } from "../pages/map/map";

import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,modalCtrl: ModalController, toastCtrl: ToastController,private nativeAudio: NativeAudio, private fcm: FCM,
  private router: Router) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      fcm.getToken();

      statusBar.styleDefault();

      if(localStorage.getItem("usuario")) {
        this.rootPage = PrincipalPage;
      }
      let splash = modalCtrl.create(SplashPage);
            splash.present();

            this.initializeApp();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.subscribeToTopic('people');

      this.fcm.getToken().then(token => {
        console.log(token);
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

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      // this.fcm.unsubscribeFromTopic('marketing');
    });
  }

}
