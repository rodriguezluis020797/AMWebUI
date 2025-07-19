import { Component, OnInit } from '@angular/core';
import { MetericsService } from '../_services/meterics.service';
import { MetricsDTO } from '../models/MetricsDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ProviderService } from '../_services/provider.service';
import { ProviderReviewDTO } from '../models/ProviderReviewDTO';

@Component({
  selector: 'am-metrics',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingScreenComponent],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.css'
})
export class MetricsComponent implements OnInit {
  constructor(private metericsService: MetericsService, private providerService: ProviderService) { }

  loading = false;
  dto = new MetricsDTO();
  reviews: ProviderReviewDTO[] = [];
  averageRating: number = 0;

  ngOnInit(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    this.dto.startDate = this.formatDateForInput(start);
    this.dto.endDate = this.formatDateForInput(end);

    /*
  TODO:
  Map these calls...
  */
    this.getMetrics();
    this.getReviews();
  }
  getMetrics() {
    this.loading = true;

    // Trim to 'YYYY-MM-DD' format for input compatibility
    const trimDate = (dateStr: string): string => dateStr.split('T')[0];

    this.dto.startDate = trimDate(this.dto.startDate);
    this.dto.endDate = trimDate(this.dto.endDate);

    this.metericsService.getMetricsByRangeAsync(this.dto).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }

      this.dto = result;

      this.dto.startDate = trimDate(this.dto.startDate);
      this.dto.endDate = trimDate(this.dto.endDate);

      this.loading = false;
    });
  }

  getReviews() {
    this.loading = false;
    const dto = new ProviderReviewDTO();

    this.providerService.getProviderReviewsForProviderAsync(dto).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }

      this.reviews = result;
      this.calculateAverageRating()
      this.loading = false;
    })
  }

  calculateAverageRating(): void {
    if (this.reviews?.length) {
      const sum = this.reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
      this.averageRating = sum / this.reviews.length;
    } else {
      this.averageRating = 0;
    }
  }

  onDateRangeChange() {
    // Normalize manually without Date constructor to avoid timezone issues
    const normalizeDate = (dateStr: string): string => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    this.dto.startDate = normalizeDate(this.dto.startDate);
    this.dto.endDate = normalizeDate(this.dto.endDate);

    this.getMetrics();
  }

  private formatDateForInput(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }
}