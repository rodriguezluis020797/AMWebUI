import { Component } from '@angular/core';
import { CookiesService } from '../services/cookies.service';
import { UserDTO } from '../../models/UserDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'am-reset-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(private router: Router) {}
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

      setTimeout(() => {
        this.disableSubmit = false;
      }, 3000);
    }
  }
}
