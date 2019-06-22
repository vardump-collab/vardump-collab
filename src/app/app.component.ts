import { Component } from '@angular/core';
import { Platform , ModalController} from 'ionic-angular';
import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  public startRoot: any = LoginPage;

  public nativeAudio: NativeAudio;
  public toastController: ToastController;
  public fmcProvider: FcmProvider;
  public modalController: ModalController;
  public splashScreen: SplashScreen;
  public statusBar: StatusBar;
  public platform: Platform;

  splash: any;

  constructor(){

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();

      if(localStorage.getItem("usuario")){
        this.startRoot = PrincipalPage;
      }

      this.splash = this.newModalController(this.modalController);

      this.splash.present();

    });

  }

  public newModalController(modalController: ModalController){

    modalController.create(SplashPage);

    return modalController;

  }

}
