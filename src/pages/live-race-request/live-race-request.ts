import { HomeUserPage } from "./../home-user/home-user";
import { ConfirmRaceRequestPage } from "./../confirm-race-request/confirm-race-request";
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
  races: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataServiceProvider
  ) {}
  ionViewDidLoad() {
    if (!this.dataS.getUser()) this.navCtrl.push("HomePage");
    else this.findLiveRace();
  }

  disponibleM() {
    this.dataS.updateStatus(this.disponible);
  }

  findLiveRace() {
    let spinner = this.dataS.showSpinner();
    spinner.present();
    this.dataS
      .getData("live-race")
      .then(tmpRace => {
        this.races = tmpRace;
        spinner.dismiss();
      })
      .catch(error => {
        console.log(error.msg);
        spinner.dismiss();
      });
  }

  goToRaceDetail(race: any) {
    this.navCtrl.push(ConfirmRaceRequestPage, {
      race: race
    });
  }

  assignRace(id_race, client_id) {
    let spinner = this.dataS.showSpinner(15000, "Asignando Carrera");
    this.dataS
      .putData("driver-accept-reservations/" + id_race, {
        id: id_race,
        driver_id: this.dataS.getUser().id,
        client_id: client_id
      })
      .then(res => {
        console.log(res);
        spinner.dismiss();
      })
      .catch(error => {
        console.log(error);
        spinner.dismiss();
      });
  }
}
