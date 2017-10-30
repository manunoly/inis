import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import {
  Platform,
  ModalController,
  AlertController,
  ToastController
} from "ionic-angular";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
// import { ReplaySubject } from "rxjs/ReplaySubject";
// import { Storage } from "@ionic/storage";
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/fromPromise';

@Injectable()
export class DataServiceProvider {
  stars = [];
  public static readonly SERVER = "http://localhost/";
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
  constructor(public http: Http, public toastCtrl: ToastController) {
    // this.storage.get("user").then(param => {
    //   if (param) {
    //     this.parameter.next(param);
    //   } else {
    //     console.log("1 error parameter user data service");
    //   }
    //   console.log("2 error parameter user data service");
    // });
  }
  postData(url = null, params: any) {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http
      .post(DataServiceProvider.SERVER + url, {email:"Asdfsd@asd"})
      .toPromise()
      .then(data => {
        console.log("en el then");
        console.log(data);
      })
      .catch(error => {
        console.log("en el error");
      });

    // .subscribe(
    //   data => {
    //     console.log("Get post Response");
    //     console.log(data);
    //   },
    //   err => {
    //     console.log("Error Response");
    //     console.log(err);
    //   },
    //   () => {
    //     console.log("Default Response");
    //   }
    // );
  }

  autenticated(loginForm) {
    return this.http
      .post(
        "http://localhost/autenticated.php",
        JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        })
      )
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
}
