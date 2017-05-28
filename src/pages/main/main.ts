import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the MainPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
@IonicPage()
export class MainPage {

  myBooksRoot = 'MyBooksPage'
  searchRoot = 'SearchPage'
  profileRoot = 'ProfilePage'


  constructor(public navCtrl: NavController) {}

}
