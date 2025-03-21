import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { LogInComponent } from './partials/log-in/log-in.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemstatusService } from './services/systemstatus.service';
import { RequestStatusEnum } from '../models/Enums';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    LogInComponent,
    LoadingScreenComponent,
    SystemUnavailableComponent,
    SignUpComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private systemStatusService: SystemstatusService) {}
  title = 'AM';
  loggedIn = false;
  loading = true;
  systemAvailable = false;

  ngOnInit() {
    this.isSystemAvailable();
  }

  isSystemAvailable() {
    this.systemStatusService.fullSystemCheckAsync().subscribe((result) => {
      if (result.requestStatus === RequestStatusEnum.Success) {
        this.systemAvailable = true;
        this.isLoggedIn();
      } else {
        this.loading = false;
      }
    });
  }

  isLoggedIn() {
    this.loading = false;
    return this.loggedIn; //eventually check for a user cookie and authenticate it
  }
}
