import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DataServiceProvider } from "./../../providers/data-service/data-service";

/**
 * Generated class for the LiveRaceRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-live-race-request",
  templateUrl: "live-race-request.html"
})
export class LiveRaceRequestPage {
  disponible = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataS: DataServiceProvider) {}

  ionViewDidLoad() {}
  disponibleM() {
    this.dataS.updateStatus(this.disponible);
  }
}
