import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  @Input() bookingId: string = "-1";
  @Input() bookingDate: string ='0-0-0000';
  @Input() bookingTime: string ='unknown';
  @Input() bookedRoom: string = "unknown";
  @Input() bookedWorkspace: string = "-1";
  @Input() personId: string = "-1";
  @Input() personName: string = "unknown";
  @Input() status: string= "unknown" ;
}
