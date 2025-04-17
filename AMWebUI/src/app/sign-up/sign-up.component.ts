import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderService } from '../services/provider.service';
import { RouterLink } from '@angular/router';
import { ProviderDTO } from '../models/ProviderDTO';

@Component({
  standalone: true,
  selector: 'am-sign-up',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private providerService: ProviderService) {}
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
    this.providerService.signupAsync(this.dto).subscribe((provider) => {
      this.dto = provider;
      setTimeout(() => {
        this.disableSubmit = false;
      }, 3000);
    });
  }
}
