import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html',
})
export class HomeUserPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUserPage');
  }

  goTo(page){
    this.navCtrl.setRoot(page);
  }

}
