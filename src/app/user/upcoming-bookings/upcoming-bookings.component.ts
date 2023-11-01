import { Component, OnInit } from '@angular/core';
import { UserBookingStatusService } from 'src/app/user-booking-status.service';
import { ListBookingDetails } from 'src/app/shared/booking-details';
@Component({
  selector: 'app-upcoming-bookings',
  templateUrl: './upcoming-bookings.component.html',
  styleUrls: ['./upcoming-bookings.component.css'],
})
export class UpcomingBookingsComponent implements OnInit {
  bookings: ListBookingDetails[] = [];

  constructor(private bookingService: UserBookingStatusService) {}

  ngOnInit(): void {
    // Call the service method to get upcoming bookings
    this.bookingService
      .getUpcomingBookings(23) // Replace with the desired employeeId
      .subscribe((bookings) => {
        this.bookings = bookings;
        console.log(this.bookings);
      });
  }
}
