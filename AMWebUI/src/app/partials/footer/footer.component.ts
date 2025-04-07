import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdentityPingDirective } from '../../directives/identity-ping.directive';

@Component({
  standalone: true,
  selector: 'am-footer',
  imports: [RouterLink, IdentityPingDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
