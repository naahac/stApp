import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login'
import {App} from 'ionic-angular';
import {StorageProvider} from '../../providers/storage/storage'
import {User} from "../../models/User";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  title: string = "Profile";
  user: User = new User('', '', '', '', '', '', '');
  credentials = {oldPassword: '', newPassword: ''};
  token: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private storage: StorageProvider, private service: ServiceProvider, private alertCtrl: AlertController) {
    this.storage.getToken().then((token) => {
      this.token = token;
      this.getUser();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout() {
    this.storage.storeCredentials(undefined).then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

  updateUser() {
    this.service.updateUser(this.token, this.user).subscribe(success => {
        if (success) {
          this.getUser();
          this.showPopup("Success", "Account updated.");
        } else {
          this.showPopup("Error", "Problem updating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  changePasswordClick() {
    this.service.changePassword(this.token, this.credentials).subscribe(success => {
        if (success) {
          this.showPopup("Success", "Account updated.");
        } else {
          this.showPopup("Error", "Problem updating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  getUser() {
    console.log("get user");
    this.service.getUser(this.token).subscribe((res) => {
      let user = res.json().data;
      this.user = user;
      console.log(user.name + " " + user.surname);
      this.title = user.name + " " + user.surname;
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
  }

}
