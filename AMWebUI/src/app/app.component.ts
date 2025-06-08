import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, switchMap, take, map, Observable, EMPTY } from 'rxjs';

import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';

import { SystemStatusService } from './_services/system-status.service';
import { CurrentStateService } from './_services/current-state.service';
import { IdentityService } from './_services/identity.service';
import { HttpStatusCodeEnum } from './models/Enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent,
    FooterComponent,
    LoadingScreenComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'AM';
  loading: boolean = true;

  // Routes that are publicly accessible when entered directly into the browser's address bar
  private readonly allowlistedRoutes: string[] = ['/verify-email', '/reset-password', '/faq', '/provider-review', '/provider-public-view'];

  constructor(
    private systemStatusService: SystemStatusService,
    private currentStateService: CurrentStateService,
    private router: Router,
    private identityService: IdentityService
  ) { }

  ngOnInit(): void {
    // Perform a full system check on startup
    this.systemStatusService.fullSystemCheckAsync()
      .pipe(
        switchMap((result) => {
          if (result === null) {
            // Redirect to error page if system check fails
            this.router.navigate(['/error']);
            this.loading = false;
            return EMPTY;
          }
          return this.getCurrentPath();
        }),
        switchMap((currentPath) => {
          const validPath = currentPath ?? '';
          // If route is not allowlisted, check login status
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
          // Mark user as logged in and navigate to dashboard
          this.currentStateService.loggedInSubject.next(true);
          this.router.navigate(['dashboard']);
        } else {
          // Redirect to home if not logged in
          this.router.navigate(['']);
        }

        this.loading = false;
      });
  }

  /**
   * Checks if a route is in the list of allowlisted routes
   */
  isCurrentPathAllowlisted(currentPath: string): boolean {
    return this.allowlistedRoutes.includes(currentPath);
  }

  /**
   * Returns the current path once navigation ends
   */
  getCurrentPath(): Observable<string> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1),
      map(() => {
        const path = this.router.url.split('?')[0].split('#')[0];
        return path;
      })
    );
  }

  /**
   * Conditionally pings the backend to keep the session alive.
   * Only pings if logged in and enough time has passed.
   */
  pingIfNeeded(): void {
    if (!this.currentStateService.loggedInSubject.value) {
      this.currentStateService.lastPingSubject.next(new Date());
      return;
    }

    const now = new Date();
    const lastPing = this.currentStateService.lastPingSubject.value;
    const timeDifferenceMs = now.getTime() - lastPing.getTime();
    const thresholdMs = 0; // Change to e.g., 300000 (5 min) in prod

    const shouldPing = (timeDifferenceMs > thresholdMs) && this.currentStateService.systemStatus.value;

    if (shouldPing) {
      this.identityService.pingAsync().subscribe(() => {
        this.currentStateService.lastPingSubject.next(new Date());
      });
    }
  }
}