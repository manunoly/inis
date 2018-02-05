// import { HomeUserPage } from "./../home-user/home-user";
import { ConfirmRaceRequestPage } from "./../confirm-race-request/confirm-race-request";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DataServiceProvider } from "./../../providers/data-service/data-service";
import { AlertController } from "ionic-angular";

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
  disponible: boolean;
  races: any;
  liveRace: any;
  liveClient: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataServiceProvider,
    private alertCtrl: AlertController
  ) {}
  ionViewDidLoad() {
    if (!this.dataS.getUser()) this.navCtrl.push("HomePage");
    else {
      if (
        this.dataS.getLiveRace() !== undefined &&
        "id" in this.dataS.getLiveRace()
      ) {
        this.liveRace = this.dataS.getLiveRace();
        this.liveClient = this.dataS.getLiveClient();
      } else {
        this.findLiveRace();
        this.dataS
          .getStatusFromDatabase()
          .then(res => {
            let status = res["status"];
            this.disponible = status == 4 ? false : true;
            this.dataS.setStatus(this.disponible);
          })
          .catch(error => {
            this.dataS.showNotification("Error obtniendo estado");
            return (this.disponible = true);
          });
      }

      /*     .then(res => {
          let numberStatus = this.dataS.getStatus();
          this.disponible = numberStatus == 4 ? false : true;
        })
        .catch(error => {
          this.disponible = true;
          console.log("error tomando status de la BD");
        });*/
    }
  }

  disponibleM() {
    this.dataS.setStatus(this.disponible);
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
    let alert = this.alertCtrl.create({
      title: "Confirmar",
      message: "Por Favor Confirme Asignación",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            this.dataS.showNotification("No realizó confirmación");
          }
        },
        {
          text: "Asignar",
          handler: () => {
            let data = {
              id: id_race,
              driver_id: this.dataS.getUser().id,
              client_id: client_id
            };
            let spinner = this.dataS.showSpinner(15000, "Asignando Carrera");
            spinner.present();
            // TODO: Test accion if race is already asigne
            this.dataS
              .putData("driver-accept-reservations/" + id_race, data)
              .then(res => {
                this.dataS
                  .getData("user/" + res["client_id"])
                  .then(client => {
                    this.dataS.setStatus(false);
                    this.disponible = false;
                    this.dataS.setLiveRace(res);
                    this.dataS.setLiveClient(client);
                    this.liveRace = res;
                    this.liveClient = client;
                    spinner.dismiss();
                    this.dataS.showNotification("Carrera Asignada");
                  })
                  .catch(error => {
                    console.log(error);
                    this.dataS.showNotification("No se realizó la asignación");
                  });
              })
              .catch(error => {
                console.log(error);
                this.dataS.showNotification("No se realizó la asignación");
              });
          }
        }
      ]
    });
    alert.present();
  }
  startRace(liveRace) {
    this.dataS
      .putData("reservation/" + liveRace.id, {
        id: liveRace.id,
        status: DataServiceProvider.STATUS_STARTED,
        driver_id: liveRace.driver_id
      })
      .then(respRace => {
        console.log(respRace);
        this.liveRace = respRace;
        this.dataS.setLiveRace(respRace);
        this.dataS.showNotification("Carrera Iniciada");
      })
      .catch(error => {
        console.log(error);
        this.dataS.showNotification("Ha ocurrido un error");
      });
  }
  cancelRace(liveRace) {
    this.dataS
      .putData("reservation/" + liveRace.id, {
        id: liveRace.id,
        status: DataServiceProvider.STATUS_CANCELED,
        driver_id: liveRace.driver_id,
        client_id: this.liveClient.id
      })
      .then(respRace => {
        this.liveRace = undefined;
        this.liveClient = undefined;
        this.disponible = true;
        this.dataS.setLiveRace(undefined);
        this.dataS.setLiveClient(undefined);
        this.dataS.setStatus(true);
        this.dataS.showNotification("Carrera Cancelada");
        this.findLiveRace();
      })
      .catch(error => {
        this.dataS.showNotification("Ha ocurrido un error");
        console.log(error);
      });
  }
  finishRace(liveRace) {
    this.dataS
      .putData("reservation/" + liveRace.id, {
        id: liveRace.id,
        status: DataServiceProvider.STATUS_FINISHED,
        driver_id: liveRace.driver_id
      })
      .then(respRace => {
        console.log("Carrera Terminada");
        this.liveRace = undefined;
        this.liveClient = undefined;
        this.disponible = true;
        this.dataS.setLiveRace(undefined);
        this.dataS.setLiveClient(undefined);
        this.dataS.setStatus(true);
        this.dataS.showNotification("Carrera Terminada");
        this.findLiveRace();
      })
      .catch(error => {
        this.dataS.showNotification("Ha ocurrido un error");
        console.log(error);
      });
  }

  getRaceStatus(raceStatus) {
    return this.dataS.getTextStatus(raceStatus);
  }

  colorClass(status) {
    return "style" + status;
  }
}
