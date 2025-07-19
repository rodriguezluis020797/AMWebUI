import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../_services/identity.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CurrentStateService } from '../../_services/current-state.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { ProviderDTO } from '../../models/ProviderDTO';

@Component({
  standalone: true,
  selector: 'am-log-in',
  imports: [FormsModule, CommonModule, RouterLink, LoadingScreenComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  dto: ProviderDTO = new ProviderDTO();
  loading = false;
  message: string | null = null;

  ngOnInit() {
    this.dto.eMail = 'rodriguez.luis020797@gmail.com';
    this.dto.currentPassword = 'aHo@FSTZEbre';
  }

  submit(event: MouseEvent) {
    event.stopPropagation();
    this.loading = true;
    this.identityService.loginAsync(this.dto).subscribe((result) => {

      if (result === null) {
        this.loading = false;
        return;
      }

      if (result.errorMessage !== null) {
        this.message = result.errorMessage;
        this.dto.currentPassword = '';
        this.loading = false;
        return;
      }

      this.currentStateService.loggedInSubject.next(true);
      this.currentStateService.lastPingSubject.next(new Date());
      this.currentStateService.accountStatusSubject.next(result.accountStatus);


      if (result.isSpecialCase === true) {
        this.currentStateService.temporaryPasswordSubject.next(true);
        this.router.navigate(['update-password']);
      } else {
        this.router.navigate(['dashboard']);
      }
      this.loading = false;
    });
  }
}
