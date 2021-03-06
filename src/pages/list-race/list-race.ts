import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConfirmRaceRequestPage } from "./../confirm-race-request/confirm-race-request";
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
    if (!this.dataS.getUser()) this.navCtrl.push("HomeDriverPage");
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
    this.navCtrl.push(ConfirmRaceRequestPage, {
      race: race
    });
  }
  getRaceStatus(status) {
    return this.dataS.getTextStatus(status);
  }

  getStatusAcepted() {
    return DataServiceProvider.STATUS_ACEPTED;
  }
  getStatusStart() {
    return DataServiceProvider.STATUS_STARTED;
  }

  doIt(race) {
    this.dataS
      .getData("user/" + race.client_id)
      .then(client => {
        this.dataS.liveClient = client;
        this.dataS.liveRace = race;
        this.navCtrl.push('LiveRaceRequestPage', {
          race: race
        });
      })
      .catch(error => {
        console.log(error);
        this.dataS.showNotification("Ha ocurrido un error");
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

  colorClass(status) {
    return "style" + status;
  }
}
