import { Component } from '@angular/core';
import { LogInComponent } from '../partials/log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ProviderDTO } from '../models/ProviderDTO';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'am-home',
  imports: [LogInComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  provider: ProviderDTO = new ProviderDTO();
  loggedIn: any;

  ngOnInit() { }
}
