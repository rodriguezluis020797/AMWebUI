import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemStatusService } from '../../services/system-status.service';
import { CurrentStateService } from '../../services/current-state.service';
import { CookiesService } from '../../services/cookies.service';

@Component({
  standalone: true,
  selector: 'am-system-unavailable',
  imports: [],
  templateUrl: './system-unavailable.component.html',
  styleUrl: './system-unavailable.component.css',
})
export class SystemUnavailableComponent implements OnInit {
  constructor(
    private router: Router,
    private systemStatusService: SystemStatusService,
    private currentStateService: CurrentStateService,
    private cookieService: CookiesService
  ) {}
  ngOnInit(): void {
    this.cookieService.deleteAllCookies();
    this.currentStateService.setLoggedIn(false);
  }

  time = new Date();
  shortTime = this.time.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
  message: string = 'Last checked at ' + this.shortTime + '.';

  reCheckSytemstatus(): void {
    this.systemStatusService.fullSystemCheckAsync().subscribe((result) => {
      if (result) {
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      } else {
        this.time = new Date();
        this.shortTime = this.time.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        this.message = 'Last checked at ' + this.shortTime + '.';
      }
    });
  }
}
