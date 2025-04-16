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
    if (this.isSystemAvailable()) {
      let lastRoute = '';
      if (Boolean(this.cookieService.getCookie('loggedIn'))) {
        lastRoute = this.currentStateService.getLastUrl();
        this.currentStateService.setLoggedIn(true);
      } else {
        this.cookieService.deleteAllCookies();
        this.identityService.logoutAsync().subscribe((result) => {});
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
    }
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
    console.log('+ ping');
    const nowUtc = new Date(); // UTC time by default in JS
    const lastPinged = this.cookieService.getCookie('lastPing');

    if (!lastPinged) {
      console.log('!lastPinged');
      this.performPing(nowUtc);
      console.log('- ping');
      return;
    }

    const lastPingDateUtc = new Date(lastPinged);
    const fiveMinutesInMs = 5 * 60 * 1000;
    const timeSinceLastPing = nowUtc.getTime() - lastPingDateUtc.getTime();

    console.log('nowUtc: ' + nowUtc);
    console.log('lastPingDateUtc: ' + lastPingDateUtc);
    console.log('timeSinceLastPing: ' + timeSinceLastPing);
    if (timeSinceLastPing > fiveMinutesInMs) {
      console.log('timeSinceLastPing > fiveMinutesInMs');
      this.performPing(nowUtc);
    }
    console.log('- ping');
    console.log('|');
  }

  performPing(nowUtc: Date) {
    console.log('+ performPing()');
    this.identityService.pingAsync().subscribe(() => {
      this.cookieService.setCookie('lastPing', nowUtc.toISOString());
    });
    console.log('- performPing()');
  }

  isLoggedIn() {
    return this.currentStateService.getLoggedIn();
  }
}
