import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderDTO } from '../../models/UserDTO';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CurrentStateService } from '../../services/current-state.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';

@Component({
  standalone: true,
  selector: 'am-log-in',
  imports: [FormsModule, CommonModule, RouterLink, LoadingScreenComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) {}

  dto: ProviderDTO = new ProviderDTO();
  disableSubmit = false;
  loading = false;

  ngOnInit() {
    this.dto.eMail = 'jdoe@gmail.com';
    this.dto.password = 'P@ssw0rd_2025';
  }

  submit() {
    this.disableSubmit = true;
    this.loading = true;
    this.identityService.loginAsync(this.dto).subscribe((user) => {
      if (user === false || user == null) {
        this.loading = false;
        this.router.navigate(['error']);
        return;
      }

      this.dto = user;

      if (this.dto.firstName === '') {
        this.dto.errorMessage = 'Invalid Credentials';
      } else {
        this.currentStateService.setLoggedIn(true);
        if (this.dto.isTempPassword === true) {
          this.router.navigate(['reset-password']);
        } else {
          this.router.navigate(['dashboard']);
        }
      }

      this.loading = false;
    });

    setTimeout(() => {
      this.disableSubmit = false;
    }, 3000);
  }
}
