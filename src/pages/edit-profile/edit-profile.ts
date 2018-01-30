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
  msg = "";
  private client: FormGroup;
  private driver: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private dataS: DataServiceProvider
  ) {
    this.client = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      // password: [""],
      email_address: ["", Validators.required]
    });
    this.driver = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email_address: ["", Validators.required],
      // password: [""],
      marca: ["", Validators.required],
      driverCarYear: ["", Validators.required],
      modelo: ["", Validators.required],
      capacity: ["", Validators.required],
      facilities: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    let userD = this.dataS.getUser();
    if (userD) {
      if (userD.type == "client")
      {
        let spinner = this.dataS.showSpinner();
        spinner.present();
        this.dataS
          .getData("user/" + userD.id)
          .then(res => {
            this.setUserForm(res);
            spinner.dismiss();
          })
          .catch(error => {
            if (error.statusText) this.dataS.showNotification(error.statusText);
            spinner.dismiss();
          });
      }
      else if (userD.type == "driver") {
        let spinner = this.dataS.showSpinner();
        spinner.present();
        this.dataS
          .getData("driver/" + userD.id)
          .then(res => {
            this.setUserForm(res);
            spinner.dismiss();
          })
          .catch(error => {
            if (error.statusText) this.dataS.showNotification(error.statusText);
            spinner.dismiss();
          });
      }
    } else {
      this.setUserForm({ type: "client" });
      this.navCtrl.push("HomePage");
    }
  }

  setUserForm(user) {
    if (user) {
      this.type = user.type;
      if (user.type == "client") {
        this.client = this.formBuilder.group({
          id: [user.id],
          name: [user.name, Validators.required],
          phone: [user.phone, Validators.required],
          // password: [""],
          email_address: [user.email_address, Validators.required]
        });
        this.driver = this.formBuilder.group({
          name: ["", Validators.required],
          phone: ["", Validators.required],
          email_address: ["", Validators.required],
          // password: [""],
          marca: ["", Validators.required],
          driverCarYear: ["", Validators.required],
          modelo: ["", Validators.required],
          capacity: ["", Validators.required],
          facilities: ["", Validators.required]
        });
      } else if (user.type == "driver") {
        this.driver = this.formBuilder.group({
          id: [user.id],
          name: [user.name, Validators.required],
          phone: [user.phone, Validators.required],
          email_address: [user.email_address, Validators.required],
          // password: [""],
          marca: [user.marca, Validators.required],
          modelo: [user.modelo, Validators.required],
          capacity: [user.capacity, Validators.required],
          facilities: [user.facilities, Validators.required]
        });
        this.client = this.formBuilder.group({
          name: ["", Validators.required],
          phone: ["", Validators.required],
          // password: [""],
          email_address: ["", Validators.required]
        });
      }
    }
  }

  updateClient() {
    console.log(this.client.value);
    this.dataS
      .putData("user/" + this.client.value.id, this.client.value)
      .then(res => {
        // this.msg = JSON.stringify(res);
        this.msg = "Datos Actualizados";
        this.submitF = true;
      })
      .catch(error => {
        // this.msg = JSON.stringify(error);
        this.msg = "Ha ocurrido un error";
        this.submitF = true;
      });
  }

  updateDriver() {
    console.log(this.driver.value);
    this.dataS
      .putData("driver/" + this.driver.value.id, this.driver.value)
      .then(res => {
        // this.msg = JSON.stringify(res);
        this.msg = "Datos Actualizados";
        this.submitF = true;
      })
      .catch(error => {
        // this.msg = JSON.stringify(error);
        this.msg = "Ha ocurrido un error";
        console.log(error);
        this.submitF = true;
      });
  }
}
