import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ConfirmRaceRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

// @IonicPage()
@Component({
  selector: "page-confirm-race-request",
  templateUrl: "confirm-race-request.html"
})
export class ConfirmRaceRequestPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    let race = this.navParams.data.race;
    let mapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false
    };
    let fromRace = new google.maps.LatLng(race.from_latitude, race.from_longitude);
    let toRace = new google.maps.LatLng(race.to_latitude, race.to_longitude);
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.addMarker(map, "Fin", toRace);
    this.addMarker(map, "Inicio", fromRace);
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(fromRace);
    bounds.extend(toRace);
    map.fitBounds(bounds);
  }

  addMarker(map, label, pos) {
    new google.maps.Marker({
      draggable: false,
      position: pos,
      map: map,
      label: label
    });
  }

  goBack() {
    this.navCtrl.pop();
  }
}
