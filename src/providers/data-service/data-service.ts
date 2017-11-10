import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from "@angular/http";
import {
  Platform,
  ModalController,
  AlertController,
  ToastController,
  Events
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

@Injectable()
export class DataServiceProvider {
  user: any;
  stars = [];
  unknowPostion = true;
  postion: any;
  status = "";
  public static readonly SERVER = "http://localhost:8000/api/";
  // parameter: ReplaySubject<string> = new ReplaySubject<string>(1);
  races = [
    {
      id_race: 1,
      startdate: "2017-09-21",
      enddate: "2017-09-21",
      starthour: "9:21",
      endhour: "10:50",
      client: "Mariano Vallejo",
      id_client: 12,
      driver: "Andres Iniesta",
      id_driver: 90,
      origin: "Plaza foch",
      destination: "Gaspar Villaroel pasando la gasolinera de la 6",
      price: 4.15,
      star: 5
    },
    {
      id_race: 3,
      startdate: "2017-09-21",
      enddate: "2017-09-21",
      starthour: "9:25",
      endhour: "10:50",
      client: "Mariano Vallejo",
      id_client: 12,
      driver: "Ricardo Pablo",
      id_driver: 91,
      origin: "Plaza foch",
      destination: "gasolinera de la 6",
      price: 4.05,
      star: 4
    },
    {
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
    }
  ];
  constructor(
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController,
    public events: Events,
    public geolocation: Geolocation
  ) {
    this.getUserLocalStorage().then(userD => {
      this.user = userD;
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
        if (user) this.showNotification("Bienvenido", 3000, false);
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

  getData(url) {
    let headers = new Headers({
      Authorization: this.getUserLocalToken(),
      "Content-Type": "application/json, charset=UTF-8"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(DataServiceProvider.SERVER + url, options).toPromise();
  }

  postData(url = null, params: any) {
    let headers = new Headers({
      Authorization: this.getUserLocalToken(),
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(DataServiceProvider.SERVER + url, params, options)
      .toPromise();
  }

  getRace() {
    return this.races;
  }

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
    this.races.forEach(race => {
      if (race.id_race == id) {
        return tmpRace;
      }
    });
    return tmpRace;
  }

  getRaceByClient(id: number) {
    let tmpRace = [];
    this.races.forEach(race => {
      if (race.id_client == id) {
        tmpRace.push(race);
      }
    });
    return tmpRace;
  }

  getRaceByDriver(id: number) {
    let tmpRace = [];
    this.races.forEach(race => {
      if (race.id_driver == id) {
        tmpRace.push(race);
      }
    });
    return tmpRace;
  }

  updateStatus(status = true) {
    if (!status) this.status = "Ocupado";
    else this.status = "Disponible";
    this.updatePostionStatus();
  }

  updatePostionStatus() {
    if (this.user && this.postion) {
      let objPostionStatus: any;
      if (this.user.roll == "chofer") {
        objPostionStatus = {
          id: this.user.id,
          latitude: this.postion.coords.latitude,
          longitude: this.postion.coords.longitude,
          status: this.status
        };
      } else {
        objPostionStatus = {
          id: this.user.id,
          latitude: this.postion.coords.latitude,
          longitude: this.postion.coords.longitude
        };
      }
      console.log(objPostionStatus);
      // this.postData("postion", objPostionStatus);
    }
  }

  subscribePostion() {
    if (this.unknowPostion)
      Observable.timer(3000, 60000).subscribe(_ => {
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

  showNotification(message, time = 3000, pageChance = true) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: "top",
      // cssClass: "text-center toastStyle",
      dismissOnPageChange: pageChance
    });
    toast.present();
  }

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
}
