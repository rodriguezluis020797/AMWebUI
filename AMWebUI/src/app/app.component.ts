import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemStatusService } from './services/system-status.service';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CurrentStateService } from './services/current-state.service';
import { filter, of, switchMap, take, map, Observable } from 'rxjs';
import { IdentityService } from './services/identity.service';
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
  ) {}

  title: String = 'AM';
  loading: Boolean = true;

  ngOnInit(): void {
    // Handle system status check
    this.systemStatusService
      .fullSystemCheckAsync()
      .pipe(
        switchMap((result) => {
          console.log(result);
          if (
            Number(result) === HttpStatusCodeEnum.ServerError ||
            Number(result) === HttpStatusCodeEnum.SystemUnavailable
          ) {
            this.loading = false;
            return of(null); // Skip login check if system check failed
          } else {
            return this.getCurrentPath(); // Get the current path and continue with the flow
          }
        }),
        switchMap((currentPath) => {
          // Ensure we do not pass `null` to isCurrentPathAllowlisted
          const validPath = currentPath ?? ''; // Default to empty string if null
          if (!this.isCurrentPathAllowlisted(validPath)) {
            // Only check if logged in if the path is not allowlisted
            return this.identityService.isLoggedInAsync();
          } else {
            this.loading = false; // No need to check login if path is allowlisted
            return of(null); // Skip login check
          }
        })
      )
      .subscribe((result) => {
        if (
          Number(result) === HttpStatusCodeEnum.ServerError ||
          Number(result) === HttpStatusCodeEnum.SystemUnavailable
        ) {
          //do nothing
        }
        // If we received a response from isLoggedInAsync
        else if (result?.status === HttpStatusCodeEnum.LoggedIn) {
          this.currentStateService.loggedInSubject.next(true);
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['']);
        }

        this.loading = false; // Ensure loading is set to false once everything is done
      });
  }

  isCurrentPathAllowlisted(currentPath: string): boolean {
    return this.allowlistedRoutes.includes(currentPath);
  }

  // Get the current path from the router
  getCurrentPath(): Observable<string> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd), // Ensure navigation is completed
      take(1), // Only take the first NavigationEnd event
      map(() => {
        const currentPath = this.router.url.split('?')[0].split('#')[0]; // Strip query and fragment
        console.log('Current path:', currentPath); // Log for debugging
        return currentPath;
      })
    );
  }

  private readonly allowlistedRoutes = [
    '/verify-email',
    '/unauthorized',
    '/error',
  ];

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

    const timeDifferenceInMs = timeNow.getTime() - timeLastPinged.getTime();
    console.log('timeDifferenceInMs: ' + timeDifferenceInMs);

    const timeDifferenceInMin = timeDifferenceInMs / 60000;
    console.log('timeDifferenceInMin: ' + timeDifferenceInMin);

    if (0 < timeDifferenceInMin) {
      console.log('Ping performed...');
      this.identityService.pingAsync().subscribe((result) => {
        this.currentStateService.lastPingSubject.next(new Date());
      });
    } else {
      console.log('Not time yet... ping not needed');
    }
    console.log('');
  }
}
