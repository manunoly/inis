import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverRaceDetailPage } from './driver-race-detail';

@NgModule({
  declarations: [
    DriverRaceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverRaceDetailPage),
  ],
})
export class DriverRaceDetailPageModule {}
