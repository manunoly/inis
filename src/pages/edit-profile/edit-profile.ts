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
  ) {}

  ionViewDidLoad() {
    this.dataS.getUserLocalStorage().then(userD => {
      if (userD.roll == "cliente") {
        this.client = this.formBuilder.group({
          name: [userD.name, Validators.required],
          phone: [userD.phone, Validators.required],
          email: [userD.email_address, Validators.required],
          password: ["", Validators.required]
        });
      } else {
      /**TODO: fix data recive */
        if (this.roll == "chofer") {
          this.dataS.getData("driver/" + userD.id).then(res => {
            if (res.status == 200 && res.text()) {
              let tmpUser = JSON.stringify(res.text());
              this.driver = this.formBuilder.group({
                driverName: [tmpUser, Validators.required],
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
          });
        }
      }
    });
  }
}
