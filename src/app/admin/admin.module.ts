import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { GraphComponent } from '../shared/graph/graph.component';
import { BookingDetailsByIdComponent } from '../shared/booking-details-by-id/booking-details-by-id.component';
import { BookingComponent } from '../shared/booking/booking.component';
import { BookingDetailsComponent } from '../shared/booking-details/booking-details.component';
import { AdminBookingDataByFiltersComponent } from './admin-booking-data-by-filters/admin-booking-data-by-filters.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'admin-actions',

    children: [
      { path: '', component: BookingDetailsComponent },
      { path: 'book', component: BookingComponent },
      { path: 'mark-unavailable', component: BookingComponent },
      { path: 'upcoming-bookings', component: BookingComponent },
      { path: 'booking-details', component: BookingDetailsComponent },
      { path: 'employee-wise-data', component: BookingDetailsByIdComponent },
      { path: 'booking-graph', component: GraphComponent },
      // { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AdminActionsComponent,
    AdminBookingDataByFiltersComponent,

    // Add other components that belong to this module here
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule, // Add FormsModule here
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    RouterModule,
    AdminActionsComponent,
    AdminBookingDataByFiltersComponent,
  ],
})
export class AdminRoutingModule {}
