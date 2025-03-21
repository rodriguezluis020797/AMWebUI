import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  setCookie(key: string, value: string) {
    this.cookieService.set(key, value, {
      path: '/',
      sameSite: 'Strict',
    });
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  deleteCookie(key: string) {
    this.cookieService.delete(key);
  }

  deleteAllCookies() {
    this.cookieService.deleteAll();
  }
}
