import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule } from '@angular/http';

import { MyApp } from "./app.component";
import { DriverRaceDetailPage } from "./../pages/driver-race-detail/driver-race-detail";
import { ClientRaceDetailPage } from "./../pages/client-race-detail/client-race-detail";
import { DataServiceProvider } from "../providers/data-service/data-service";

@NgModule({
  declarations: [MyApp, DriverRaceDetailPage, ClientRaceDetailPage],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, DriverRaceDetailPage, ClientRaceDetailPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataServiceProvider
  ]
})
export class AppModule {}
