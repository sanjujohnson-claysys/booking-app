import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminActionsService } from 'src/app/admin/adminServices/admin-actions.service';

@Component({
  selector: 'app-admin-booking-data-by-filters',
  templateUrl: './admin-booking-data-by-filters.component.html',
  styleUrls: ['./admin-booking-data-by-filters.component.css'],
})
export class AdminBookingDataByFiltersComponent implements OnInit {
  bookingForm!: FormGroup; // Declare bookingForm as a FormGroup

  bookings: any[] = []; // Initialize bookings as an empty array

  constructor(
    private formBuilder: FormBuilder,
    private adminDataByFilters: AdminActionsService
  ) {}

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      startDate: '',
      endDate: '',
      roomFilter: '',
      workspaceFilter: '',
      employeeIdFilter: '',
      bookingTimeFilter: '',
      statusFilter: '',
    });
  }

  searchBookings() {
    const filters = this.bookingForm.value; // Remove the "?" from this.bookingForm.value
    this.adminDataByFilters
      .getBookingDataByFilters(filters)
      .subscribe((data) => {
        this.bookings = data;
        console.log(this.bookings);
      });
  }

  // Function to format a date
}
