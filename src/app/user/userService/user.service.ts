import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDetails } from '../employeedetails';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private contactAdminUrl = 'https://localhost:7036/api/ContactAdmin';

  constructor(private http: HttpClient) {}

  // Method to send a message to the admin
  sendMessage(
    subject: string,
    messageText: string,
    employeeId: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      subject: subject,
      messageText: messageText,
      employeeId: employeeId,
    };

    return this.http.post(this.contactAdminUrl, body, { headers: headers });
  }
  private apiUrl = 'https://localhost:7036/api/employees';

  getEmployeeDataById(id: number): Observable<EmployeeDetails> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EmployeeDetails>(url);
  }
}
