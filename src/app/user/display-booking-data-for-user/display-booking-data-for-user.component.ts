import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/home/homeServices/auth.service';
import { DataService } from 'src/app/shared/shared-service/data.service';

@Component({
  selector: 'app-display-booking-data-for-user',
  templateUrl: './display-booking-data-for-user.component.html',
  styleUrls: ['./display-booking-data-for-user.component.css'],
})
export class DisplayBookingDataForUserComponent implements OnInit {
  bookingData: bookingdetails[] = [];

  // Define input properties for filtering
  startDateString: string = '';
  endDateString: string = '';
  // bookingTime: string = '';
  // bookedRoom: string = '';
  // employeeId: number | null = null;
  // status: string = '';

  // Add these variables for date calculation
  currentDate: Date;
  threeMonthsAgo: Date;
  oneWeekLater: Date;

  constructor(private userDataService: DataService,private jwt:AuthService) {
    this.currentDate = new Date();
    this.threeMonthsAgo = new Date(this.currentDate);
    this.threeMonthsAgo.setMonth(this.currentDate.getMonth() - 3);
    this.oneWeekLater = new Date(this.currentDate);
    this.oneWeekLater.setDate(this.currentDate.getDate() + 7);

    this.startDateString = this.formatDate(this.threeMonthsAgo);
    this.endDateString = this.formatDate(this.oneWeekLater);
  }
  bookingTime: string = '';
  bookedRoom: string = '';
  employeeId: number | null = null;
  status: string = '';
  statusOptions: string[] = ['booked', 'cancelled'];

  // Create a property to hold the selected status
  // selectedStatus: string = '';
  bookingTimeOptions: string[] = ['Morning', 'Afternoon'];
  // selectedBookingTime: string = '';
  bookedRoomOptions: string[] = ['A', 'B'];
  // selectedBookedRoom: string = '';
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.loadBookingData();
  }

  loadBookingData(): void {
    const params = {
      startDate: this.startDateString,
      endDate: this.endDateString,
      BookingTime: this.bookingTime,
      BookedRoom: this.bookedRoom,
      EmployeeId: (this.employeeId = this.jwt.decodeRoles()[0]),
      Status: this.status,
    };
    console.log('the value of booking time is:', this.bookingTime);
    console.log('the sending parameters are ', params);
    this.userDataService
      .getBookingDetailsForUserByFilter(params)
      .subscribe((data: bookingdetails[]) => {
        this.bookingData = data;
        console.table(this.bookingData);
      });
  }
}
export interface bookingdetails {
  bookedRoom: string;
  bookedWorkspace: string;
  bookingDate: string;
  bookingId: number;
  bookingTime: string;
  employeeId: number;
  employeeName: string;
  status: string;
  timestamp: string;
}
