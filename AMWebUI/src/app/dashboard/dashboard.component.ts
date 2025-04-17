import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ProviderDTO } from '../models/ProviderDTO';

@Component({
  selector: 'am-dashboard',
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private providerService: ProviderService) {}
  provider: ProviderDTO = new ProviderDTO();
  loadingProvider = true;

  ngOnInit() {
    this.getProvider();
  }

  getProvider() {
    this.providerService.getProviderAsync().subscribe((result) => {
      this.provider = result;
      this.loadingProvider = false;
    });
  }
}
