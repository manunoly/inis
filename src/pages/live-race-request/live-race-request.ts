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
  races = [
    {
      from: "Tamayo, Quito 170135, Ecuador",
      fromLat: -0.17086854756352984,
      fromLong: -78.47963991966554,
      to: "El Norte, Quito 170135, Ecuador",
      toLat: -0.18065319999999657,
      toLong: -78.47903910484621,
      distance: "2,0 km",
      duration: "9 min",
      price: 1,
      passenger_id: "1",
      passenger_name: "Andy"
    },
    {
      from: "Teresa De Cepeda, Quito 170521, Ecuador",
      fromLat: -0.17138352939744905,
      fromLong: -78.49328699913332,
      to: "Pablo Herrera, Quito 170104, Ecuador",
      toLat: -0.1811681815637213,
      toLong: -78.49182787742922,
      distance: "1,5 km",
      duration: "5 min",
      price: 0.75,
      passenger_id: "2",
      passenger_name: "Manuel"
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataServiceProvider
  ) {}

  ionViewDidLoad() {
    this.spinner = this.dataS.showSpinner(
      undefined,
      "Buscando Carreras Solicitadas"
    );
    this.findLiveRace();
    // this.dataS.getData("races").then(tmpRace=>{this.races = tmpRace;})
  }

  disponibleM() {
    this.dataS.updateStatus(this.disponible);
  }

  findLiveRace() {
    this.races = this.races;
    this.spinner.dismiss();
    // this.dataS.getData("races").then(tmpRace=>{this.races = tmpRace; this.spinner.dismiss();})
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
