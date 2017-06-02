import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingAddNewPage } from './listing-add-new';

@NgModule({
  declarations: [
    ListingAddNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListingAddNewPage),
  ],
  exports: [
    ListingAddNewPage
  ]
})
export class ListingAddNewPageModule {}
