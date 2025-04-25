import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state.service';
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
  ) {}

  dto: ProviderDTO = new ProviderDTO();
  loading = false;
  message: string | null = null;

  ngOnInit() {
    this.dto.eMail = 'jdoe@gmail.com';
    this.dto.currentPassword = 'abcdef1#G';
  }

  submit() {
    this.loading = true;
    this.identityService.loginAsync(this.dto).subscribe((result) => {
      if (result.errorMessage !== null) {
        this.message = result.errorMessage;
        this.loading = false;
        return;
      }

      this.currentStateService.loggedInSubject.next(true);
      if (result.isSpecialCase === true) {
        this.currentStateService.temporaryPasswordSubject.next(true);
        this.router.navigate(['reset-password']);
      } else {
        this.router.navigate(['dashboard']);
      }

      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  }
}
