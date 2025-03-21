import { Component } from '@angular/core';
import { UserDTO } from '../../models/UserDTO';
import { LogInComponent } from '../partials/log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  standalone: true,
  selector: 'am-home',
  imports: [LogInComponent, SignUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: UserDTO = new UserDTO();
  loggedIn: any;

  ngOnInit() {}
}
