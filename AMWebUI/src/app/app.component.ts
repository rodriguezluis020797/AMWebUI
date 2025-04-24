import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { SystemStatusService } from './services/system-status.service';
import { LoadingScreenComponent } from './partials/loading-screen/loading-screen.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CurrentStateService } from './services/current-state.service';
import { filter, of, switchMap, take } from 'rxjs';
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

  private readonly allowlistedRoutes = [
    '/',
    '/verify-email',
    '/unauthorized',
    '/error',
  ];

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
        switchMap((event) => {
          const currentUrl = (event as NavigationEnd).urlAfterRedirects.split(
            '?'
          )[0];
          const shouldCheckLogin = !this.allowlistedRoutes.includes(currentUrl);

          return this.systemStatusService.fullSystemCheckAsync().pipe(
            switchMap((systemOk) => {
              if (!systemOk) {
                this.router.navigate(['/error']);
                return of(null);
              }

              // Only perform login check if route is not allowlisted
              return shouldCheckLogin
                ? this.identityService.isLoggedInAsync()
                : of(null);
            })
          );
        })
      )
      .subscribe((isLoggedIn) => {
        const currentUrl = this.router.url.split('?')[0];

        if (isLoggedIn === null) {
          this.loading = false;
          return;
        }

        this.currentStateService.loggedInSubject.next(isLoggedIn);

        if (isLoggedIn && (currentUrl === '/' || currentUrl === '/login')) {
          this.router.navigate(['dashboard']);
        } else if (!isLoggedIn) {
          this.router.navigate(['']);
        }

        this.loading = false;
      });
  }

  pingIfNeeded(): void {
    const nowUtc = this.currentStateService.getUTCDate(new Date());
    const lastPinged = this.currentStateService.lastPingSubject.value;

    const shouldPing =
      !lastPinged || nowUtc.getTime() - lastPinged.getTime() > 5 * 60 * 1000;

    if (!shouldPing) return;

    this.identityService.pingAsync().subscribe((result) => {
      this.currentStateService.lastPingSubject.next(nowUtc);
      if (result.status === HttpStatusCodeEnum.Unauthorized) {
        this.router.navigate(['/unauthorized']);
      }
    });
  }
}
