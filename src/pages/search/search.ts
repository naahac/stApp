import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {StorageProvider} from "../../providers/storage/storage";
import {ServiceProvider} from "../../providers/service/service";
import {ChangeListingRequest} from "../../models/ChangeListingRequest";
import {ListingDetailsPage} from "../listing-details/listing-details";
import {SearchParameters} from "../../models/SearchParameters";

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchString : string = "";
  longitude : number;
  latitude : number;
  listings : [ChangeListingRequest];
  imgBaseUrl : string;

  constructor(public navCtrl: NavController,private app: App, public navParams: NavParams, public storage: StorageProvider, private geolocation: Geolocation, public service: ServiceProvider) {
    this.getCurrentLocation();
    this.imgBaseUrl = service.getBaseUrl() + "/pictures/";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public search(){
    this.storage.getToken().then((token) => {
      this.service.searchListings(new SearchParameters(token,this.searchString, this.latitude, this.longitude))
        .subscribe(success => {
            console.log("got search listings");
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

  getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.search();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
