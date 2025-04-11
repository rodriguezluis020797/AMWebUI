import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state.service';

@Component({
  standalone: true,
  selector: 'am-log-in',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) {}

  dto: UserDTO = new UserDTO();
  disableSubmit = false;

  ngOnInit() {
    this.dto.eMail = 'jdoe@gmail.com';
    this.dto.password = 'P@ssw0rd_2025';
  }

  submit() {
    this.disableSubmit = true;
    this.identityService.loginAsync(this.dto).subscribe((user) => {
      if (user.firstName === '') {
        this.dto = user;
        this.dto.errorMessage = 'Invalid Credentials';
      } else {
        this.currentStateService.setLoggedIn(true);
        if (user.isTempPassword === true) {
          this.router.navigate(['reset-password']);
        } else {
          this.router.navigate(['dashboard']);
        }
      }
    });
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
