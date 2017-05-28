import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/User'
// import { Listing } from '../../models/Listing'
import 'rxjs/add/operator/map';
import {StorageProvider} from "../storage/storage";
import {Listing} from "../../models/Listing";

@Injectable()
export class ServiceProvider {

  // Resolve HTTP using the constructor
  constructor(private http: Http, private storage: StorageProvider) { }
  // private instance variable to hold base url
  // private baseUrl = "http://164.8.212.153:3000";
  private baseUrl = "https://spletne-tehnologije-projekt.herokuapp.com";
  currentUser: User;

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let loginData = new User(credentials.username, credentials.password);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl + "/login", JSON.stringify(loginData), options);
    }
  }

  public register(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + "/users/", JSON.stringify(user), options);
  }

  public getUser(token){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseUrl + "/users?tokenId=" + token, options);
  }

  public updateUser(token, user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.baseUrl + "/users/?tokenId=" + token, JSON.stringify(user), options);
  }

  public changePassword(token, credentials){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.baseUrl + "/users/changePassword/?tokenId=" + token, JSON.stringify(credentials), options);
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public getListingsByToken(token) : Observable<[Listing]>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http
        .get(this.baseUrl + "/listings/byuserid/?tokenId=" + token, options)
        .map(res => res.json())
        .map(data => {
        var result = [];
        for (let obj of data) {
          let newListing = new Listing(obj['listingId'] , obj['title'], obj['description'], obj['dateadded'], obj['status'], obj['userId'], obj['bookId']);
          result.push(newListing);
        }
        return result;
      });
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
