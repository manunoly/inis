import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DriverRaceDetailPage } from "./../driver-race-detail/driver-race-detail";
import { DataServiceProvider } from "./../../providers/data-service/data-service";

@IonicPage()
@Component({
  selector: "page-list-race",
  templateUrl: "list-race.html"
})
export class ListRacePage {
  user: any;
  races: any;

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
      .getData("driver-reservations/" + this.dataS.getUser().id)
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
    this.navCtrl.push(DriverRaceDetailPage, {
      race: race
    });
  }
}
