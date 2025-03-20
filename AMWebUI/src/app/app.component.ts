import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { LogInComponent } from './partials/log-in/log-in.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { SystemstatusService } from './services/systemstatus.service';
import { RequestStatusEnum } from '../models/Enums';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private systemStatusService: SystemstatusService) {}
  title = 'AM';
  loggedIn = false;
  loading = true;

  ngOnInit() {
    this.isSystemAvailable();
  }

  isSystemAvailable() {
    this.systemStatusService.fullSystemCheckAsyinc().subscribe((result) => {
      if (result.requestStatus === RequestStatusEnum.Success) {
        this.isLoggedIn();
      } else {
        //sytem down
      }
    });
  }

  isLoggedIn() {
    this.loading = false;
    return this.loggedIn; //eventually check for a user cookie and authenticate it
  }
}
