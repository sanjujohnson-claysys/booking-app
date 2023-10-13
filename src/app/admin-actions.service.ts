import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminActionsService {
  private apiUrl = 'https://localhost:7036/api/AdminActions/cancelBookingAndMarkUnavailable'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  cancelBookingAndMarkUnavailable(bookingId: number, workspaceNumbers: string[]): Observable<any> {
    const request = {
      bookingId: bookingId,
      workspaceNumbers: workspaceNumbers,
    };
    return this.http.post(this.apiUrl + '/cancelBookingAndMarkUnavailable', request);
  }
}
