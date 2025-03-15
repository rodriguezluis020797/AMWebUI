import { Component } from '@angular/core';
import { RequestStatusEnum } from '../../models/Enums';
import { UserDTO } from '../../models/UserDTO';

@Component({
  selector: 'am-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: UserDTO = new UserDTO();

  ngOnInit() {
    this.user = {
      eMail: 'jdoe@gmail.com',
      errorMessage: '',
      firtName: 'John',
      lastName: 'Doe',
      middleName: null,
      password: '',
      requestStatus: RequestStatusEnum.Success,
      userId: 'an id',
    };
  }
}
