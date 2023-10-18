// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-booking-details',
//   templateUrl: './booking-details.component.html',
//   styleUrls: ['./booking-details.component.css']
// })
// export class BookingDetailsComponent {
//   @Input() bookingId: string = "-1";
//   @Input() bookingDate: string ='0-0-0000';
//   @Input() bookingTime: string ='unknown';
//   @Input() bookedRoom: string = "unknown";
//   @Input() bookedWorkspace: string = "-1";
//   @Input() personId: string = "-1";
//   @Input() personName: string = "unknown";
//   @Input() status: string= "unknown" ;
// }
import { Component, OnInit } from '@angular/core';
import { BookingDetails } from 'src/app/booking-details';
import { DataService } from 'src/app/data.service'; // Import your DataService
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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Call the DataService to get booking details
    this.dataService
      .getBookingDetails()
      .subscribe((data: ListBookingDetails) => {
        this.bookingDetails = data; // Store the fetched data
      });
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
