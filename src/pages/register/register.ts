import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { DataServiceProvider } from "./../../providers/data-service/data-service";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  type = "client";
  submitF = false;
  msg = "";
  private client: FormGroup;
  private driver: FormGroup;
  constructor(
    private dataS: DataServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public plt: Platform
  ) {
    let os = "web";
    if (this.plt.is("ios")) os = "ios";
    if (this.plt.is("android")) os = "android";
    this.client = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email_address: ["", Validators.required],
      password: ["", Validators.required],
      password1: ["", Validators.required],
      type: ["Cliente"],
      os: [os]
    });
    this.driver = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email_address: ["", Validators.required],
      password: ["", Validators.required],
      driverPassword1: ["", Validators.required],
      marca: ["", Validators.required],
      modelo: ["", Validators.required],
      capacity: ["", Validators.required],
      facilities: ["", Validators.required],
      type: ["Chofer"],
      os: [os]
    });
  }

  ionViewDidLoad() {}

  newClient() {
    let spinner = this.dataS.showSpinner();
    spinner.present();
    this.dataS.postData("user", this.client.value).then(res => {
      setTimeout(() => {}, 5000);
      console.log(res);
      if (res) this.submitF = true;
      spinner.dismiss();
    }).catch(error => {
      if (error.statusText) this.msg = error.statusText;
       this.submitF = true;
      setTimeout(() => {
        this.msg = "";
      }, 5000);
      console.log(error);
    });
  }
  newDriver() {
    let spinner = this.dataS.showSpinner();
    spinner.present();
    this.dataS.postData("driver", this.driver.value).then(res => {
      setTimeout(() => {}, 5000);
      console.log("respuesta");
      console.log(res);
      if (res) this.submitF = true;
      spinner.dismiss();
    }).catch(error => {
      if (error.statusText) this.msg = error.statusText;
       this.submitF = true;
      setTimeout(() => {
        this.msg = "";
      }, 5000);
      console.log(error);
    });
  }
}
