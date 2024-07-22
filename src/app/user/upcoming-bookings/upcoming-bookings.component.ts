import { Component, OnInit } from '@angular/core';
import { UserBookingStatusService } from 'src/app/user/userService/user-booking-status.service';
import { ListBookingDetails } from 'src/app/shared/booking-details';
import { AuthService } from 'src/app/home/homeServices/auth.service';
@Component({
  selector: 'app-upcoming-bookings',
  templateUrl: './upcoming-bookings.component.html',
  styleUrls: ['./upcoming-bookings.component.css'],
})
export class UpcomingBookingsComponent implements OnInit {
  bookings: ListBookingDetails[] = [];
  employeeId = parseInt(this.jwt.decodeRoles()[0])

  constructor(private bookingService: UserBookingStatusService,private jwt:AuthService,) {}

  ngOnInit(): void {
    
    // Call the service method to get upcoming bookings
    this.bookingService
      .getUpcomingBookings(this.employeeId) // Replace with the desired employeeId
      .subscribe((bookings) => {
        this.bookings = bookings;
        console.log(this.bookings);
      });
  }
  
}
