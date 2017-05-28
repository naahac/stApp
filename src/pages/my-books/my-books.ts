import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageProvider} from '../../providers/storage/storage';
import {ServiceProvider} from '../../providers/service/service';
import {Listing} from '../../models/Listing';
import {ListingDetailsPage} from '../../pages/listing-details/listing-details';


/**
 * Generated class for the MyBooksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-books',
  templateUrl: 'my-books.html',
})
export class MyBooksPage {
  listings : [Listing];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public service: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBooksPage');
    this.getListings();
  }

  public getListings(){
    this.storage.getToken().then((token) => {
      this.service.getListingsByToken(token)
        .subscribe(success => {
            console.log("got listings");
            this.listings = success;
          },
          error => {
            console.log("error: " + error);
          });
    });
  }

  public openListingDetails(listing : Listing){
    console.log("Listing clicked" + listing.title);
    this.navCtrl.push(ListingDetailsPage,listing);
  }

}
