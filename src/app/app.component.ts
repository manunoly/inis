import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ModalController, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { Storage } from "@ionic/storage";
import { DataServiceProvider } from "./../providers/data-service/data-service";
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
  fav: boolean;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "HomePage";
  // rootPage: any = "NavegarPage";
  @ViewChild(Nav) nav: Nav;
  user: any;

  clientPages: PageInterface[] = [
    {
      title: "Inicio",
      pageName: "HomePage",
      icon: "home",
      fav: false
    },
    {
      title: "Solicitar Carrera",
      pageName: "RaceRequestPage",
      icon: "car",
      fav: false
    },
    {
      title: "Mis Solicitudes",
      pageName: "ListRaceServicePage",
      icon: "calendar",
      fav: false
    },
    {
      title: "Datos Personales",
      pageName: "EditProfilePage",
      icon: "person",
      fav: false
    }
  ];

  driverPages: PageInterface[] = [
    {
      title: "Inicio",
      pageName: "HomePage",
      icon: "home",
      fav: false
    },
    {
      title: "Carreras Demandadas",
      pageName: "LiveRaceRequestPage",
      icon: "car",
      fav: false
    },

    {
      title: "Mis Carreras",
      pageName: "ListRacePage",
      icon: "calendar",
      fav: false
    },
    {
      title: "Datos Personales",
      pageName: "EditProfilePage",
      icon: "person",
      fav: false
    }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage,
    public events: Events,
    public dataS: DataServiceProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkUser();
      this.dataS.getUserLocalStorage().then(userD => {
        this.user = userD;
        this.userStatus();
      });
    });
  }

  checkUser() {
    this.events.subscribe("user:changeStatus", () => {
      this.dataS.getUserLocalStorage().then(userD => {
        this.user = userD;
        this.nav.setRoot("HomePage");
        this.userStatus();
      });
    });
    // this.events.publish("user:changeStatus");
  }

  userStatus() {
    if (this.user) {
      if (this.user.type == "Chofer") this.dataS.updateStatus();
      else this.dataS.updateStatus(false);
    }
  }
  loginUser() {
    console.log("LoginPage");
  }

  signOut() {
    this.dataS.setUserLocalData();
    console.log("logout");
  }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      if (page.pageName) this.nav.setRoot(page.pageName, params);
      else this.nav.setRoot("HomePage");
      // else this.nav.setRoot("NavegarPage");
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];
    if (childNav) {
      if (
        childNav.getSelected() &&
        childNav.getSelected().root === page.tabComponent
      ) {
        return "primary";
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return "primary";
    }
    return;
  }
}
