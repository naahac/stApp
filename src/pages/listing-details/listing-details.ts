import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {ServiceProvider} from "../../providers/service/service";
import {ChangeListingRequest} from "../../models/ChangeListingRequest";
import {ListingAddNewPage} from "../listing-add-new/listing-add-new";
import {StorageProvider} from "../../providers/storage/storage";
import {ChatPage} from "../chat/chat";
import {LaunchNavigator, LaunchNavigatorOptions} from "@ionic-native/launch-navigator";

/**
 * Generated class for the ListingDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-listing-details',
  templateUrl: 'listing-details.html',
})
export class ListingDetailsPage {
  listing : ChangeListingRequest;
  imageUrl : string;
  genre : string = "Young Adult";
  isEditHidden : boolean = true;
  currentUserId : number;

  constructor(public navCtrl: NavController,private app: App, public navParams: NavParams, private service : ServiceProvider, private storageProvider : StorageProvider,
              private launchNavigator: LaunchNavigator, private geolocation: Geolocation) {
    this.listing = navParams.get('listing');
    this.imageUrl = this.service.getBaseUrl() + "/pictures/" + this.listing.listingId;
    this.storageProvider.getUserId().then(userId => {
      this.currentUserId = userId;
      this.isEditHidden = this.listing.userId !== userId && this.listing.status === 1;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingDetailsPage');
  }

  editListing(){
    this.app.getRootNav().push(ListingAddNewPage,{listing:this.listing});
  }

  chat(){
    this.app.getRootNav().push(ChatPage,{userId:this.listing.userId});
  }

  navigate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      let coords = [resp.coords.latitude, resp.coords.longitude];
      let options: LaunchNavigatorOptions = {
        start: coords
      };
      let destCoords = [this.listing.latitude, this.listing.longitude];
      this.launchNavigator.navigate(destCoords, options)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
