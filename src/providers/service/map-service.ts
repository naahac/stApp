import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

declare var google;

// ionic plugin add --save cordova-plugin-geolocation

@Injectable()
export class MapService {
  map: any;
  center: any;
  allMarker = [];

  constructor(private geolocation: Geolocation) { }

  loadInitialMap(nativeElemt) {
    let mapOptions = {
      center: new google.maps.LatLng('53', '9'),
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(nativeElemt, mapOptions);
    return this.map;
  }

  // loadPlacesAroundMe(): Observable<any> {
  //   return new Observable(observer => {
  //     this.geolocation.getCurrentPosition((resp) => {
  //       this.center = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
  //       this.map.setZoom(15);
  //       this.map.setCenter(this.center);
  //       this.loadPlaces().subscribe(data => {
  //         observer.next(data);
  //       });
  //       this.createUserMarker();
  //     }, error2 => {
  //       console.log('Error getting location', error2);
  //     });
  //   });
  // }

  loadPlaces() {
    return new Observable(observer => {
      var service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: this.center,
        radius: 1000,
        type: ['store']
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.allMarker = [];
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
          observer.next(results);
        }
      });
    });
  }

  createUserMarker() {
    var marker = new google.maps.Marker({
      map: this.map,
      position: this.center,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    let markerInfo = '<b>My Position</b>';
    this.addInfoWindow(marker, markerInfo);
  }

  createMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    this.allMarker.push(marker);

    let markerInfo = '<b>' + place.name + '</b>';
    this.addInfoWindow(marker, markerInfo);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  focusMap(place) {
    let position = place.geometry.location;

    for (var mark of this.allMarker) {
      if (mark.position === position) {
        this.map.setZoom(18);
        mark.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      } else {
        mark.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      }
    }
    this.map.setCenter(position);
  }

}
