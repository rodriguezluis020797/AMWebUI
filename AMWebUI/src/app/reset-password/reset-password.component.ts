import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentityService } from '../services/identity.service';
import { ProviderDTO } from '../models/ProviderDTO';
import { CurrentStateService } from '../services/current-state.service';
import { error } from 'console';

@Component({
  standalone: true,
  selector: 'am-reset-password',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) {}
  ngOnInit(): void {
    this.currentStateService.isTemporaryPassword$.subscribe((result) => {
      this.dto.isTempPassword = result;
    });
  }
  dto = new ProviderDTO();
  confirmPassword: string = '';
  disableSubmit: boolean = false;

  submit() {
    this.disableSubmit = true;
    this.identityService.resetPasswordAsync(this.dto).subscribe((provider) => {
      this.dto = provider;
      if (this.dto.errorMessage !== '') {
        if (this.dto.isTempPassword) {
          this.dto.errorMessage = 'Password does not meet requirements.';
        } else {
          this.dto.errorMessage =
            'Current password is wrong, new password has been used too recently, or new password does not meet requirements.';
        }
      }
      if (this.dto.firstName !== '') {
        if (this.dto.isTempPassword) {
          this.currentStateService.temporaryPasswordSubject.next(false);
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['provider-profile']);
        }
      } else {
        this.confirmPassword = '';
      }
    });
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
