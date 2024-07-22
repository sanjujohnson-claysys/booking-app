import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarkUnavailable } from '../../shared/mark-unavailable';

@Injectable({
  providedIn: 'root',
})
export class MarkWorkspaceUnavailableService {
  private apiUrl = 'https://localhost:7036/api/AdminActions/MarkUnavailable';
  private apiBaseUrl = 'https://localhost:7036';

  constructor(private http: HttpClient) {}

  markUnavailable(data: MarkUnavailable): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(this.apiUrl, data, httpOptions);
  }
  cancelBooking(bookingId: number): Observable<any> {
    const requestData = {  bookingId };
    return this.http.post(
      `${this.apiBaseUrl}/api/Cancel/CancelBooking`,
      requestData,{ responseType: 'text' }
    );
  }
}
