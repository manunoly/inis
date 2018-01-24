import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDriverPage } from './home-driver';

@NgModule({
  declarations: [
    HomeDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDriverPage),
  ],
})
export class HomeDriverPageModule {}
