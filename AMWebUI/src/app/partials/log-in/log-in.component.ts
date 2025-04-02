import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserDTO, UserDTO } from '../../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { CookiesService } from '../../services/cookies.service';
import { RequestStatusEnum } from '../../../models/Enums';
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
    private cookieService: CookiesService,
    private router: Router
  ) {}

  dto: IUserDTO = new UserDTO();
  disableSubmit = false;

  ngOnInit() {
    this.dto.eMail = 'jdoe@gmail.com';
  }

  submit() {
    this.disableSubmit = true;
    this.identityService.loginAsync(this.dto).subscribe((user) => {
      this.dto = user;
      if (this.dto.requestStatus === RequestStatusEnum.Success) {
        this.cookieService.setCookie('jwtToken', this.dto.jwtToken);
        if (this.dto.isTempPassword) {
          this.router.navigate(['/reset-password']);
        } else {
          //navigate home
        }
      }
    });
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
