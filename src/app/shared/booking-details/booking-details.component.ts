import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/shared-service/data.service';
import { ActivatedRoute } from '@angular/router';
import { ListBookingDetails } from 'src/app/shared/booking-details';

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
  };
  bookingId: number = -1;
  employeeName: string = 'unknown';
  status: string = 'unknown';
  bookingDate: string = 'unknown';
  bookingTime:string= 'unknown';
  bookedRoom:string= 'unknown';
  bookedWorkspace: string = 'unknown'

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Access data from the route's query parameters
    this.route.queryParams.subscribe((queryParams) => {
      this.bookingId = queryParams['bookingId'] ;
      console.log(this.bookingId);
      this.employeeName = queryParams['EmployeeName'] ;
      console.log(this.employeeName);
      this.status = queryParams['Status'];
      console.log(this.bookingId);
      this.bookingDate = queryParams['BookingDate'];
      console.log(this.bookingDate);
      this.bookingTime =  queryParams['BookingTime'];
      console.log(this.bookingTime);
      this.bookedRoom =  queryParams['BookedRoom'];
      console.log(this.bookedRoom);
      this.bookedWorkspace = queryParams['BookedWorkspace'];
      console.log(this.bookedWorkspace);
      
        

      // Now, you can use this.bookingId, this.employeeName, and this.status
      // to fetch booking details or perform other actions
      // this.fetchBookingDetails();
    });
  }

//   fetchBookingDetails() {
//     // Call the service to get booking details by ID
//     this.dataService
//       .getBookingDetailsById(this.bookingId)
//       .subscribe((data: ListBookingDetails) => {
//         this.bookingDetails = data; // Store the fetched data
//       });
//   }
 }
