import { Component, OnInit } from '@angular/core';
import { ProviderDTO } from '../models/ProviderDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdentityService } from '../_services/identity.service';
import { ToolsService } from '../_services/tools.service';

@Component({
  selector: 'am-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LoadingScreenComponent],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  dto: ProviderDTO = new ProviderDTO();
  loading = false;
  success = false;
  guid: string | null = null;
  passwordReset = false;
  confirmPassword = '';
  message = '';

  constructor(
    private identityService: IdentityService,
    private route: ActivatedRoute,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    const guid = this.route.snapshot.queryParamMap.get('guid');
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    this.guid = guidRegex.test(guid ?? '') ? guid : null;
    this.passwordReset = !!this.guid;
  }

  submit(): void {
    this.loading = true;
    this.identityService.resetPasswordRequestAsync(this.dto).subscribe(() => {
      this.dto.eMail = '';
      this.success = true;
      this.loading = false;
    });
  }

  submitPasswordReset(): void {
    this.loading = true;

    if (this.dto.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.loading = false;
      return;
    }

    this.identityService.resetPasswordAsync(this.dto, this.guid!).subscribe((result) => {
      if (!result) return;

      if (result.errorMessage) {
        this.message = result.errorMessage;
        this.success = false;
        this.confirmPassword = '';
      } else {
        this.success = true;
      }

      this.loading = false;
    });
  }
}