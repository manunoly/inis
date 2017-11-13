import { Component } from "@angular/core";
import {
  IonicPage /* ,
  NavController,
  NavParams,
  MenuController */
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { DataServiceProvider } from "./../../providers/data-service/data-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@IonicPage({})
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    private http: HttpClient,
    public geolocation: Geolocation,
    private dataS: DataServiceProvider
  ) {}
  ionViewDidLoad() {
    this.geolocation
      .getCurrentPosition()
      .then(postion => {
        this.dataS.subscribePostion();
      })
      .catch(error => {
        this.dataS.showNotification(
          "Por favor active su Geolocalización y verifique su conexión." +
            "\n" +
            error.message,
          5000,
          false
        );
      });
  }
}
