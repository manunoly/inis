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
  type = "client";
  submitF = false;
  private client: FormGroup;
  private driver: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private dataS: DataServiceProvider
  ) {
    this.dataS
    .getData("driver/1")
    .then(res => {
      console.log(res);
      // this.setUserForm(res);
    })
    .catch(error => {
      if (error.statusText) this.dataS.showNotification(error.statusText);
      console.log(error);
    });
    this.client = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email_address: ["", Validators.required],
      password: [""]
    });
    this.driver = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email_address: ["", Validators.required],
      password: [""],
      marca: ["", Validators.required],
      driverCarYear: ["", Validators.required],
      modelo: ["", Validators.required],
      capacity: ["", Validators.required],
      facilities: ["", Validators.required]
    });
    let userD = this.dataS.getUser();
    if (userD) {
      if (userD.type == "client") this.setUserForm(userD);
      else if (userD.type == "driver") {
        // let spinner = this.dataS.showSpinner();
        // spinner.present();
        this.dataS
          .getData("driver/" + userD.id)
          .then(res => {
            console.log(res);
            // this.setUserForm(res);
          })
          .catch(error => {
            if (error.statusText) this.dataS.showNotification(error.statusText);
            console.log(error);
          });
      }
    } else {
      this.setUserForm({ type: "client" });
      this.navCtrl.push("HomePage");
    }
  }

  ionViewDidLoad() {}

  setUserForm(user) {
    if (user) {
      this.type = user.type;
      if (user.type == "client") {
        this.client = this.formBuilder.group({
          name: [user.name, Validators.required],
          phone: [user.phone, Validators.required],
          email_address: [user.email_address, Validators.required],
          password: [""]
        });
        this.driver = this.formBuilder.group({
          name: ["", Validators.required],
          phone: ["", Validators.required],
          email_address: ["", Validators.required],
          password: [""],
          marca: ["", Validators.required],
          driverCarYear: ["", Validators.required],
          modelo: ["", Validators.required],
          capacity: ["", Validators.required],
          facilities: ["", Validators.required]
        });
      } else if (user.type == "driver") {
        this.driver = this.formBuilder.group({
          driverName: [user.name, Validators.required],
          driverPhone: [user.phone, Validators.required],
          driverEmail: [user.email_address, Validators.required],
          driverPassword: ["", Validators.required],
          marca: [user.marca, Validators.required],
          modelo: [user.modelo, Validators.required],
          capacity: [user.capacity, Validators.required],
          facilities: [user.facilities, Validators.required]
        });
        this.client = this.formBuilder.group({
          name: ["", Validators.required],
          phone: ["", Validators.required],
          email_address: ["", Validators.required],
          password: [""]
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
