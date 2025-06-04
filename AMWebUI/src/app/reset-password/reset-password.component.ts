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
  imports: [FormsModule, CommonModule, RouterLink, LoadingScreenComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private route: ActivatedRoute,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const guidParam = this.route.snapshot.queryParamMap.get('guid');
    this.guid = guidRegex.test(guidParam ?? '') ? guidParam : null;

    if (this.guid && this.guid !== '') {
      this.passwordReset = true;
    }
  }

  dto: ProviderDTO = new ProviderDTO();
  loading: Boolean = false;
  success: Boolean = false;
  guid: string | null = null;
  passwordReset: boolean = false;
  confirmPassword: string = '';
  message: string = '';



  submit() {
    this.loading = true;
    this.identityService.resetPasswordRequestAsync(this.dto).subscribe((result) => {
      this.dto.eMail = '';
      this.success = true;
      this.loading = false;
    });
  }

  submitPasswordReset() {
    this.loading = true;
    if (this.dto.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.loading = false;
      return;
    }


    this.identityService.resetPasswordAsync(this.dto, this.guid!).subscribe((result) => {
      if (result === null) {
        return;
      }

      if (result.errorMessage !== null) {
        this.message = result.errorMessage;
        this.loading = false;
        this.success = false;
        this.confirmPassword = '';
        return;
      }
      this.loading = false;
      this.success = true;
    });
  }

}
