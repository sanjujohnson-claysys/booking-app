import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode'; // Import jwt_decode from the library

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7036/api/auth/login'; // Replace with your backend API URL
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log("auth service login method");
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      // Assuming the response contains a 'token' field
      tap((response: { token: string; }) => {
        if (response.token) {
          this.setToken(response.token); // Setting the token in local storage
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  getUserInfo(): { nameIdentifier: string, fullName: string, role: string } {
    const { nameIdentifier, fullName, role } = this.decodeRoles();
    return { nameIdentifier, fullName, role };
  }

  decodeRoles():any{
    const token = this.getToken();
    let nameIdentifier = null;
    let fullName = null;
    let role = null;
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token); // Decoding the JWT token

      // Accessing specific claims from the decoded token
      nameIdentifier = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      fullName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      // Displaying the obtained claims data (you can modify this as needed)
      console.log('Name Identifier:', nameIdentifier);
      console.log('Full Name:', fullName);
      console.log('Role:', role);

    
  }
  return [nameIdentifier ,fullName,role]
}
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token); // Decoding the JWT token

      // Accessing specific claims from the decoded token
      const nameIdentifier = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const fullName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      // Displaying the obtained claims data (you can modify this as needed)
      console.log('Name Identifier:', nameIdentifier);
      console.log('Full Name:', fullName);
      console.log('Role:', role);

      // Add the token to the request headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
