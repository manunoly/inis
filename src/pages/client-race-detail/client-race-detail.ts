import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ClientRaceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-client-race-detail",
  templateUrl: "client-race-detail.html"
})
export class ClientRaceDetailPage {
  race: any;
  star = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.race = this.navParams.data.race;
    if (this.race.star) {
      this.star = Array(this.race.star).fill(1);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ClientRaceDetailPage");
  }

  goBack() {
    this.navCtrl.pop();
  }
}
