import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConfirmRaceRequestPage } from "./../confirm-race-request/confirm-race-request";
import { DataServiceProvider } from "./../../providers/data-service/data-service";
import { RaceRatePage } from "./../race-rate/race-rate";

/**
 * Generated class for the ListRaceServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-list-race-service",
  templateUrl: "list-race-service.html"
})
export class ListRaceServicePage {
  races: any;
  stars: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataServiceProvider
  ) {}

  ionViewDidLoad() {
    if (!this.dataS.getUser()) this.navCtrl.push("HomePage");
    else {
      this.getRaces();
      this.user = this.dataS.getUser();
    }
  }

  getRaces() {
    let spinner = this.dataS.showSpinner();
    spinner.present();
    this.dataS
      .getData("user-reservations/" + this.dataS.getUser().id)
      .then(res => {
        this.races = res;
        spinner.dismiss();
      })
      .catch(error => {
        console.log(error.msg);
        spinner.dismiss();
      });
  }

  raceDetail(race) {
    this.navCtrl.push(ConfirmRaceRequestPage, {
      race: race
    });
  }

  raceRate(race) {
    this.navCtrl.push(RaceRatePage, {
      race: race
    });
  }

  rateCalculate(numberStar = 0) {
    let stars = [];
    let i = 0;
    while (i < 5) {
      if (numberStar > i) stars.push("star");
      else stars.push("star-outline");
      i = i + 1;
    }
    return stars;
  }

  starClicked(i) {
    this.rateCalculate(i);
  }

  colorClass(status) {
    return "style" + status;
  }

  getRaceStatus(raceStatus) {
    return this.dataS.getTextStatus(raceStatus);
  }
}
