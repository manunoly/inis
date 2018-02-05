import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {
  ToastController,
  Events,
  LoadingController
} from "ionic-angular";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/timer";
import { Observable } from "rxjs/Observable";
// import { ReplaySubject } from "rxjs/ReplaySubject";
// import { Storage } from "@ionic/storage";
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/fromPromise';
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation";
// import { elementDef } from "@angular/core/src/view/element";

@Injectable()
export class DataServiceProvider {
  user: any;
  stars = [];
  unknowPostion = true;
  postion: any;
  status: number;
  objPostionObservable: any;
  raceRequest: boolean = false;
  liveDriver: any;
  liveRace: any;
  liveClient: any;
  // public static readonly SERVER = "http://localhost/";
  public static readonly SERVER = "http://172.16.10.162:4500/api/";
  public static readonly STATUS_PENDING = 1;
  public static readonly STATUS_ACEPTED = 2;
  public static readonly STATUS_REJECTED = 3;
  public static readonly STATUS_CANCELED = 4;
  public static readonly STATUS_STARTED = 5;
  public static readonly STATUS_FINISHED = 6;
  public static readonly TRAVEL_FAST = "fast";
  public static readonly RESERV = "reserv";

  constructor(
    private http: HttpClient,
    public storage: Storage,
    public toastCtrl: ToastController,
    public events: Events,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController
  ) {
    this.getUserLocalStorage().then(userD => {
      this.user = userD;
      this.storage
        .get("token")
        .then(token => {
          if (token) this.user["token"] = token;
        })
        .catch(_ => {});
    });
  }
  logOut() {
    this.setUserLocalData();
  }

  private setUserLocal(user = null) {
    this.storage
      .set("user", user)
      .then(_ => {
        this.user = user;
        this.events.publish("user:changeStatus");
        if (user) {
          this.storage
            .get("token")
            .then(token => {
              this.user["token"] = token;
            })
            .catch(_ => {});
          this.showNotification("Bienvenido", 3000, false);
        } else {
          this.unknowPostion = true;
        }
      })
      .catch(error => {
        this.showNotification("Ha ocurrido un error" + error);
      });
  }

  setUserLocalData(token = null) {
    this.storage
      .set("token", token)
      .then(_ => {
        if (token) this.setUserLocal(this.parseJwt(token));
        else this.setUserLocal();
      })
      .catch(error => console.log(error));
  }

  getUser() {
    if (this.user) return this.user;
    return null;
  }

  getUserLocalStorage() {
    return this.storage
      .get("user")
      .then(userData => {
        return userData;
      })
      .catch(error => {
        return "Ha ocurrido un error" + error;
      });
  }

  getUserLocalToken() {
    return this.storage
      .get("token")
      .then(token => {
        if (token) return token;
        return null;
      })
      .catch(error => {
        console.log("error leyendo el token" + error);
        this.showNotification("Ha ocurrido un error inesperado!" + error);
        return null;
      });
  }

  getData(url = null) {
    let token = "";
    if (this.user && this.user.token != null) token = this.user.token;
    else {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          return "{status:401, statusText:'Usted no esta identificado'}";
        });
      });
    }
    return this.http
      .get(DataServiceProvider.SERVER + url, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: token
        })
      })
      .toPromise();
  }

  postData(url = null, params: any) {
    let token = "";
    if (this.user && this.user.token != null) token = this.user.token;
    return this.http
      .post(DataServiceProvider.SERVER + url, params, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: token
        })
      })
      .toPromise();
  }

  putData(url = null, params: any) {
    let token = "";
    if (this.user && this.user.token != null) token = this.user.token;
    else {
      return new Promise(function(resolve, reject) {
        return "{status:401, statusText:'Usted No esta Identificado'}";
      });
    }
    return this.http
      .put(DataServiceProvider.SERVER + url, params, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: token
        })
      })
      .toPromise();
  }

  getRace() {}

  getSingleRaceByID(id) {
    let tmpRace = {
      id_race: 2,
      startdate: "2017-09-22",
      enddate: "2017-09-22",
      starthour: "9:21",
      endhour: "9:50",
      client: "Marvel Regan",
      id_client: 12,
      driver: "Andres Iniesta",
      id_driver: 90,
      origin: "Plaza foch",
      destination: "Gaspar Villaroel",
      price: 2.55,
      star: 5
    };
    return tmpRace;
  }

  getRaceByClient(id: number) {
    let tmpRace = [];
    return tmpRace;
  }

  getRaceByDriver(id: number) {
    let tmpRace = [];
    return tmpRace;
  }

  getStatus() {
    return this.status;
  }

  getStatusFromDatabase(): Promise<any> {
    return this.getData("driver/" + this.user.id);
  }

  setStatus(status = true) {
    if (!status) this.status = 4;
    else this.status = 3;
    this.updatePostionStatus(true);
  }

  updatePostionStatus(status = false) {
    if (this.user && this.postion && this.user.type == "driver") {
      let objPostionStatus = {
        id: this.user.id,
        latitude: this.postion.coords.latitude,
        longitude: this.postion.coords.longitude
      };
      if (status) {
        objPostionStatus["status"] = this.status;
      }
      this.putData("driver/" + this.user.id, objPostionStatus)
        .then(res => {
          console.log("updatepos");
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getRaceRequest() {
    return this.raceRequest;
  }

  getDriverAsigne() {
    return this.liveDriver;
  }

  setDriverAsigne(driver) {
    this.liveDriver = driver;
  }

  getLiveRace() {
    return this.liveRace;
  }

  setLiveRace(race) {
    this.liveRace = race;
  }

  getLiveClient() {
    return this.liveClient;
  }

  setLiveClient(client) {
    this.liveClient = client;
  }

  getTextStatus(status) {
    switch (parseInt(status)) {
      case DataServiceProvider.STATUS_ACEPTED: {
        return "Aceptada";
      }
      case DataServiceProvider.STATUS_CANCELED: {
        return "Cancelada";
      }
      case DataServiceProvider.STATUS_FINISHED: {
        return "Terminada";
      }
      case DataServiceProvider.STATUS_REJECTED: {
        return "Rechazada";
      }
      case DataServiceProvider.STATUS_STARTED: {
        return "Iniciada";
      }
      case DataServiceProvider.STATUS_PENDING: {
        return "Pendiente";
      }
      default: {
        return "Desconocido";
      }
    }
  }

  setRaceRequest(raceRequest = false) {
    this.raceRequest = raceRequest;
  }

  subscribePostion() {
    if (this.unknowPostion && this.user && this.user.type == "driver") {
      this.objPostionObservable = Observable.timer(3000, 60000);
      this.objPostionObservable.subscribe(_ => {
        this.geolocation
          .getCurrentPosition()
          .then(postion => {
            this.unknowPostion = false;
            this.postion = postion;
            this.updatePostionStatus();
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }

  showNotification(message, time = 5000, pageChance = true) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: "top",
      // cssClass: "text-center toastStyle",
      dismissOnPageChange: pageChance
    });
    toast.present();
  }

  showSpinner(time = 10000, msg = "") {
    let contenido =
      '<img style="height: 50%" alt="Inis-Taxi" src="assets/img/logo-inis.png"/> <div style="text-align: center; vertical-align: middle;">' +
      msg +
      "</div>";
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: contenido,
      duration: time
    });

    return loading;
  }

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
}
