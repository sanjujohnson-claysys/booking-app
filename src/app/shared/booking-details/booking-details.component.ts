import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { ListBookingDetails } from 'src/app/shared/booking-details'; // Import your interface

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
  bookingDetails: ListBookingDetails = {
    bookingId: -1,
    bookingDate: '0-0-0000',
    bookingTime: 'unknown',
    bookedRoom: 'unknown',
    bookedWorkspace: 'unknown',
    employeeId: -1,
    employeeName: 'unknown',
    status: 'unknown',
  }; // Use the interface for strongly typed data
  bookingId: number = -1;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Extract bookingId from the URL using ActivatedRoute
    this.route.params.subscribe((params) => {
      this.bookingId = +params['id']; // '+' is used to convert the parameter to a number
      // Now, you can use this.bookingId to fetch booking details
      this.fetchBookingDetails();
    });
  }

  fetchBookingDetails() {
    // Call the service to get booking details by ID
    this.dataService
      .getBookingDetailsById(this.bookingId)
      .subscribe((data: ListBookingDetails) => {
        this.bookingDetails = data; // Store the fetched data
      });
  }
}
