import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserDTO, UserDTO } from '../../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'am-log-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  constructor(private identityService: IdentityService) {}

  dto: IUserDTO = new UserDTO();
  disableSubmit = false;

  ngOnInit() {
    this.dto.eMail = 'place@holder.com';
  }

  submit() {
    this.disableSubmit = true;
    this.identityService.loginAsync(this.dto).subscribe((user) => {
      this.dto = user;
    });

    if (!this.dto.userId?.trim()) {
      //reroute home
    }

    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
