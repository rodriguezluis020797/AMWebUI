import { Component } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentityService } from '../services/identity.service';
import { IdentityPingDirective } from '../directives/identity-ping.directive';

@Component({
  standalone: true,
  selector: 'am-reset-password',
  imports: [FormsModule, CommonModule, IdentityPingDirective],
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
    this.disableSubmit = true;
    this.identityService.resetPasswordAsync(this.dto).subscribe((user) => {
      this.dto = user;
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
