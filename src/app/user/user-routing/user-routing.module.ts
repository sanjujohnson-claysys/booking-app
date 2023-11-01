import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from 'src/app/shared/booking/booking.component';
import { DisplayBookingDataForUserComponent } from '../display-booking-data-for-user/display-booking-data-for-user.component';
import { UpcomingBookingsComponent } from '../upcoming-bookings/upcoming-bookings.component';
import { ContactAdminComponent } from '../contact-admin/contact-admin.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { BookingDetailsComponent } from 'src/app/shared/booking-details/booking-details.component';
import { BookingCancellationComponent } from 'src/app/shared/booking-cancellation/booking-cancellation.component';
const userRoutes: Routes = [
  { path: 'user/book-workspace', component: BookingComponent },
  {
    path: 'user/booking-details',
    component: DisplayBookingDataForUserComponent,
  },
  { path: 'user/upcoming-bookings', component: UpcomingBookingsComponent },
  { path: 'user/contact-admin', component: ContactAdminComponent },
  { path: 'user/update-profile', component: UpdateProfileComponent },
  {
    path: 'user/upcoming-bookings/details/:id',
    component: BookingDetailsComponent,
  },
  {
    path: 'user/upcoming-bookings/cancel/:id',
    component: BookingCancellationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
