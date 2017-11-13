import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { DataServiceProvider } from "./../../providers/data-service/data-service";

@IonicPage()
@Component({
  selector: "page-edit-profile",
  templateUrl: "edit-profile.html"
})
export class EditProfilePage {
  roll = "cliente";
  submitF = false;
  private client: FormGroup;
  private driver: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private dataS: DataServiceProvider
  ) {
    let userD = this.dataS.getUser();
    if (userD) {
      this.setUserForm(userD);
    } else {
      this.setUserForm({ roll: "cliente" });
      this.navCtrl.push("HomePage");
    }
  }

  ionViewDidLoad() {}

  setUserForm(user) {
    if (user) {
      this.roll = user.roll;
      if (user.roll == "cliente") {
        this.client = this.formBuilder.group({
          name: [user.name, Validators.required],
          phone: [user.phone, Validators.required],
          email: [user.email_address, Validators.required],
          password: ["", Validators.required]
        });
        this.driver = this.formBuilder.group({
          driverName: ["", Validators.required],
          driverPhone: ["", Validators.required],
          driverEmail: ["", Validators.required],
          driverPassword: ["", Validators.required],
          driverCar: ["", Validators.required],
          driverCarYear: ["", Validators.required],
          driverCapacity: ["", Validators.required],
          driverComodidades: ["", Validators.required]
        });
      } else if (user.roll == "chofer") {
        this.driver = this.formBuilder.group({
          driverName: [user.name, Validators.required],
          driverPhone: [user.phone, Validators.required],
          driverEmail: [user.email_address, Validators.required],
          driverPassword: ["", Validators.required],
          driverCar: [user.marca, Validators.required],
          driverCarYear: [user.modelo, Validators.required],
          driverCapacity: [user.capacity, Validators.required],
          driverComodidades: [user.facilities, Validators.required]
        });
        this.client = this.formBuilder.group({
          name: ["", Validators.required],
          phone: ["", Validators.required],
          email: ["", Validators.required],
          password: ["", Validators.required]
        });
      }
    }
  }

  updateClient() {
    console.log(this.client.value);
  }

  updateDriver() {
    console.log(this.driver.value);
  }
}
