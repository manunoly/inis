import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { DataServiceProvider } from "./../../providers/data-service/data-service";

@IonicPage()
@Component({
  selector: 'page-home-driver',
  templateUrl: 'home-driver.html',
})
export class HomeDriverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation,
    private dataS: DataServiceProvider) {
  }

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

  goTo(page){
    this.navCtrl.setRoot(page);
  }

}
