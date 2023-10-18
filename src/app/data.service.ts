import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Define methods to fetch data from different endpoints
  getBookingDetails(): Observable<any> {
    const url = 'https://localhost:7036/api/bookingdetails/2';
    return this.http.get(url);
  }
  postBookingDetails(data: any): Observable<any> {
    const url = 'https://localhost:7036/api/bookingdetails';
    console.log(data);
    return this.http.post(url, data);
  }

  getEmployees(): Observable<any> {
    const url = 'https://localhost:7036/api/employees';
    return this.http.get(url);
  }
  postEmployees(data: any): Observable<any> {
    const url = 'https://localhost:7036/api/employees';
    return this.http.post(url, data);
  }
  getBookingsByEmployeeAndStatus(employeeId: number): Observable<any> {
    const url = `https://localhost:7036/api/bookingdetails/get-by-employee-and-status/${employeeId}`;
    return this.http.get(url);
  }
}
