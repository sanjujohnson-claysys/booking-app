// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class adminBookingService {
  private apiUrl = 'https://localhost:7036/api/BookingAdmin'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getBookings(
    startDate: Date,
    endDate: Date,
    roomFilter?: string,
    workspaceFilter?: string,
    employeeIdFilter?: number,
    personNameFilter?: string,
    statusFilter?: string
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    if (roomFilter) {
      params = params.set('roomFilter', roomFilter);
    }

    if (workspaceFilter) {
      params = params.set('workspaceFilter', workspaceFilter);
    }

    if (employeeIdFilter) {
      params = params.set('employeeIdFilter', employeeIdFilter.toString());
    }

    if (personNameFilter) {
      params = params.set('personNameFilter', personNameFilter);
    }

    if (statusFilter) {
      params = params.set('statusFilter', statusFilter);
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}

