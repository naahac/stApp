import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBooksPage } from './my-books';


@NgModule({
  declarations: [
    MyBooksPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBooksPage),
  ],
  exports: [
    MyBooksPage
  ]
})
export class MyBooksPageModule {
}
