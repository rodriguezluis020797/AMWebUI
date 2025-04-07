import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { LogInComponent } from './partials/log-in/log-in.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemStatusService } from './services/system-status.service';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { RouterOutlet } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CookiesService } from './services/cookies.service';
import { IdentityPingDirective } from './directives/identity-ping.directive';

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
    IdentityPingDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private systemStatusService: SystemStatusService,
    private cookieService: CookiesService
  ) {}
  title = 'AM';
  loggedIn = false;
  loading = true;
  systemAvailable = false;

  ngOnInit() {
    this.cookieService.deleteAllCookies(); //Delete for stage/production
    this.isSystemAvailable();
  }

  isSystemAvailable() {
    this.systemStatusService.fullSystemCheckAsync().subscribe((result) => {
      this.systemAvailable = true;
      this.loading = false;
    });
  }

  isLoggedIn() {
    this.loading = false;
    return this.loggedIn; //eventually check for a user cookie and authenticate it
  }
}
