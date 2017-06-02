import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageProvider} from '../../providers/storage/storage';
import {ServiceProvider} from '../../providers/service/service';
import {Listing} from '../../models/Listing';
import {ListingDetailsPage} from '../../pages/listing-details/listing-details';
import {ListingAddNewPage} from "../listing-add-new/listing-add-new";
import {ChangeListingRequest} from "../../models/ChangeListingRequest";


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
  listings : [ChangeListingRequest];
  imgBaseUrl : string;
  constructor(public navCtrl: NavController, private app: App, public navParams: NavParams, public storage: StorageProvider, public service: ServiceProvider) {
    this.imgBaseUrl = service.getBaseUrl() + "/pictures/";
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

  public openListingDetails(listing : ChangeListingRequest){
    console.log("Listing clicked" + listing.listingTitle);
    this.app.getRootNav().push(ListingDetailsPage,{listing:listing});
  }

  public addNewListing(){
    this.app.getRootNav().push(ListingAddNewPage,{});
  }

}
