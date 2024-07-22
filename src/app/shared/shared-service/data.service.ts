import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListBookingDetails } from '../booking-details';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://localhost:7036/api';
  // Define methods to fetch data from different endpoints
  // getBookingDetails(): Observable<any> {
  //   const url = 'https://localhost:7036/api/bookingdetails/66';
  //   return this.http.get(url);
  // }
  getBookingDetailsById(bookingId: number): Observable<ListBookingDetails> {
    const url = `${this.baseUrl}/bookingdetails/${bookingId}`; // Assuming your API endpoint follows RESTful conventions
    return this.http.get<ListBookingDetails>(url);
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
  getBookingDetailsForUserByFilter(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetUpdatedBookingDetails`, {
      params,
    });
  }
}
