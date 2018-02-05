import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RaceRatePage } from './race-rate';

@NgModule({
  declarations: [
    RaceRatePage,
  ],
  imports: [
    IonicPageModule.forChild(RaceRatePage),
  ],
})
export class RaceRatePageModule {}
