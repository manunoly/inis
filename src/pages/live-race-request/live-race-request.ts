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
  spinner: any;
  public races: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataServiceProvider
  ) {
    this.findLiveRace();
  }

  disponibleM() {
    this.dataS.updateStatus(this.disponible);
  }

  findLiveRace() {
    this.spinner = this.dataS.showSpinner();
    setTimeout(() => {
      this.dataS
        .getData("live-race")
        .then(tmpRace => {
          this.races = tmpRace;
          this.spinner.dismiss();
        })
        .catch(error => {
          console.log(error);
        });
    },0);
  }

  goToRaceDetail(race: any) {
    this.navCtrl.push(ConfirmRaceRequestPage, {
      race: race
    });
  }

  assignRace(id_race) {
    let spinner = this.dataS.showSpinner(15000, "Asignando Carrera");
    console.log({ id: id_race, driver_id: this.dataS.getUser().id });
    if (spinner) spinner.dismiss();
    /*     this.dataS
      .postData("assign", { id: id_race, driver_id: this.dataS.getUser().id })
      .then(res => {
        this.races = res;
        console.log(res);
        this.spinner.dismiss();
      })
      .catch(error => {
        console.log(error);
      }); */
  }
}
