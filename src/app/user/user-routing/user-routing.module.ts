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
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { SignOutComponent } from 'src/app/sign-out/sign-out.component';
import { SignInComponent } from 'src/app/home/sign-in/sign-in.component';
import { BookingDetailsByIdComponent } from 'src/app/shared/booking-details-by-id/booking-details-by-id.component';
const userRoutes: Routes = [
  {
    path: 'user',
    
    children: [
      
      { path: 'booking', component: BookingComponent },
      { path: 'sign-out', component: SignOutComponent },
      { path: 'sign-in', component: SignInComponent },
      {
        path: 'booking-details',
        component: DisplayBookingDataForUserComponent,
      },
      // {
      //   path: 'booking-details-byId/:id',
      //   component: BookingDetailsByIdComponent,
      // },
      // {
      //   path: 'booking-cancel-byId/:id',
      //   component: BookingDetailsByIdComponent,
      // },
      { path: 'upcoming-bookings', component: UpcomingBookingsComponent },
      { path: 'contact-admin', component: ContactAdminComponent },
      { path: 'update-profile', component: UpdateProfileComponent },
      {
        path: 'upcoming-bookings/details/:id',
        component: BookingDetailsComponent,
      },
      {
        path: 'upcoming-bookings/cancel/:id',
        component: BookingCancellationComponent,
      },
      { path: '', component: UpcomingBookingsComponent },
      { path: 'booked-details', component: BookingDetailsByIdComponent }
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
