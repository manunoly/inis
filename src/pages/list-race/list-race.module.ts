import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListRacePage } from './list-race';

@NgModule({
  declarations: [
    ListRacePage,
  ],
  imports: [
    IonicPageModule.forChild(ListRacePage),
  ],
})
export class ListRacePageModule {}
