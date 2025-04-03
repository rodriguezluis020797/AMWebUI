import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookiesService } from './cookies.service';
import { CookieEnum, RequestStatusEnum } from '../../models/Enums';
import { IdentityService } from './identity.service';
import { UserDTO } from '../../models/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private cookieService: CookiesService, private router: Router) {}

  public isAuthenticated(): boolean {
    let token = this.cookieService.getCookie(CookieEnum.JWT.toString());

    if (!token || token.trim() === '') {
      this.cookieService.deleteAllCookies();
      this.router.navigate(['']);
      return false;
    }

    if (this.isTokenExpired()) {
      if (!this.tokenRefreshAttempt()) {
        this.cookieService.deleteAllCookies();
        this.router.navigate(['']);
      }
    }
    return true;
  }

  isTokenExpired(): boolean {
    try {
      const token = this.cookieService.getCookie(CookieEnum.JWT.toString());
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
      const expirationTimeUtc = new Date(payload.exp * 1000).getTime(); // Convert to UTC milliseconds
      const nowUtc = new Date().getTime(); // Current UTC time in milliseconds

      return expirationTimeUtc < nowUtc; // Check expiration
    } catch (error) {
      return true; // If decoding fails, consider it invalid
    }
  }

  tokenRefreshAttempt(): boolean {
    return true;
  }
}
