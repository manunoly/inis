import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-reset-password",
  templateUrl: "reset-password.html"
})
export class ResetPasswordPage {
  private resetPasswordF: FormGroup;
  submitF = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.resetPasswordF = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(5),
          Validators.email,
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ResetPasswordPage");
  }

  resetPassword(){
    this.submitF = true;
    console.log(this.resetPasswordF.value);
  }
}
