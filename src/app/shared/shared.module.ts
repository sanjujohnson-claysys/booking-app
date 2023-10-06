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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { adminBookingService } from '../admin-booking.service';

@NgModule({
  declarations: [BookingComponent, BookingDetailsComponent, GraphComponent,AdminBookingComponent], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule 
   
  ],
  providers: [DataService,AuthService,GraphDataService,adminBookingService], // Include BookingDataService in the providers array
  exports: [BookingComponent, BookingDetailsComponent,GraphComponent,AdminBookingComponent]
})
export class SharedModule { }
