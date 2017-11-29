import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DriverRaceDetailPage } from './../driver-race-detail/driver-race-detail';
/**
 * Generated class for the ListRacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-list-race",
  templateUrl: "list-race.html"
})
export class ListRacePage {
  user = { type: "client", name: "Andres Iniesta", id: 12 };
  races = [
    {
      id: 1,
      startdate: "2017-09-21",
      enddate: "2017-09-21",
      starthour: "9:21",
      endhour: "10:50",
      client: "Mariano Vallejo",
      driver: "Andres Iniesta",
      origin: "Plaza foch",
      destination: "Gaspar Villaroel pasando la gasolinera de la 6",
      price: 4.15,
      start : 5
    },
    {
      id: 2,
      startdate: "2017-09-22",
      enddate: "2017-09-22",
      starthour: "9:21",
      endhour: "9:50",
      client: "Marvel Regan",
      driver: "Andres Iniesta",
      origin: "Plaza foch",
      destination: "Gaspar Villaroel",
      price: 2.55,
      start : 5
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListRacePage");
  }
  raceDetail(id:number){
    this.races.forEach(race => {
      if(race.id == id){
        this.navCtrl.push(DriverRaceDetailPage, {
          race: race
        });
      }
    });
  }
}
