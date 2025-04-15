import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity.service';
import { CurrentStateService } from '../../services/current-state.service';

@Component({
  standalone: true,
  selector: 'am-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() loggedIn: boolean = false;
  isMenuOpen = false;

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logOut() {
    this.identityService.logoutAsync().subscribe((result) => {
      if (result) {
        this.currentStateService.setLoggedIn(false);
        this.router.navigate(['']);
      }
    });
  }
}
