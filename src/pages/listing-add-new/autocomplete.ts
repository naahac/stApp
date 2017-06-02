import {Component, NgZone} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';


export class Location {
  description: string;
  longitude: number;
  latitude: number;
  placeId: string;

  constructor(description: string, placeId: string, longitude?: number, latitude?: number) {
    this.description = description;
    this.placeId = placeId;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}

@Component({
  templateUrl: './autocomplete.html'
})
export class AutocompletePage {

  autocompleteItems: Location[];
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  constructor(public viewCtrl: ViewController, private zone: NgZone, public navParams: NavParams) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: navParams.get("searchString")
    };
    this.updateSearch();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: Location) {
    let placesService = new google.maps.places.PlacesService(<HTMLDivElement>document.getElementById("map"));
    placesService.getDetails({placeId: item.placeId}, (details, status) => {
      let location = new Location(item.description, item.placeId, details.geometry.location.lng(), details.geometry.location.lat());
      console.log(details.geometry.location.toString());
      this.viewCtrl.dismiss(location);
    });
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: {country: 'SI'}
    }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if (predictions !== null) {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(new Location(prediction.description, prediction.place_id, undefined, undefined));
          });
        }
      });
    });
  }
}

