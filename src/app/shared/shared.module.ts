import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from '../shared/booking/booking.component';
// import { BookingDataService } from '../booking-data.service'; // Uncomment this line to import BookingDataService
import { FormsModule } from '@angular/forms';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

@NgModule({
  declarations: [BookingComponent, BookingDetailsComponent], 
  imports: [
    CommonModule,
    FormsModule

  ],
  providers: [], // Include BookingDataService in the providers array
  exports: [BookingComponent,BookingDetailsComponent] // If you want to make BookingComponent available for use in other modules, include it in the exports array.
})
export class SharedModule { }
