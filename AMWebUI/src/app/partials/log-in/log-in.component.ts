import { Component } from '@angular/core';
import { IUserDTO, UserDTO } from '../../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'am-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  constructor(private identityService: IdentityService) {}

  dto: IUserDTO = new UserDTO();

  submit() {
    this.dto = this.identityService.loginAsync(this.dto);
  }
}
