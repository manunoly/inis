import { Component } from "@angular/core";
import {
  IonicPage /* ,
  NavController,
  NavParams,
  MenuController */
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { DataServiceProvider } from "./../../providers/data-service/data-service";
@IonicPage({
  // name: 'inicio',
  // segment: 'inicio'
})
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  constructor(
    public geolocation: Geolocation,
    private dataS: DataServiceProvider
  ) {}
  ionViewDidLoad() {
    console.log("Cargando Home");
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
          4000,
          false
        );
      });
  }
}
