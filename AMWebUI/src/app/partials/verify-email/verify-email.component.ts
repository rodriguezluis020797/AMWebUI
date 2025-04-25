import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { ProviderService } from '../../services/provider.service';

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
    private providerService: ProviderService
  ) {}

  guid: string | null = null;
  isNew: boolean | null = null;
  message: string | null = null;
  loading: boolean = true;

  ngOnInit(): void {
    const guidParam = this.route.snapshot.queryParamMap.get('guid');
    const guidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    this.guid = guidParam && guidRegex.test(guidParam) ? guidParam : null;

    switch (this.route.snapshot.queryParamMap.get('isNew')) {
      case 'True':
        this.isNew = true;
        break;
      case 'False':
        this.isNew = false;
        break;
      default:
        this.isNew = null;
    }

    if (this.guid === null || this.isNew === null) {
      this.message = 'URL link is broken. Unable to process transaction.';
      this.loading = false;
    } else {
      this.providerService
        .verifyUpdateEMailAsync(this.guid)
        .subscribe((result) => {
          if (result.errorMessage !== '') {
            this.message = result.errorMessage;
          } else {
            this.message = 'E-Mail successfully verified.';
          }
          this.loading = false;
        });
    }
  }
}
