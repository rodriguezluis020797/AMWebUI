import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ProviderDTO } from '../models/ProviderDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'am-dashboard',
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private providerService: ProviderService,
    private router: Router
  ) {}
  provider: ProviderDTO = new ProviderDTO();
  loading = true;

  ngOnInit() {
    this.getProvider();
  }

  getProvider() {
    this.providerService.getProviderAsync().subscribe((result) => {
      this.loading = true;
      this.provider = result;
      this.setTimeOut();
    });
  }

  setTimeOut() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
