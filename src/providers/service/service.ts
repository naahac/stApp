import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/User'
import 'rxjs/add/operator/map';
import {StorageProvider} from "../storage/storage";
import {Book} from "../../models/Book";
import {Genre} from "../../models/Genre";
import {ChangeListingRequest} from "../../models/ChangeListingRequest";
import {SearchParameters} from "../../models/SearchParameters";
import {Chat} from "../../models/Chat";

@Injectable()
export class ServiceProvider {

  // Resolve HTTP using the constructor
  constructor(private http: Http, private storage: StorageProvider) {
  }

  private baseUrl = "http://164.8.212.153:3000";
  // private baseUrl = "http://192.168.6.110:3000";
  // private baseUrl = "https://spletne-tehnologije-projekt.herokuapp.com";
  currentUser: User;

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public createChatroom(token : string, userId : number){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, params: {tokenId: token, userId: userId}});
    return this.http
      .get(this.baseUrl + "/chats/id/", options)
      .map(res => res.json());
  }

  public getChatById(token : string, chatId : number){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, params: {tokenId: token, chatId: chatId}});
    return this.http
      .get(this.baseUrl + "/chats/", options)
      .map(res => res.json());
  }

  public getChatroomsByToken(token : string) : Observable<[Chat]>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl + "/chats/byuserid/?tokenId=" + token, options)
      .map(res => res.json())
      .map(data => {
        var result = [];
        if (!data.success)
          return result;
        for (let obj of data.data) {
          let newChat = new Chat(obj['chatId'],obj['user1'], obj['user2'], obj['username1'], obj['username2']);
          result.push(newChat);
        }
        return result;
      });
  }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let loginData = new User(credentials.username, credentials.password);
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      return this.http.post(this.baseUrl + "/login", JSON.stringify(loginData), options)
        .map(res => res.json());
    }
  }

  public register(user: User) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + "/users/", JSON.stringify(user), options);
  }

  public getUser(token) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseUrl + "/users?tokenId=" + token, options);
  }

  public updateUser(token, user) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.baseUrl + "/users/?tokenId=" + token, JSON.stringify(user), options);
  }

  public changePassword(token, credentials) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.baseUrl + "/users/changePassword/?tokenId=" + token, JSON.stringify(credentials), options);
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public searchListings(parameters: SearchParameters): Observable<[ChangeListingRequest]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, params: parameters});
    return this.http
      .get(this.baseUrl + "/listings/search", options)
      .map(res => res.json())
      .map(data => {
        var result = [];
        if (!data.success)
          return result;
        for (let obj of data.data) {
          let distance = (Math.round(obj['distance'] * 100) / 100).toFixed(2);
          let newListing = new ChangeListingRequest(undefined,//token
            obj['listingId'],
            obj['title'],
            obj['book']['title'],
            obj['description'],
            obj['bookId'],
            undefined,//picture
            obj['latitude'],
            obj['longitude'],
            obj['book']['genreId'],
            obj['book']['author']['author'],
            obj['location'],
            obj['userId'],
            distance,
            obj['status'],
            obj['book']['genre']['genre']);
          result.push(newListing);
        }
        return result;
      });
  }

  public getListingsByToken(token): Observable<[ChangeListingRequest]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl + "/listings/byuserid/?tokenId=" + token, options)
      .map(res => res.json())
      .map(data => {
        var result = [];
        if (!data.success)
          return result;
        for (let obj of data.data) {
          let newListing = new ChangeListingRequest(undefined,//token
            obj['listingId'],
            obj['title'],
            obj['book']['title'],
            obj['description'],
            obj['bookId'],
            undefined,//picture
            obj['latitude'],
            obj['longitude'],
            obj['book']['genreId'],
            obj['book']['author']['author'],
            obj['location'],
            obj['userId'],
            undefined,
            obj['status'],
            obj['book']['genre']['genre']);
          result.push(newListing);
        }
        return result;
      });
  }

  public deleteListing(tokenId: string, listingId: number) {
    let req = {tokenId: tokenId, listingId: listingId}
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, body: req});
    return this.http.delete(this.baseUrl + "/listings/", options);
  }

  public addListing(request: ChangeListingRequest) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + "/listings/", JSON.stringify(request), options);
  }

  public updateListing(request: ChangeListingRequest) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.baseUrl + "/listings/", JSON.stringify(request), options);
  }

  public getBookPredictions(predictionString: string, token: string): Observable<[Book]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl + "/books/search/?tokenId=" + token + "&title=" + predictionString, options)
      .map(res => res.json())
      .map(data => {
        let result = [];
        for (let obj of data) {
          let book = new Book(obj['bookId'], obj['title'], obj['authorId'], obj['author']['author'], obj['genreId']);
          result.push(book);
        }
        return result;
      });
  }

  public getGenres(token: string): Observable<[Genre]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl + "/books/genres/?tokenId=" + token, options)
      .map(res => res.json())
      .map(data => {
        let result = [];
        for (let obj of data) {
          let genre = new Genre(obj['genreId'], obj['genre']);
          result.push(genre);
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
