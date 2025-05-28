import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { ProviderService } from '../../_services/provider.service';
import { BaseDTO } from '../../models/BaseDTO';
import { EMPTY, of, switchMap } from 'rxjs';
import { IdentityService } from '../../_services/identity.service';

@Component({
  standalone: true,
  selector: 'am-verify-email',
  imports: [CommonModule, RouterLink, LoadingScreenComponent],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEMailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private identityService: IdentityService
  ) { }

  guid: string | null = null;
  verifying: boolean | null = null;
  message: string | null = null;
  loading: boolean = true;

  ngOnInit(): void {
    this.verifying = this.route.snapshot.queryParamMap.get('verifying')?.toLowerCase() === 'true';

    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const guidParam = this.route.snapshot.queryParamMap.get('guid');
    this.guid = guidRegex.test(guidParam ?? '') ? guidParam : null;

    switch (this.route.snapshot.queryParamMap.get('verifying')) {
      case 'true':
        this.verifying = true;
        break;
      case 'false':
        this.verifying = false;
        break;
      default:
        this.verifying = null;
    }

    if (this.guid === null || this.verifying === null) {
      this.message = 'URL link is broken. Unable to process transaction.';
      this.loading = false;
    } else {
      this.providerService
        .verifyEMailAsync(this.guid, this.verifying)
        .pipe(
          switchMap((result) => {
            if (result === null) {
              this.loading = false;
              return EMPTY;
            }
            if (result.errorMessage !== null) {
              this.message = result.errorMessage;
              this.loading = false;
              return of(null);
            } else {
              if (this.verifying) {
                this.message = "Thank you for verifying your e-mail! You will receive an e-mail when you have been given access to the system.";
              }
              else {
                this.message = "Thank you for verifying your e-mail! For security reasons, you have been logged out. Please log back in."
              }
              return this.identityService.logoutAsync();
            }
          })
        )
        .subscribe((result) => {
          this.loading = false;
        });
    }
  }
}
