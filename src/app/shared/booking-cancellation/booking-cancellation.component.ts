import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service'; // Import your DataService
import { ListBookingDetails } from 'src/app/shared/booking-details'; // Import your interface
import { MarkWorkspaceUnavailableService } from '../mark-workspace-unavailable.service';

@Component({
  selector: 'app-booking-cancellation',
  templateUrl: './booking-cancellation.component.html',
  styleUrls: ['./booking-cancellation.component.css'],
})
export class BookingCancellationComponent implements OnInit {
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

  sendcancel = {
    bookingDate: this.bookingDetails.bookingDate,
    bookingTime: this.bookingDetails.bookingTime,
    bookedRoom: this.bookingDetails.bookedRoom,
    bookedWorkspace: this.bookingDetails.bookedWorkspace,
    employeeId: this.bookingDetails.employeeId,
  };

  constructor(
    private dataService: DataService,
    private cancel: MarkWorkspaceUnavailableService
  ) {}

  ngOnInit() {
    // Call the DataService to get booking details
    this.dataService
      .getBookingDetails()
      .subscribe((data: ListBookingDetails) => {
        this.bookingDetails = data; // Store the fetched data
      });
  }
  cancelworkspace() {
    this.cancelBooking(this.bookingDetails);
    console.log('the method is called');
  }
  cancelBooking(sendcancel: any) {
    this.cancel.cancelBooking(sendcancel).subscribe(
      (response) => {
        // Handle the successful cancel response here
        alert('booking canceled');

        // You can perform any other actions as needed
      },
      (error) => {
        // Handle the error if the cancellation fails
        console.error('Booking canceled:', error);
        alert('booking canceled');
        // You can show an error message or perform other error handling
      }
    );
  }
}
// interface BookingDetails {
//   bookingId: number;
//   bookingDate: string;
//   bookingTime: string;
//   bookedRoom: string;
//   bookedWorkspace: string;
//   employeeId: number;
//   employeeName: string;
//   status: string;
// }
