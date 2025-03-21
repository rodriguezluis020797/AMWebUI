import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../../models/UserDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'am-sign-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  dto: UserDTO = new UserDTO();
  confirmPassword: string = '';
  disableSubmit: boolean = false;
  submit() {}
}
