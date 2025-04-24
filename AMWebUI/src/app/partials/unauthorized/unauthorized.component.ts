import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'am-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
  standalone: true,
})
export class UnauthorizedComponent {
  countdown: number;
  constructor(
    private router: Router,
    private identityService: IdentityService
  ) {
    this.countdown = 20;
  }

  ngOnInit() {
    this.identityService.logoutAsync().subscribe((result) => {
      this.countdownTicker();
    });
  }

  countdownTicker() {
    setTimeout(() => {
      if (this.countdown <= 0) {
        this.router.navigate(['']);
      } else {
        this.countdown = this.countdown - 1;
        this.countdownTicker();
      }
    }, 1000);
  }

  redirectNow() {
    this.router.navigate(['']);
  }
}
