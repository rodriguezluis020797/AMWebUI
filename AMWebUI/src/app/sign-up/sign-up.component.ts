import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderDTO } from '../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
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
  dto = new ProviderDTO();
  disableSubmit: boolean = false;
  signUpSuccessful: boolean = false;

  ngOnInit() {
    this.dto = {
      eMail: 'jdoe@mail.com',
      errorMessage: '',
      firstName: 'Jon',
      lastName: 'Doe',
      middleName: null,
      password: '',
      isTempPassword: false,
    };
  }
  submit() {
    this.disableSubmit = true;
    this.userService.signupAsync(this.dto).subscribe((user) => {});
    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
