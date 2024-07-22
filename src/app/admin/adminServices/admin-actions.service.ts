import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminActionsService {
  private apiUrl =
    'https://localhost:7036/api/AdminActions/cancelBookingAndMarkUnavailable'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  cancelBookingAndMarkUnavailable(
    bookingId: number,
    workspaceNumbers: string[]
  ): Observable<any> {
    const request = {
      bookingId: bookingId,
      workspaceNumbers: workspaceNumbers,
    };
    return this.http.post(
      this.apiUrl + '/cancelBookingAndMarkUnavailable',
      request
    );
  }
  private baseUrl =
    'https://localhost:7036/api/BookingDetailsWithFiltersForAdmin';

  getBookingDataByFilters(filters: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params: filters });
  }

  getMessagesByDateRange(
    startDate: string,
    endDate: string
  ): Observable<any[]> {
    // Create query parameters for the start and end date
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    // Make the HTTP GET request to your API
    return this.http.get<any[]>(
      'https://localhost:7036/api/FetchMessageForAdmin/dateRange',
      { params }
    );
  }
}
