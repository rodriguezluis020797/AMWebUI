import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentityService } from '../_services/identity.service';
import { ProviderDTO } from '../models/ProviderDTO';
import { CurrentStateService } from '../_services/current-state.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';

@Component({
  standalone: true,
  selector: 'am-update-password',
  imports: [FormsModule, CommonModule, RouterLink, LoadingScreenComponent],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  ngOnInit(): void {
    this.dto.isTempPassword =
      this.currentStateService.temporaryPasswordSubject.value;
    this.loading = false;
  }
  dto = new ProviderDTO();
  confirmPassword: string = '';
  loading: Boolean = true;
  message: string | null = null;

  submit() {
    this.loading = true;
    if (this.dto.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.loading = false;
      return;
    }

    this.identityService.updatePasswordAsync(this.dto).subscribe((result) => {
      if (result === null) {
        return;
      }

      if (result.errorMessage !== null) {
        if (result.isSpecialCase) {
          this.message = 'Password does not meet requirements.';
        } else {
          this.message =
            'Current password is wrong, new password has been used too recently, or new password does not meet requirements.';
        }
        this.loading = false;
        return;
      }

      if (result.isSpecialCase) {
        this.currentStateService.temporaryPasswordSubject.next(false);
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['provider-profile']);
      }
      this.loading = false;
    });
  }
}
