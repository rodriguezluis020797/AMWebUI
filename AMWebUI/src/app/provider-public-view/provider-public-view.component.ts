import { Component, OnInit } from '@angular/core';
import { PoviderPublicViewDTO } from '../models/ProviderPublicViewDTO';
import { ProviderService } from '../_services/provider.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';

@Component({
  selector: 'am-provider-public-view',
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './provider-public-view.component.html',
  styleUrls: ['./provider-public-view.component.css']
})
export class ProviderPublicViewComponent implements OnInit {

  loading: boolean = false;
  guid: string = '';
  dto: PoviderPublicViewDTO = new PoviderPublicViewDTO()
  averageRating: number = 0;

  constructor(
    private providerService: ProviderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const guidParam = this.route.snapshot.queryParamMap.get('guid') ?? '';

    this.guid = guidRegex.test(guidParam) ? guidParam : '';
    this.getProviderInformation();
  }

  getProviderInformation(): void {
    this.loading = true;

    this.providerService
      .getProviderPublicViewAsync(this.guid)
      .subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        this.dto = result;
        this.calculateAverageRating();  // <-- calculate average after data loaded
        this.loading = false;
      });
  }

  calculateAverageRating(): void {
    if (this.dto?.providerReviews?.length) {
      const sum = this.dto.providerReviews.reduce((acc, review) => acc + (review.rating || 0), 0);
      this.averageRating = sum / this.dto.providerReviews.length;
    } else {
      this.averageRating = 0;
    }
  }
}