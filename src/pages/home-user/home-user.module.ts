import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeUserPage } from './home-user';

@NgModule({
  declarations: [
    HomeUserPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeUserPage),
  ],
})
export class HomeUserPageModule {}
