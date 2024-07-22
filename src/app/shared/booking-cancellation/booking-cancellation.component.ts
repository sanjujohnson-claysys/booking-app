import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/shared-service/data.service'; // Import your DataService
import { ListBookingDetails } from 'src/app/shared/booking-details'; // Import your interface
import { MarkWorkspaceUnavailableService } from '../../admin/adminServices/mark-workspace-unavailable.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  bookingId: number = -1;

  constructor(
    private dataService: DataService,
    private cancel: MarkWorkspaceUnavailableService,
    private route: ActivatedRoute,
    private router: Router
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
  // cancelworkspace() {
  //   this.cancelBooking(this.bookingDetails);
  //   console.log('the method is called');
  // }
  cancelBooking(bookingId: number) {
    this.cancel.cancelBooking(bookingId).subscribe(
      () => {
        // Handle the successful cancel response here
        console.log('Booking canceled successfully');
        alert('Booking canceled successfully');
        this.router.navigate(['/user/upcoming-bookings']);


        // You can perform any other actions as needed
      },
      (error) => {
        // Handle the error if the cancellation fails
        console.error('Failed to cancel booking:', error);
        alert('Failed to cancel booking');
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
