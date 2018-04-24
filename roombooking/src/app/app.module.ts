import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//plugins goes here
import { HttpModule} from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { IBeacon } from '@ionic-native/ibeacon';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

//page goes here
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import {RoomavalibityPage} from '../pages/roomavalibity/roomavalibity';
import {RoombookingPage} from '../pages/roombooking/roombooking';


//app services goes here 
import {AppService} from '../services/app.service';
import {AuthService} from '../services/auth.service';
import { BeaconProvider } from '../providers/beacon/beacon';



@NgModule({
  declarations: [
  MyApp,
  LoginPage,
  RoomavalibityPage,
  RoombookingPage
  ],
  imports: [
  BrowserModule,
  HttpModule,
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  LoginPage,
  RoomavalibityPage,
  RoombookingPage
  ],
  providers: [
  IBeacon,
  BackgroundMode,
  AppService,
  AuthService,
  StatusBar,
  SplashScreen,
  NativeStorage, 
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  BeaconProvider,
  LocalNotifications
  ]
})
export class AppModule {}
