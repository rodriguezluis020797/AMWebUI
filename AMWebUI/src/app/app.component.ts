import { Component } from '@angular/core';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemStatusService } from './services/system-status.service';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CookiesService } from './services/cookies.service';
import { CurrentStateService } from './services/current-state.service';
import { filter } from 'rxjs';
import { IdentityService } from './services/identity.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent,
    FooterComponent,
    LoadingScreenComponent,
    SystemUnavailableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private systemStatusService: SystemStatusService,
    private cookieService: CookiesService,
    private currentStateService: CurrentStateService,
    private router: Router,
    private identityService: IdentityService
  ) {}

  title = 'AM';
  loading = true;
  systemAvailable = false;

  ngOnInit() {
    this.systemStatusService.fullSystemCheckAsync().subscribe((result) => {
      this.systemAvailable = result;
      this.loading = false;

      if (!result) {
        this.router.navigate(['/error']);
        return;
      }

      // Only runs if system is available
      let lastRoute = '';

      if (Boolean(this.cookieService.getCookie('loggedIn'))) {
        lastRoute = this.currentStateService.getLastUrl();
        this.currentStateService.setLoggedIn(true);
      } else {
        this.cookieService.deleteAllCookies();
        this.identityService.logoutAsync().subscribe();
        this.currentStateService.setLoggedIn(false);
      }

      setTimeout(() => {
        if (
          lastRoute &&
          lastRoute !== '' &&
          !this.currentStateService.shouldIgnoreUrl(lastRoute)
        ) {
          this.router.navigateByUrl(lastRoute);
        } else {
          this.cookieService.deleteAllCookies();
          this.router.navigate(['']);
        }
      });

      // ✅ Router events will now fire correctly
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const previousUrl = this.currentStateService.getCurrentUrl();
          this.currentStateService.setLastUrl(previousUrl);
          this.currentStateService.setCurrentUrl(event.urlAfterRedirects);
        });
    });
  }

  isSystemAvailable(): boolean {
    this.systemStatusService.fullSystemCheckAsync().subscribe((result) => {
      this.systemAvailable = result;
      this.loading = false;

      if (!result) {
        this.router.navigate(['/error']);
      }
    });
    return false;
  }

  ping(): void {
    const nowUtc = new Date();
    const lastPinged = this.cookieService.getCookie('lastPing');

    if (!lastPinged) {
      this.performPing(nowUtc);
      return;
    }

    const lastPingDateUtc = new Date(lastPinged);
    const fiveMinutesInMs = 5 * 60 * 1000;
    const timeSinceLastPing = nowUtc.getTime() - lastPingDateUtc.getTime();

    if (timeSinceLastPing > fiveMinutesInMs) {
      this.performPing(nowUtc);
    }
  }

  performPing(nowUtc: Date) {
    this.identityService.pingAsync().subscribe(() => {
      this.cookieService.setCookie('lastPing', nowUtc.toISOString());
    });
  }

  isLoggedIn() {
    return this.currentStateService.getLoggedIn();
  }
}
