import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveRaceRequestPage } from './live-race-request';

@NgModule({
  declarations: [
    LiveRaceRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveRaceRequestPage),
  ],
})
export class LiveRaceRequestPageModule {}
