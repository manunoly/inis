import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
// import { HttpModule } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from "./app.component";
import { DriverRaceDetailPage } from "./../pages/driver-race-detail/driver-race-detail";
import { ClientRaceDetailPage } from "./../pages/client-race-detail/client-race-detail";
import { DataServiceProvider } from "../providers/data-service/data-service";
import { ConfirmRaceRequestPage } from "./../pages/confirm-race-request/confirm-race-request";
import { RaceRatePage } from "./../pages/race-rate/race-rate";

//geolocalizacion
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMaps } from "@ionic-native/google-maps";

import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    DriverRaceDetailPage,
    ClientRaceDetailPage,
    ConfirmRaceRequestPage,
    RaceRatePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DriverRaceDetailPage,
    ClientRaceDetailPage,
    ConfirmRaceRequestPage,
    RaceRatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataServiceProvider
  ]
})
export class AppModule {}
