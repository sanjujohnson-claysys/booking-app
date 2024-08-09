import{CustomJwtPayload} from '../../token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from '../../environment';
import { TokenService } from '../../token.service';
import { Injectable } from '@angular/core';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`, { email, password }).pipe(
      tap((response) => {
        if (response.token) {
          this.tokenService.setToken(response.token);
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken() && !this.tokenService.isTokenExpired();
  }

  getUserInfo(): { customJwtPayload: CustomJwtPayload }  {
    const customJwtPayload: CustomJwtPayload = {
      nameidentifier: this.tokenService.getNameIdentifier() || -1,
      name: this.tokenService.getFullName() || '',
      role: this.tokenService.getRole() || ''
    };
    console.log(customJwtPayload);

    return { customJwtPayload: customJwtPayload };
  }

    
  }
