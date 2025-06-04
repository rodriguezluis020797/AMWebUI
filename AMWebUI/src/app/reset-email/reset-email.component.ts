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
  loading = true;
  disableSubmit = false;
  success = false;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.loading = false;
  }

  submit(): void {
    this.disableSubmit = true;
    this.loading = true;

    this.providerService.requestUpdateEMailAsync(this.dto).subscribe((result) => {
      this.loading = false;

      if (!result) return;

      this.dto = result;
      this.success = !this.dto.errorMessage;
      this.disableSubmit = false;
    });
  }
}