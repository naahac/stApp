/**
 * Created by Natanael on 31. 05. 2017.
 */
export class ChangeListingRequest {
  tokenId : string;
  listingId : number;
  listingTitle : string;
  bookTitle : string;
  description : string;
  picture : string;
  bookId : number;
  latitude : number;
  longitude : number;
  author : string;
  genreId : number;
  dateAdded : string = "2017";
  location : string;
  userId : number;
  distance : string;
  status : number;

  constructor(tokenId : string, listingId : number, listingTitle : string, bookTitle : string, description : string,
              bookId : number, picture : string, latitude : number, longitude : number, genreId : number, author : string,
              location : string, userId : number, distance : string, status : number) {
    this.tokenId = tokenId;
    if(listingId !== undefined)
      this.listingId = listingId;
    this.listingTitle = listingTitle;
    this.bookTitle = bookTitle;
    this.description = description;
    if(bookId > 0)
      this.bookId = bookId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.picture = picture;
    this.genreId = genreId;
    this.author = author;
    this.location = location;
    this.userId = userId;
    this.distance = distance;
    this.status = status;
  }
}
