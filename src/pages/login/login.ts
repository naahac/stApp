import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { RegisterPage } from '../register/register';
import { MainPage } from '../main/main';
import {StorageProvider } from '../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { username: '', password: '' };

  constructor(private nav: NavController, private auth: ServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private storageProvider: StorageProvider) {
    this.storageProvider.getCredentials().then((credentials) => {
      if(credentials != undefined && credentials.username != '' && credentials.password != ''){
        console.log("automatic login");
        this.registerCredentials = credentials;
        this.login();
      }
    });
  }

  public createAccount() {
    console.log("register clicked")
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(response => {
        let authToken = response.text().replace(/"/g, '');
        this.storageProvider.storeToken(authToken).then(() => this.storeCredentials());
      },
      error => {
        this.showError(error);
      });
  }

  storeCredentials(){
    this.storageProvider.storeCredentials(this.registerCredentials).then(() =>{
      this.nav.setRoot(MainPage)
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
