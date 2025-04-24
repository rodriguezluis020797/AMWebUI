import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemStatusService } from './services/system-status.service';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CookiesService } from './services/cookies.service';
import { CurrentStateService } from './services/current-state.service';
import { filter, of, switchMap } from 'rxjs';
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

  title = 'AM';
  loading = true;

  ngOnInit(): void {
    this.systemStatusService
      .fullSystemCheckAsync()
      .pipe(
        switchMap((systemOk) => {
          if (!systemOk) {
            this.router.navigate(['/error']);
            return of(null); // stop the chain
          }
          return this.identityService.isLoggedInAsync();
        })
      )
      .subscribe((isLoggedIn) => {
        if (isLoggedIn === null) {
          this.loading = false;
          return;
        }

        if (isLoggedIn) {
          this.currentStateService.loggedInSubject.next(true);
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['']);
        }

        this.loading = false;
      });
  }

  pingIfNeeded(): void {
    const nowUtc = this.currentStateService.getUTCDate(new Date());
    const lastPinged = this.currentStateService.lastPingSubject.value;

    console.log('Now UTC: ' + nowUtc);
    console.log('Last Pinged: ' + lastPinged);

    const shouldPing =
      !lastPinged || nowUtc.getTime() - lastPinged.getTime() > 5 * 60 * 1000;

    if (!shouldPing) return;

    console.log('Ping at ' + nowUtc);
    this.identityService.pingAsync().subscribe((result) => {
      this.currentStateService.lastPingSubject.next(nowUtc);
      console.log('result.status: ' + result.status);
      if (result.status === HttpStatusCodeEnum.Unauthorized) {
        this.router.navigate(['/unauthorized']);
      }
    });
  }
}
