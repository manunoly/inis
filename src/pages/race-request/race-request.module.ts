import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RaceRequestPage } from './race-request';

@NgModule({
  declarations: [
    RaceRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(RaceRequestPage),
  ],
})
export class RaceRequestPageModule {}
