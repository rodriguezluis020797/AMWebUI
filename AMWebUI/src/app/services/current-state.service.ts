import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentStateService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private lastUrl: string = '';
  private currentUrl: string = '';

  constructor(private router: Router, private cookieService: CookiesService) {
    this.initializeLoggedInState();
  }

  private initializeLoggedInState(): void {
    const isLoggedIn = this.cookieService.getCookie('loggedIn') === 'true';
    this.loggedInSubject.next(isLoggedIn);
  }

  setLoggedIn(value: boolean) {
    if (!value) {
      this.cookieService.deleteAllCookies();
    } else {
      this.cookieService.setCookie('loggedIn', String(value));
    }
    this.loggedInSubject.next(value);
  }

  getLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  setCurrentUrl(url: string): void {
    console.log('setCurrentUrl: ' + url);
    this.currentUrl = url;
    this.cookieService.setCookie('currentUrl', url);
  }

  setLastUrl(url: string): void {
    console.log('setLastUrl: ' + url);
    this.cookieService.setCookie('lastUrl', url);
  }

  getLastUrl(): string {
    console.log(
      'getLastUrl: ' + this.cookieService.getCookie('lastUrl') || '/'
    );
    return this.cookieService.getCookie('lastUrl') || '/';
  }

  getCurrentUrl(): string {
    console.log('getCurrentUrl: ' + this.currentUrl);
    return this.currentUrl;
  }

  shouldIgnoreUrl(url: string): boolean {
    const ignoredRoutes = ['/sign-up', '/error', '/unauthorized'];
    return ignoredRoutes.includes(url);
  }
}
