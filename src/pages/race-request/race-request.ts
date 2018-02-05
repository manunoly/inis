import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { DataServiceProvider } from "./../../providers/data-service/data-service";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/timer";
import "rxjs/add/observable/of";
import "rxjs/add/operator/takeUntil";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ConfirmRaceRequestPage } from "./../confirm-race-request/confirm-race-request";
import { ListRaceServicePage } from '../list-race-service/list-race-service';

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
  raceObj = {};
  raceRequest: boolean = false;
  spinner: any;
  driver: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  // directionsDisplay = new google.maps.DirectionsRenderer();
  // bounds: any;
  constructor(
    private alertCtrl: AlertController,
    private dataS: DataServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation /* ,
    public googleMaps: GoogleMaps */ // private ngZone: ngZone
  ) {}

  ionViewDidLoad() {
    if (this.dataS.getUser()) {
      this.spinner = this.dataS.showSpinner();
      this.spinner.present();
      this.createMap();
      this.raceRequest = this.dataS.getRaceRequest();
      if (this.raceRequest) {
        this.driver = this.dataS.getDriverAsigne();
      }
    } else this.navCtrl.push("HomePage");
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
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false
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
        // let loc = new google.maps.LatLng(
        //   marker.position.lat(),
        //   marker.position.lng()
        if (this.spinner) this.spinner.dismiss();
      })
      .catch(error => {
        if (this.spinner) this.spinner.dismiss();
        this.dataS.showNotification(
          "Favor revise su conexión y active su Geolocalización"
        );
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
  raceRequestM() {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.startRace.getPosition()],
        destinations: [this.endRace.getPosition()],
        travelMode: "DRIVING",
        avoidTolls: true
      },
      (response, status) => {
        if (status == "OK") {
          this.raceObj["from"] = response.originAddresses[0];
          this.raceObj["from_latitude"] = this.startRace.getPosition().lat();
          this.raceObj["from_longitude"] = this.startRace.getPosition().lng();
          this.raceObj["to"] = response.destinationAddresses[0];
          this.raceObj["to_latitude"] = this.endRace.getPosition().lat();
          this.raceObj["to_longitude"] = this.endRace.getPosition().lng();
          this.raceObj["distant"] = response.rows[0].elements[0].distance.text;
          this.raceObj["duration"] = response.rows[0].elements[0].duration.text;
          /**
           * TODO: get Price between distant;
           */
          let price = 0.5;
          this.raceObj["price"] =
            Number(this.raceObj["distant"].split(" ", 1)[0].replace(",", ".")) *
            price;
          this.raceObj["passenger_id"] = this.dataS.getUser().id;
          this.raceObj["passenger_name"] = this.dataS.getUser().name;
          let msgConfirm =
            this.raceObj["from"].split(",", 1) +
            " => " +
            this.raceObj["to"].split(",", 1) +
            "<br>" +
            " Precio Estimado " +
            this.raceObj["price"] +
            "<br>" +
            " Distancia " +
            this.raceObj["distant"] +
            " => " +
            this.raceObj["duration"];

          let alert = this.alertCtrl.create({
            title: "Verificar Datos",
            message: msgConfirm,
            // message: JSON.stringify(this.raceObj),
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  this.dataS.showNotification("No ha realizado la Solicitud!");
                }
              },
              {
                text: "Solicitar",
                handler: () => {
                  let spinner = this.dataS.showSpinner();
                  spinner.present();
                  let user = this.dataS.getUser();
                  this.raceObj["client_id"] = user.id;
                  this.raceObj["name"] = user.name;
                  this.raceObj["type"] = "fast";
                  this.raceObj["default"] = 1;
                  this.raceObj["type"] = "fast";
                  this.raceObj["passenger"] = "fast";
                  // console.log(this.raceObj);
                  this.dataS
                    .postData("user-make-reservation", this.raceObj)
                    .then(reserv => {
                      if (reserv !== null) {
                        console.log(reserv);
                      }
                      this.raceRequest = true;
                      this.dataS.setRaceRequest(true);
                      spinner.dismiss();
                      Observable.timer(10000, 20000)
                        .takeUntil(this.destroy$)
                        .subscribe(_ => {
                          console.log("suscrito al observer");
                          this.dataS
                            .getData("reservation/" + reserv)
                            .then(res => {
                              console.log(res);
                              if (
                                "driver_id" in res &&
                                res["driver_id"] !== null
                              ) {
                                // FIXME: no hacer nuevas peticiones si ya tengo el driver
                                console.log("busco el driver");
                                this.dataS
                                  .getData("driver/" + res["driver_id"])
                                  .then(driverResp => {
                                    if (
                                      parseInt(res["status"]) ==
                                        DataServiceProvider.STATUS_FINISHED ||
                                      parseInt(res["status"]) ==
                                        DataServiceProvider.STATUS_CANCELED ||
                                      parseInt(res["status"]) ==
                                        DataServiceProvider.STATUS_REJECTED
                                    ) {
                                      this.destroy$.next(true);
                                      this.destroy$.unsubscribe();
                                      this.driver = null;
                                      this.dataS.setDriverAsigne(this.driver);
                                      this.dataS.setLiveRace(null);
                                      this.raceRequest = false;
                                      this.dataS.setRaceRequest(false);
                                      this.dataS.showNotification(
                                        "Su Carrera ha sido " +
                                          this.dataS.getTextStatus(
                                            res["status"]
                                          )
                                      );

                                    }
                                    if (this.driver === undefined) {
                                      this.driver = driverResp;
                                      this.dataS.setDriverAsigne(this.driver);
                                      this.dataS.setLiveRace(res);
                                      this.dataS.showNotification(
                                        driverResp["name"] +
                                          " ha sido asignada!"
                                      );
                                    }
                                  })
                                  .catch(error => {
                                    this.dataS.showNotification(
                                      "Ha ocurrido un error inesperado."
                                    );
                                    console.log(error);
                                  });
                              }
                            })
                            .catch(error => {
                              this.dataS.showNotification(
                                "Ha ocurrido un error inesperado en la reservación."
                              );
                              console.log(error);
                            });
                        });
                    })
                    .catch(error => {
                      this.dataS.showNotification(
                        "Ha ocurrido un error inesperado."
                      );
                      console.log(error);
                    });
                }
              }
            ]
          });
          alert.present();
        } else
          this.dataS.showNotification(
            "Error al conectar con Google Maps" + status
          );
      }
    );

    // let startRaceStreet = this.getStreetAddres(this.startRace);
    // let endRaceStreet = this.getStreetAddres(this.endRace);
    // let objRaceRequest = {};
    // this.dataS.postData("reserver", {});
  }

  raceDetail() {
    this.navCtrl.push(ConfirmRaceRequestPage, {
      race: this.dataS.getLiveRace()
    });
  }

  getStreetAddres(marker) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: marker.getPosition() }, (results, status) => {
      if (status === "OK") {
        return results[0].formatted_address;
      }
    });
    return;
  }
}
