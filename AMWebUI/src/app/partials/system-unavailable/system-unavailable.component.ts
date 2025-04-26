import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemStatusService } from '../../services/system-status.service';
import { CurrentStateService } from '../../services/current-state.service';
import { CookiesService } from '../../services/cookies.service';
import { HttpStatusCodeEnum } from '../../models/Enums';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'am-system-unavailable',
  imports: [CommonModule, LoadingScreenComponent],
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
  ngOnInit(): void {}

  loading: Boolean = false;
  time = new Date();
  shortTime = this.time.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
  message: string = 'Last checked at ' + this.shortTime + '.';

  reCheckSytemstatus(): void {
    this.loading = true;
    this.systemStatusService.fullSystemCheckAsync().subscribe((result) => {
      if (
        Number(result) === HttpStatusCodeEnum.ServerError ||
        Number(result) === HttpStatusCodeEnum.SystemUnavailable
      ) {
        this.time = new Date();
        this.shortTime = this.time.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        this.message = 'Last checked at ' + this.shortTime + '.';
      } else {
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }
      this.setTimeout();
    });
  }

  private setTimeout() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
