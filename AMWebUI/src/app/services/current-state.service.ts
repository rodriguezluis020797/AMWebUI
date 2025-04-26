import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentStateService {
  //#region Logged In Subject
  readonly loggedInSubject = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$ = this.loggedInSubject.asObservable();
  //#endregion

  //#region Temporary Password Subject
  readonly temporaryPasswordSubject = new BehaviorSubject<boolean>(false);
  //#endregion

  //#region Should Ping Subject
  readonly lastPingSubject = new BehaviorSubject<Date>(new Date());
  //#endregion

  constructor(private readonly router: Router) {}
}
