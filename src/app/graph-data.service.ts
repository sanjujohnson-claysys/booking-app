
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {
  constructor(private http: HttpClient) {}

  fetchData(startDate: string, endDate: string): Observable<any[]> {
    const url = `https://localhost:7036/api/Graph?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any[]>(url);
  }
}

