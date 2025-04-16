import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class NavBarComponent implements OnInit {
  isMenuOpen = false;
  loggedIn = false;

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) {}

  ngOnInit() {
    this.currentStateService.isLoggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logOut() {
    this.identityService.logoutAsync().subscribe((result) => {
      if (result) {
        this.currentStateService.setLoggedIn(false);
        this.router.navigate(['']);
      } else {
        this.router.navigate(['error']);
      }
    });
  }
}
