import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemStatusService } from './_services/system-status.service';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CurrentStateService } from './_services/current-state.service';
import { filter, of, switchMap, take, map, Observable, EMPTY } from 'rxjs';
import { IdentityService } from './_services/identity.service';
import { HttpStatusCodeEnum } from './models/Enums';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent,
    FooterComponent,
    LoadingScreenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private systemStatusService: SystemStatusService,
    private currentStateService: CurrentStateService,
    private router: Router,
    private identityService: IdentityService
  ) { }

  title: String = 'AM';
  loading: Boolean = true;

  ngOnInit(): void {
    // Handle system status check
    this.systemStatusService
      .fullSystemCheckAsync()
      .pipe(
        switchMap((result) => {
          if (result === null) {
            this.router.navigate(['/error'])
            this.loading = false;
            return EMPTY;
          } else {
            return this.getCurrentPath();
          }
        }),
        switchMap((currentPath) => {
          const validPath = currentPath ?? '';
          if (!this.isCurrentPathAllowlisted(validPath)) {
            return this.identityService.isLoggedInAsync();
          } else {
            this.loading = false;
            return EMPTY;
          }
        })
      )
      .subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        if (result.status === HttpStatusCodeEnum.LoggedIn) {
          this.currentStateService.loggedInSubject.next(true);
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['']);
        }
        this.loading = false;
      });
  }

  isCurrentPathAllowlisted(currentPath: string): boolean {
    return this.allowlistedRoutes.includes(currentPath);
  }

  getCurrentPath(): Observable<string> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      take(1),
      map(() => {
        const currentPath = this.router.url.split('?')[0].split('#')[0];
        return currentPath;
      })
    );
  }

  private readonly allowlistedRoutes = ['/verify-email', '/reset-password'];

  pingIfNeeded(): void {
    if (!this.currentStateService.loggedInSubject.value) {
      console.log('Not logged in.. ping not needed');
      this.currentStateService.lastPingSubject.next(new Date());
      return;
    }

    const timeNow = new Date();
    console.log('timeNow: ' + timeNow);

    const timeLastPinged = this.currentStateService.lastPingSubject.value;
    console.log('timeLastPinged: ' + timeLastPinged);

    const msNeededToPing = 0;//300000;
    console.log('msNeededToPing: ' + msNeededToPing);

    const timeDifferenceInMs = timeNow.getTime() - timeLastPinged.getTime();
    console.log('timeDifferenceInMs: ' + timeDifferenceInMs);

    const minutesNeededToPing = msNeededToPing / (1000 * 60);
    console.log('minutesNeededToPing: ' + minutesNeededToPing);

    const timeDifferenceInMin = timeDifferenceInMs / 60000;
    console.log('timeDifferenceInMin: ' + timeDifferenceInMin);

    if (
      minutesNeededToPing < timeDifferenceInMin &&
      this.currentStateService.systemStatus.value == true
    ) {
      console.log('Ping performed...');
      this.identityService.pingAsync().subscribe((result) => {
        this.currentStateService.lastPingSubject.next(new Date());
      });
    } else {
      console.log('Not time yet or system offline... ping not needed');
    }
    console.log('');
  }
}
