import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-booking-details-by-id',
  templateUrl: './booking-details-by-id.component.html',
  styleUrls: ['./booking-details-by-id.component.css'],
})
export class BookingDetailsByIdComponent implements OnInit {
  employeeId: number = 21;
  bookings: any;

  constructor(
    private route: ActivatedRoute,
    private bookingService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // this.employeeId = +params.get('id');

      this.bookingService
        .getBookingsByEmployeeAndStatus(this.employeeId)
        .subscribe((data) => {
          this.bookings = data;
        });
    });
  }
}
