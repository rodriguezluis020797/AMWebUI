import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemStatusService } from '../../_services/system-status.service';
import { CurrentStateService } from '../../_services/current-state.service';
import { CookiesService } from '../../_services/cookies.service';
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
  ) { }
  ngOnInit(): void {
    this.currentStateService.systemStatus.next(false);
  }

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
      if (result === null) {
        this.time = new Date();
        this.shortTime = this.time.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        this.message = 'Last checked at ' + this.shortTime + '.';
      } else {
        this.currentStateService.systemStatus.next(true);
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }
      this.loading = false;
    });
  }
}
