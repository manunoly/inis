import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ClientRaceDetailPage } from "./../client-race-detail/client-race-detail";
import { DataServiceProvider } from "./../../providers/data-service/data-service";
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataServiceProvider
  ) {
    this.races = this.dataService.getRaceByClient(12);
    this.rateCalculate();
  }

  ionViewDidLoad() {}

  raceDetail(id) {
    let raceTmp = this.dataService.getSingleRaceByID(id);
    if (raceTmp) {
      this.navCtrl.push(ClientRaceDetailPage, {
        race: raceTmp
      });
    }
  }

  rateCalculate(numberStar = 0) {
    setTimeout(() => {
      this.stars = [];
      let i = 0;
      while (i < 5) {
        if (numberStar > i) this.stars.push("star");
        else this.stars.push("star-outline");
        i = i + 1;
      }
    }, 0);
  }

  starClicked(i) {
    this.rateCalculate(i);
  }
}
