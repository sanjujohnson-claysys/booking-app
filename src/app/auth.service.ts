import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7036/api/login'; // Replace with your backend API URL
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
//
// import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private jwtHelper: JwtHelperService = new JwtHelperService();
//   private token: string | null = null;

//   constructor(private http: HttpClient) {}

//   // Method to log in a user and obtain a JWT token from the server
//   login(username: string, password: string): Observable<boolean> {
//     return this.http
//       .post<any>('your-api-url/login', { username, password })
//       .pipe(
//         map((response) => {
//           const token = response.token; // Assuming the server sends the token
//           if (token) {
//             this.token = token;
//             return true;
//           }
//           return false;
//         })
//       );
//   }

//   // Method to log out the user and clear the token
//   logout(): void {
//     this.token = null;
//   }

//   // Method to check if a user is authenticated
//   isAuthenticated(): boolean {
//     return !this.jwtHelper.isTokenExpired(this.token);
//   }

//   // Method to get the user's username from the token
//   getUsername(): string | null {
//     if (this.token) {
//       const decodedToken = this.jwtHelper.decodeToken(this.token);
//       return decodedToken.username;
//     }
//     return null;
//   }
// }
//
