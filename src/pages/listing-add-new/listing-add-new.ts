import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  ModalController, App
} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {AutocompletePage} from './autocomplete';
import {ServiceProvider} from "../../providers/service/service";
import {Book} from "../../models/Book";
import {Genre} from "../../models/Genre";
import {ChangeListingRequest} from "../../models/ChangeListingRequest";
import {StorageProvider} from "../../providers/storage/storage";
import {Location} from "./autocomplete"
import {isUndefined} from "ionic-angular/util/util";
import {MainPage} from "../main/main";

/**
 * Generated class for the ListingAddNewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-listing-add-new',
  templateUrl: 'listing-add-new.html',
})
export class ListingAddNewPage {
  location: Location;
  currentImage: string = null;
  imageData: string = null;
  listing: ChangeListingRequest;
  bookAutocompleteItems: Book[];
  listVisible: boolean = false;
  genres: Genre[];
  bookInputDisabled: boolean = false;
  isNew : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public actionSheetCtrl: ActionSheetController, private app : App,
              public toastCtrl: ToastController, private modalCtrl: ModalController, private service: ServiceProvider, private storageProvider: StorageProvider) {
    if (isUndefined(navParams.get('listing')))
      this.listing = new ChangeListingRequest(undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, "", undefined, undefined, undefined, undefined);
    else {
      this.listing = navParams.get('listing');
      this.bookInputDisabled = true;
      this.currentImage = this.service.getBaseUrl() + "/pictures/" + this.listing.listingId;
      this.isNew = false;
    }

    this.location = new Location("", "", undefined, undefined);
    this.getGenres();
  }

  deleteListing(){
    this.storageProvider.getToken().then((token) => {
      if (token != undefined) {
        this.service.deleteListing(token, this.listing.listingId).subscribe(response => {
          console.log("deleted");
        });
      }
    });
  }

  getGenres() {
    this.storageProvider.getToken().then((token) => {
      if (token != undefined) {
        this.service.getGenres(token).subscribe(genres => {
          this.genres = genres;
        });
      }
    });
  }

  onGenreSelected() {
    console.log(this.listing.genreId);
  }

  showAddressModal() {
    let modal = this.modalCtrl.create(AutocompletePage, {searchString: this.listing.location});
    // let me = this;
    modal.onDidDismiss(data => {
      if (!isUndefined(data)) {
        this.listing.location = data.description;
        this.listing.latitude = data.latitude;
        this.listing.longitude = data.longitude;
      }
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingAddNewPage');
  }

  // getPlaceByLocation() {
  //   let me = this;
  //   this.placesService.getPlacePredictions({
  //     input: " ",
  //     componentRestrictions: {country: 'SI'},
  //     location: new LatLng(this.listing.latitude, this.listing.longitude)
  //   }, function (predictions, status) {
  //       if (predictions !== null) {
  //           me.location.description = predictions[0].description;
  //       }
  //   });
  // }

  onBookPredictionChaged() {
    this.listing.bookId = -1;
    this.bookInputDisabled = false;
    if (this.listing.bookTitle == "") {
      this.bookAutocompleteItems = [];
      return;
    }
    this.storageProvider.getToken().then(token => {
      this.service.getBookPredictions(this.listing.bookTitle, token).subscribe((predictions => {
        this.listVisible = true;
        this.bookAutocompleteItems = predictions;
      }));
    });
  }

  chooseItem(item: Book) {
    this.listing.bookId = item.bookId;
    this.listing.bookTitle = item.title;
    this.listing.author = item.author;
    this.listing.genreId = item.genreId;
    this.listVisible = false;
    this.bookInputDisabled = true;
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData = imageData;
      this.currentImage = base64Image;
    }, (err) => {
      this.presentToast("Error while selecting image");
    });

  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public addListing() {
    let pic = "";
    console.log("add new!!! data: " + this.listing.listingTitle + " " + this.listing.description);
    if (this.currentImage != null) {
      let dataString = this.currentImage;
      dataString = dataString.replace(/\n/g, '');
      let matches = dataString.match(/data:([A-Za-z-+\/]+);base64,(.+)/);
      if (matches !== null && matches.length === 3)
        pic = this.currentImage;
    }
    this.storageProvider.getToken().then((token) => {
      if (token != undefined) {
        let req = new ChangeListingRequest(token,
          this.listing.listingId,
          this.listing.listingTitle,
          this.listing.bookTitle,
          this.listing.description,
          this.listing.bookId,
          pic,
          this.listing.latitude,
          this.listing.longitude,
          this.listing.genreId,
          this.listing.author,
          this.listing.location,
          undefined,//userId
          undefined,//distance
          undefined, //status
          undefined //genreString
      );
        if(isUndefined(this.listing.listingId)) {
          this.service.addListing(req).subscribe((result) => {
            console.log(result);
            this.app.getRootNav().push(MainPage,{});
          });
        }
        else{
          this.service.updateListing(req).subscribe((result) => {
            console.log(result);
            this.app.getRootNav().push(MainPage,{});
          });
        }
      }
    });
  }
}
