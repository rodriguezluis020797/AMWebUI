import { Component } from '@angular/core';
import { ProviderDTO } from '../models/ProviderDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { RouterLink } from '@angular/router';
import { IdentityService } from '../_services/identity.service';

@Component({
  selector: 'am-reset-password',
  imports: [FormsModule, CommonModule, RouterLink, LoadingScreenComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(private identityService: IdentityService) { }

  dto: ProviderDTO = new ProviderDTO();
  loading: Boolean = false;
  success: Boolean = false;

  submit() {
    this.loading = true;
    this.identityService.resetPasswordAsync(this.dto).subscribe((result) => {
      this.setTimeout();
    });
  }

  private setTimeout() {
    setTimeout(() => {
      this.loading = false;
      this.success = true;
    }, 3000);
  }
}
