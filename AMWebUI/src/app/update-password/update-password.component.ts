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
  styleUrls: ['./update-password.component.css'],  // fixed typo styleUrl -> styleUrls
})
export class UpdatePasswordComponent implements OnInit {
  dto = new ProviderDTO();
  confirmPassword = '';
  loading = true;
  message: string | null = null;

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  ngOnInit(): void {
    this.dto.isTempPassword = this.currentStateService.temporaryPasswordSubject.value;
    this.loading = false;
  }

  submit(): void {
    this.message = null;  // reset message on each submit
    if (this.dto.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }

    this.loading = true;

    this.identityService.updatePasswordAsync(this.dto).subscribe((result) => {
      this.loading = false;

      if (!result) {
        return;
      }

      if (result.errorMessage !== null) {
        this.message = result.isSpecialCase
          ? 'Password does not meet requirements.'
          : 'Current password is wrong, new password has been used too recently, or new password does not meet requirements.';
        return;
      }

      if (result.isSpecialCase) {
        this.currentStateService.temporaryPasswordSubject.next(false);
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['provider-profile']);
      }
    });
  }
}