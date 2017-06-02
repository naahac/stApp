/**
 * Created by Natanael on 22. 05. 2017.
 */
export class Listing {
  listingId : number;
  title : string;
  description : string;
  dateadded : string;
  status : boolean;
  personId : number;
  bookId : number;
  latitude : number;
  longitude : number;

  constructor(listingId : number, title : string, description : string, dateadded : string, status: boolean, userId : number, bookId : number, latitude? : number, longitude? : number) {
    this.listingId = listingId;
    this.title = title;
    this.description = description;
    this.dateadded = dateadded;
    this.status = status;
    this.personId = userId;
    this.bookId = bookId;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
