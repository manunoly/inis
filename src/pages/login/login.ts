import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    private login : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  this.login = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  logForm(){
    console.log(this.login.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
