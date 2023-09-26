// booking-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingDataService {
  private bookingData: any[] = []; // Your booking data will be stored here

  constructor() {}

  getBookingData(): any[] {
    return this.bookingData;
  }

  saveBookingDataToFile(): void {
    // Convert your bookingData array to JSON and save it to a file
    const jsonData = JSON.stringify(this.bookingData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'booking-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // You can add methods to modify booking data as needed
}
