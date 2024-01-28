import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeIds } from './employee-ids';

@Injectable({
  providedIn: 'root',
})
export class FetchEmployeeIdsService {
  private apiUrl = 'https://localhost:7036/api/FetchEmployeeIdsAndNames';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeIds[]> {
    return this.http.get<EmployeeIds[]>(this.apiUrl);
  }
}
