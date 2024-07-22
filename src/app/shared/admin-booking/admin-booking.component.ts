import { Component } from '@angular/core';
import { adminBookingService } from 'src/app/admin/adminServices/admin-booking.service';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent {
  
  bookings: any[] = [];

  constructor(private bookingService: adminBookingService) {}

  ngOnInit(): void {
    // Replace these example filters with your actual filters
    const startDate = new Date('2023-09-27');
    const endDate = new Date('2023-09-30');
    const roomFilter = 'A';

    this.bookingService
      .getBookings(startDate, endDate, roomFilter)
      .subscribe((data) => {
        this.bookings = data;
      });
  }
  deleteBooking(bookingId: number): void {
  const index = this.bookings.findIndex(booking => booking.bookingId === bookingId);
  if (index >= 0) {
    this.bookings.splice(index, 1);
    // You can also make an API call to delete the data on the server if needed
  }
}
}