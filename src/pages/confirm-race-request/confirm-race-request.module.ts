import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmRaceRequestPage } from './confirm-race-request';

@NgModule({
  declarations: [
    ConfirmRaceRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmRaceRequestPage),
  ],
})
export class ConfirmRaceRequestPageModule {}
