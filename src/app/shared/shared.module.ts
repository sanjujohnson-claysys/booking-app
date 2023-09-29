import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from '../shared/booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
@NgModule({
  declarations: [BookingComponent, BookingDetailsComponent], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService,AuthService], // Include BookingDataService in the providers array
  exports: [BookingComponent, BookingDetailsComponent]
})
export class SharedModule { }
