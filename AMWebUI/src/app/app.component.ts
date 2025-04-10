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
import { IdentityPingDirective } from './directives/identity-ping.directive';
import { CurrentStateService } from './services/current-state.service';
import { filter } from 'rxjs';

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
    private router: Router
  ) {}
  title = 'AM';
  loggedIn = false;
  loading = true;
  systemAvailable = false;
  ngOnInit() {
    if (Boolean(this.cookieService.getCookie('loggedIn'))) {
      this.currentStateService.setLoggedIn(true);
    }
    const lastRoute = this.currentStateService.getLastUrl();

    // Use timeout to defer navigation until after initial render cycle
    setTimeout(() => {
      if (lastRoute && !this.currentStateService.shouldIgnoreUrl(lastRoute)) {
        this.router.navigateByUrl(lastRoute);
      } else {
        this.router.navigate(['']);
      }
    });

    // Save each successful route change
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

  isLoggedIn() {
    return this.currentStateService.getLoggedIn();
  }
}
