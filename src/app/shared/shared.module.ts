import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from '../shared/booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
@NgModule({
  declarations: [BookingComponent, BookingDetailsComponent, SignInComponent], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService,AuthService], // Include BookingDataService in the providers array
  exports: [BookingComponent, BookingDetailsComponent, SignInComponent]
})
export class SharedModule { }
