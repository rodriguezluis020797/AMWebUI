import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../_services/provider.service';
import { ProviderReviewDTO } from '../models/ProviderReviewDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingScreenComponent } from "../partials/loading-screen/loading-screen.component";

@Component({
  selector: 'am-provider-review',
  imports: [CommonModule, FormsModule, LoadingScreenComponent],
  templateUrl: './provider-review.component.html',
  styleUrl: './provider-review.component.css'
})
export class ProviderReviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService
  ) { }

  loading: boolean = false;
  guid: string = '';
  dto: ProviderReviewDTO = new ProviderReviewDTO();
  success: boolean = false;

  ngOnInit(): void {
    this.loading = true;

    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const guidParam = this.route.snapshot.queryParamMap.get('guid') ?? '';

    this.guid = guidRegex.test(guidParam) ? guidParam : '';
    this.dto.guidQuery = this.guid;

    this.getProviderReview();
  }

  getProviderReview() {
    this.loading = true;
    this.providerService.GetProviderReviewForSubmissionAsync(this.dto).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      this.dto = result;
      this.loading = false;
    })
  }

  submit(): void {
    this.loading = true;
    this.providerService.updateProviderReviewAsync(this.dto).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      this.dto = result;
      this.success = true;
      this.loading = false;
    })
  }
}
