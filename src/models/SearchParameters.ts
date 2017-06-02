/**
 * Created by Natanael on 1. 06. 2017.
 */

export class  SearchParameters{
  title : string;
  latitude : number;
  longitude : number;
  tokenId : string;

  constructor(tokenId: string, title : string, latitude : number, longitude : number){
    this.tokenId = tokenId;
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
