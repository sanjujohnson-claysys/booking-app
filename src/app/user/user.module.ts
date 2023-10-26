import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayBookingDataForUserComponent } from './display-booking-data-for-user/display-booking-data-for-user.component';
import { FormsModule } from '@angular/forms';
import { UpcomingBookingsComponent } from './upcoming-bookings/upcoming-bookings.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component'; // If using ngModel
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    DisplayBookingDataForUserComponent,
    UpcomingBookingsComponent,
    ContactAdminComponent,
    UpdateProfileComponent,
    UserNavbarComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [DisplayBookingDataForUserComponent, UserNavbarComponent],
})
export class UserModule {}
