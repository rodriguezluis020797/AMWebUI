import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { LogInComponent } from './partials/log-in/log-in.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemStatusService } from './services/system-status.service';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CookiesService } from './services/cookies.service';
import { CurrentStateService } from './services/current-state.service';
import { filter } from 'rxjs';
import { IdentityService } from './services/identity.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HomeComponent,
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
  loggedIn = false;
  loading = true;
  systemAvailable = false;
  ngOnInit() {
    let lastRoute = '';
    if (Boolean(this.cookieService.getCookie('loggedIn'))) {
      lastRoute = this.currentStateService.getLastUrl();
      this.currentStateService.setLoggedIn(true);
    } else {
      this.cookieService.deleteAllCookies();
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

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentStateService.setLastUrl(event.urlAfterRedirects);
      });

    this.isSystemAvailable();

    this.currentStateService.isLoggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });
  }
  isSystemAvailable() {
    this.systemStatusService.fullSystemCheckAsync().subscribe((result) => {
      this.systemAvailable = true;
      this.loading = false;
    });
  }

  ping(): void {
    const now = new Date();
    const lastPinged = this.cookieService.getCookie('lastPing');

    if (!lastPinged) {
      this.cookieService.setCookie('lastPing', now.toISOString());
      return;
    }

    const lastPingDate = new Date(lastPinged);
    const fiveMinutesInMs = 5 * 60 * 1000;

    const timeSinceLastPing = now.getTime() - lastPingDate.getTime();

    if (timeSinceLastPing > fiveMinutesInMs) {
      this.identityService.pingAsync().subscribe((result) => {});
    }
  }

  isLoggedIn() {
    return this.currentStateService.getLoggedIn();
  }
}
