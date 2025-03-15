import { Component } from '@angular/core';
import { UserDTO } from '../../../models/UserDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'am-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  dto: UserDTO = new UserDTO();

  submit() {
    //reach out to authenticate
    //if authenticated, redirected home
    //else, display error message

    console.log(
      'username: ' + this.dto.eMail + ' | password: ' + this.dto.password
    );
  }
}
