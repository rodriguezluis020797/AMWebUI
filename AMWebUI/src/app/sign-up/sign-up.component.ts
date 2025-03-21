import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RequestStatusEnum } from '../../models/Enums';

@Component({
  standalone: true,
  selector: 'am-sign-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private userService: UserService) {}
  dto = new UserDTO();
  confirmPassword: string = '';
  disableSubmit: boolean = false;
  submit() {
    this.disableSubmit = true;
    this.userService.signupAsync(this.dto).subscribe((user) => {
      this.dto = user;
      if (this.dto.requestStatus == RequestStatusEnum.Success) {
        //reroute to success page
      }
    });
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
