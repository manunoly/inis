import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  user = { roll: "cliente", name: "Andres Iniesta", id: 12 };
  races = [
    {
      startdate: "2017-09-21",
      enddate: "2017-09-21",
      starthour: "9:21",
      endhour: "10:50",
      client: "Marvel Regan",
      origin: "Plaza foch",
      destination: "Gaspar Villaroel pasando la gasolinera de la 6",
      price: 4.15,
      passengername: "Mariano Vallejo"
    },
    {
      startdate: "2017-09-22",
      enddate: "2017-09-22",
      starthour: "9:21",
      endhour: "9:50",
      client: "Marvel Regan",
      origin: "Plaza foch",
      destination: "Gaspar Villaroel",
      price: 2.55,
      passengername: "Pedro Godoy"
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListRacePage");
  }
}
