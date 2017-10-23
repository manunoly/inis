import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientRaceDetailPage } from './client-race-detail';

@NgModule({
  declarations: [
    ClientRaceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientRaceDetailPage),
  ],
})
export class ClientRaceDetailPageModule {}
