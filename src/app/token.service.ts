import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  nameidentifier: number;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'jwt_token';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    console.log(`token : ${localStorage.getItem(this.tokenKey)}`);
    return localStorage.getItem(this.tokenKey)
    
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  decodeToken(): CustomJwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      console.log(`the decoded token is ${JSON.stringify(jwtDecode<CustomJwtPayload>(token))}`);
      return jwtDecode<CustomJwtPayload>(token);

    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  getNameIdentifier(): number | null {
    const decoded = this.decodeToken();
    return decoded ? decoded.nameidentifier : null;
  }

  getFullName(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded.name : null;
  }

  getRole(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded.role : null;
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  }
}
