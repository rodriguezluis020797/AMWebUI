import { Component } from '@angular/core';
import { UserDTO } from '../../models/UserDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentityService } from '../services/identity.service';
import { RequestStatusEnum } from '../../models/Enums';

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
  dto = new UserDTO();
  confirmPassword: string = '';
  disableSubmit: boolean = false;

  submit() {
    if (!this.dto.password || this.dto.password.trim() === '') {
      this.dto.errorMessage = 'Please enter password';
    } else if (this.dto.password !== this.confirmPassword) {
      this.dto.errorMessage = "Passwords don't match";
    } else {
      this.disableSubmit = true;
      this.identityService.resetPasswordAsync(this.dto).subscribe((user) => {
        this.dto = user;
        if (this.dto.requestStatus === RequestStatusEnum.Success) {
          this.router.navigate(['dashboard']);
        }
      });
      setTimeout(() => {
        this.disableSubmit = false;
      }, 3000);
    }
  }
}
