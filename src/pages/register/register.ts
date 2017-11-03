import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { DataServiceProvider } from "./../../providers/data-service/data-service";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  roll = "client";
  submitF = false;
  private client: FormGroup;
  private driver: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.client = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      password1: ["", Validators.required]
    });
    this.driver = this.formBuilder.group({
      driverName: ["", Validators.required],
      driverPhone: ["", Validators.required],
      driverEmail: ["", Validators.required],
      driverPassword: ["", Validators.required],
      driverPassword1: ["", Validators.required],
      driverCar: ["", Validators.required],
      driverCarYear: ["", Validators.required],
      driverCapacity: ["", Validators.required],
      driverComodidades: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  newClient() {
    this.submitF = true;
    console.log(this.client.value);
  }
  newDriver() {
    this.submitF = true;
    console.log(this.driver.value);
  }
}
