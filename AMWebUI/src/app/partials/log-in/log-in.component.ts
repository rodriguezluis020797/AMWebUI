import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  dto: UserDTO = new UserDTO();
  disableSubmit = false;

  ngOnInit() {
    this.dto.eMail = 'jdoe@gmail.com';
    this.dto.password = 'N-5=SG+bW5JM';
  }

  submit() {
    this.disableSubmit = true;
    this.identityService.loginAsync(this.dto).subscribe((user) => {
      if (user.firstName === '') {
        this.dto = user;
        this.dto.errorMessage = 'Invalid Credentials';
      } else {
        if (user.isTempPassword === true) {
          this.router.navigate(['reset-password']);
        } else {
          this.router.navigate(['dashboard']);
        }
      }
    });
    //this.ngOnInit();
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
