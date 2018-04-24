import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//Plugins  Goes here
import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeStorage } from '@ionic-native/native-storage';


//pages goes here
import { LoginPage } from '../pages/login/login';
import {RoomavalibityPage} from '../pages/roomavalibity/roomavalibity';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public backgroundMode:BackgroundMode,
    public nativeStorage:NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //Enabling BackGround mode
      this.backgroundMode.enable();  

      this.nativeStorage.getItem('employeeDetails').then((employee) => {   
        this.rootPage=RoomavalibityPage;
      },err=>{
        this.rootPage=LoginPage;
      });


    });
  }
}

