import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DataServiceProvider } from "./../../providers/data-service/data-service";

@IonicPage()
@Component({
  selector: "page-race-rate",
  templateUrl: "race-rate.html"
})
export class RaceRatePage {
  // clicked: EventEmitter<number> = new EventEmitter<number>();
  stars: string[] = [];
  rate = 0;
  race: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataServiceProvider
  ) {}

  ionViewDidLoad() {
    this.race = this.navParams.data.race;
    this.calc();
  }

  calc(numberStar = 0) {
    setTimeout(() => {
      this.stars = [];
      let i = 0;
      this.rate = 0;
      while (i < 5) {
        if (numberStar > i) {
          this.stars.push("star");
          this.rate = this.rate + 1;
        } else this.stars.push("star-outline");
        i = i + 1;
      }
    }, 0);
  }

  starClicked(i) {
    this.calc(i + 1);
  }

  raceRate() {
    this.dataS
      .putData("reservation/" + this.race.id, {
        rating: this.rate,
        id: this.race.id,
        driver_id: this.race.driver_id
      })
      .then(resp => {
        this.dataS.showNotification("Carrera valorada");
        setTimeout(() => {
          this.navCtrl.pop();
        }, 1000);
      })
      .catch(error => {
        this.dataS.showNotification("Ha ocurrido un error");
      });
  }
}
