import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage'
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: Http, public storage:Storage) {
    console.log('Hello StorageProvider Provider');
    this.storage.ready().then(() => {
      console.log("storage ready");
    });
  }

  public storeToken(token){
    return this.storage.set('authToken', token);
  }

  public storeCredentials(credentials){
    return this.storage.set('credentials', credentials);
  }

  public getCredentials(){
    return this.storage.get('credentials');
  }

  public getToken(){
    return this.storage.get('authToken');
  }

}
