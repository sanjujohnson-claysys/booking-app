import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from '../shared/booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { GraphDataService } from '../graph-data.service';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { GraphComponent } from './graph/graph.component';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@NgModule({
  declarations: [BookingComponent, BookingDetailsComponent, GraphComponent], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [DataService,AuthService,GraphDataService], // Include BookingDataService in the providers array
  exports: [BookingComponent, BookingDetailsComponent,GraphComponent]
})
export class SharedModule { }
