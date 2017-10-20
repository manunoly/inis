import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
  fav: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  displayName = "Visitante";
  picture = "assets/icon/favicon.ico";
  userProfile: any;
  rootPage: any = "HomePage";
  // rootPage: any = "NavegarPage";
  small: boolean = true;
  // rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  user = {roll:"cliente", name:"Andres Iniesta", id:12};
  driver = {roll:"chofer", name:"Marc Andre T", id:11};
  clientPages: PageInterface[] = [
    {
      title: "Inicio",
      pageName: "HomePage",
      icon: "home",
      fav: false
    }, { title: "Solicitar Carrera", pageName: "RaceRequestPage", icon: "car", fav: false },
    { title: "Mis Solicitudes", pageName: "ListRaceServicePage", icon: "calendar", fav: false }
  ];

    driverPages: PageInterface[] = [
    {
      title: "Inicio",
      pageName: "HomePage",
      icon: "home",
      fav: false
    },
    { title: "Mis Carreras", pageName: "ListRacePage", icon: "calendar", fav: false }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

    loginUser(){
   console.log("LoginPage");
  }

  signOut() {
    console.log("this.authS.logout()");
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

