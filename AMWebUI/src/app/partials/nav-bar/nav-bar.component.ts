import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IdentityService } from '../../_services/identity.service';
import { CurrentStateService } from '../../_services/current-state.service';
import { AccountStatusEnum } from '../../models/Enums';

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
  accountStatus = AccountStatusEnum.Unknown;

  AccountStatusEnum = AccountStatusEnum;

  activeAccountNavItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Services', link: '/services' },
    { label: 'Clients', link: '/clients' },
    { label: 'Appointments', link: '/appointments' },
    { label: 'Metrics', link: '/metrics' }
  ];

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  ngOnInit() {
    this.currentStateService.isLoggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });
    this.currentStateService.accountStatus$.subscribe((status) => {
      this.accountStatus = status;
    });

    // Optional: auto-close menu on route change
    this.router.events.subscribe(() => {
      this.isMenuOpen = false;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onNavItemClick() {
    this.isMenuOpen = false;
  }

  onLogoutClick() {
    this.isMenuOpen = false;
    this.identityService.logoutAsync().subscribe((result) => {
      if (result) {
        this.currentStateService.loggedInSubject.next(false);
        this.router.navigate(['']);
      } else {
        this.router.navigate(['error']);
      }
    });
  }
}
