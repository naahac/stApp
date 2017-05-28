import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingDetailsPage } from './listing-details';

@NgModule({
  declarations: [
    ListingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListingDetailsPage),
  ],
  exports: [
    ListingDetailsPage
  ]
})
export class ListingDetailsPageModule {}
