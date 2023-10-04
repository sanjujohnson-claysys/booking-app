import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserBookingStatusService {
  private baseUrl = 'https://localhost:7036/api/UserBookingStatus';

  constructor(private http: HttpClient) { }

  getBookingData(bookingDate: Date, bookingTime: string, bookedRoom: string, employeeId?: number): Observable<any[]> {
    // Create query parameters
    let params = new HttpParams()
      .set('bookingDate', bookingDate.toISOString())
      .set('bookingTime', bookingTime)
      .set('bookedRoom', bookedRoom);

    if (employeeId !== undefined) {
      params = params.set('employeeId', employeeId.toString());
    }

    // Make the HTTP GET request
    return this.http.get<any[]>(this.baseUrl, { params }).pipe(
      catchError(error => {
        // Handle errors here if needed
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
