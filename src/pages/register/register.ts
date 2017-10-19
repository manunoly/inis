import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  roll="client";
  private client : FormGroup;
  private driver : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
      this.driver = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
      this.client = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  newClient(){
    console.log("cliente")
  }

}
