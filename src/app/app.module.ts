import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServiceProvider } from '../providers/service/service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {ListingAddNewPage} from '../pages/listing-add-new/listing-add-new'
import { ListingDetailsPage } from '../pages/listing-details/listing-details';
import { MainPage } from '../pages/main/main';
import {IonicStorageModule} from '@ionic/storage'
import { Geolocation } from '@ionic-native/geolocation';
import {} from '@types/googlemaps';

import { StorageProvider } from '../providers/storage/storage';
import {MapService} from "../providers/service/map-service";
import {AutocompletePage} from "../pages/listing-add-new/autocomplete";
import {ChatPage} from "../pages/chat/chat";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MainPage,
    ListingDetailsPage,
    ListingAddNewPage,
    AutocompletePage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MainPage,
    ListingDetailsPage,
    ListingAddNewPage,
    AutocompletePage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    StorageProvider,
    MapService
  ]
})
export class AppModule {}
