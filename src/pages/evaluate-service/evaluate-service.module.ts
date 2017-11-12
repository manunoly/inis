import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluateServicePage } from './evaluate-service';

@NgModule({
  declarations: [
    EvaluateServicePage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluateServicePage),
  ],
})
export class EvaluateServicePageModule {}
