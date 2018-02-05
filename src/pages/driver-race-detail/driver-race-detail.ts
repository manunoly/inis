import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DriverRaceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-driver-race-detail',
  templateUrl: 'driver-race-detail.html',
})

export class DriverRaceDetailPage {
    race: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.race = this.navParams.data.race;
  }

  ionViewDidLoad() {
  }

  goBack(){
    this.navCtrl.pop();
  }
}
