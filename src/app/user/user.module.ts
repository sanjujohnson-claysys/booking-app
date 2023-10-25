import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayBookingDataForUserComponent } from './display-booking-data-for-user/display-booking-data-for-user.component';
import { FormsModule } from '@angular/forms'; // If using ngModel
@NgModule({
  declarations: [DisplayBookingDataForUserComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [DisplayBookingDataForUserComponent],
})
export class UserModule {}
