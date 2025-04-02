import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RequestStatusEnum } from '../../models/Enums';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'am-sign-up',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private userService: UserService) {}
  dto = new UserDTO();
  disableSubmit: boolean = false;
  signUpSuccessful: boolean = false;

  ngOnInit() {
    this.dto = {
      eMail: 'jdoe@mail.com',
      errorMessage: '',
      firstName: 'Jon',
      jwtToken: '',
      lastName: 'Doe',
      middleName: null,
      password: '',
      requestStatus: RequestStatusEnum.Unknown,
      userId: '',
      isTempPassword: false,
    };
  }
  submit() {
    this.disableSubmit = true;
    this.userService.signupAsync(this.dto).subscribe((user) => {
      this.dto = user;
      if (this.dto.requestStatus == RequestStatusEnum.Success) {
        this.signUpSuccessful = true;
      }
    });
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
