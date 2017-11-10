import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
/* import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps"; */
declare var google;

@IonicPage()
@Component({
  selector: "page-race-request",
  templateUrl: "race-request.html"
})
export class RaceRequestPage {
  map: any;
  startRace: any;
  endRace: any;
  // directionsDisplay = new google.maps.DirectionsRenderer();
  // bounds: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation /* ,
    public googleMaps: GoogleMaps */
  ) {}

  ionViewDidLoad() {
    this.createMap();
    // this.getPosicion();
  }

  createMap() {
    this.geolocation
      .getCurrentPosition()
      .then(postion => {
        let latLng = new google.maps.LatLng(
          postion.coords.latitude,
          postion.coords.longitude
        );
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );
        // this.bounds = new google.maps.LatLngBounds();

        let car = '<ion-icon name="car"></ion-icon>';
        this.startRace = new google.maps.Marker({
          position: latLng,
          draggable: true,
          label: {
            text: "Inicio"
          }
        });
        this.addInfoWindow(this.startRace, "<h3>Inicio</h3>");
        this.startRace.setMap(this.map);
        console.log(this.startRace.position.lat());
        // let loc = new google.maps.LatLng(
        //   marker.position.lat(),
        //   marker.position.lng()
      })
      .catch(error => {
        console.log(error);
      });
  }
  addMarker() {
    this.endRace = new google.maps.Marker({
      draggable: true,
      map: this.map,
      label: "Fin",
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    this.addInfoWindow(this.endRace, "<h4>Fin</h4>");
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }
  raceRequest(){
    console.log(this.startRace.position.lat());
    console.log(this.endRace.position.lat());
  }
  /* calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: this.start,
        destination: this.end,
        travelMode: "DRIVING"
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  } */
  raceRequest1(){
    var geocoder = new google.maps.Geocoder();

  }
  getPosicion(): any {
    // let position = Observable.fromPromise(this.geolocation.getCurrentPosition());
    // position.subscribe(pos=>{
    //   console.log(pos);
    // })
    this.geolocation
      .getCurrentPosition()
      .then(response => {
        this.loadMap(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadMap(postion: Geoposition) {
    let latitude = postion.coords.latitude;
    let longitud = postion.coords.longitude;
    console.log(latitude, longitud);

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById("map");
    let myPosition: any = new google.maps.LatLng(latitude, longitud);

    // create CameraPosition
    let position: any = {
      target: myPosition,
      zoom: 18,
      tilt: 30
    };
    this.map = new google.maps.Map(element, position);

    // create LatLng object
    // let myPosition: LatLng = new LatLng(latitude, longitud);

    /*  this.map
      .one(google.maps.MAP_READY)
      .then(() => {
        console.log("Map is ready!");

        // move the map's camera to position
        this.map.moveCamera(position);

        // create new marker
        let markerOptions: any = {
          position: myPosition,
          title: "Inicio Carrera"
        };
        this.map.addMarker(markerOptions);
      })
      .catch(error => {
        console.log("Error con el marcado en google maps");
        console.log(error);
      }); */
  }
}
