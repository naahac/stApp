/**
 * Created by Natanael on 31. 05. 2017.
 */
export class Book {
  bookId : number;
  title : string;
  authorId : number;
  author : string;
  genreId : number;

  constructor(bookId : number, title : string, authorId : number, author : string, genreId : number) {
    this.title = title;
    this.bookId = bookId;
    this.authorId = authorId;
    this.author = author;
    this.genreId = genreId;
  }
}
