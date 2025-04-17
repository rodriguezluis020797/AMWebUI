import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentityService } from '../services/identity.service';
import { ProviderDTO } from '../models/ProviderDTO';

@Component({
  standalone: true,
  selector: 'am-reset-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(
    private identityService: IdentityService,
    private router: Router
  ) {}
  dto = new ProviderDTO();
  confirmPassword: string = '';
  disableSubmit: boolean = false;

  submit() {
    this.disableSubmit = true;
    this.identityService.resetPasswordAsync(this.dto).subscribe((provider) => {
      this.dto = provider;
      if (this.dto.firstName !== '') {
        this.router.navigate(['dashboard']);
      } else {
        this.confirmPassword = '';
      }
    });
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
