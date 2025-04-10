import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentStateService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }
  getLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}
