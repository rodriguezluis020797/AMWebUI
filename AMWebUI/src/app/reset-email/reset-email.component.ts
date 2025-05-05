import { Component, OnInit } from '@angular/core';
import { ProviderDTO } from '../models/ProviderDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { RouterLink } from '@angular/router';
import { ProviderService } from '../_services/provider.service';

@Component({
  standalone: true,
  selector: 'am-reset-email',
  imports: [FormsModule, CommonModule, LoadingScreenComponent, RouterLink],
  templateUrl: './reset-email.component.html',
  styleUrl: './reset-email.component.css',
})
export class ResetEMailComponent implements OnInit {
  dto: ProviderDTO = new ProviderDTO();
  loading: Boolean = true;
  disableSubmit: Boolean = false;
  success: Boolean = false;

  constructor(private providerService: ProviderService) { }
  ngOnInit(): void {
    this.loading = false;
  }

  submit() {
    this.disableSubmit = true;
    this.loading = true;

    this.providerService.updateEMailAsync(this.dto).subscribe((result) => {
      this.dto = result;
      if (this.dto.errorMessage === '' || !this.dto.errorMessage) {
        this.success = true;
      }
      this.loading = false;
      this.disableSubmit = false;
    });
  }
}
