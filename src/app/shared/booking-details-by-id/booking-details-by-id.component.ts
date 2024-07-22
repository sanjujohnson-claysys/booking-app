import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/shared-service/data.service';

// Assuming you have a ListBookingDetails interface
interface ListBookingDetails {
  bookingId: number;
  bookingDate: string;
  bookingTime: string;
  bookedRoom: string;
  bookedWorkspace: string;
  employeeId: number;
  employeeName: string;
  status: string;
}

@Component({
  selector: 'app-booking-details-by-id',
  templateUrl: './booking-details-by-id.component.html',
  styleUrls: ['./booking-details-by-id.component.css'],
})
export class BookingDetailsByIdComponent implements OnInit {
  bookings: ListBookingDetails[] = []; // Assuming it's an array

  constructor(
    private route: ActivatedRoute,
    private bookingService: DataService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Retrieve query parameters from the URL
      const bookingDate = params['BookingDate'];
      const bookingTime = params['BookingTime'];
      const bookedRoom = params['BookedRoom'];
      const bookedWorkspace = params['BookedWorkspace'];
      const employeeId = +params['EmployeeId']; // Convert to number
      const employeeName = params['EmployeeName'];
      const status = params['Status'];

      // Call your service with the retrieved parameters
      this.bookingService
        .getBookingsByEmployeeAndStatus(employeeId)
        .subscribe((data: ListBookingDetails[]) => {
          this.bookings = data;
        });

      // Assign values to the component properties for binding in the template
      this.bookingId = params['BookingId'];
      this.bookingDate = bookingDate;
      this.bookingTime = bookingTime;
      this.bookedRoom = bookedRoom;
      this.bookedWorkspace = bookedWorkspace;
      this.employeeId = employeeId;
      this.employeeName = employeeName;
      this.status = status;
    });
  }

  // Component properties for binding in the HTML template
  bookingId: number | undefined;
  bookingDate: string | undefined;
  bookingTime: string | undefined;
  bookedRoom: string | undefined;
  bookedWorkspace: string | undefined;
  employeeId: number | undefined;
  employeeName: string | undefined;
  status: string | undefined;
}
