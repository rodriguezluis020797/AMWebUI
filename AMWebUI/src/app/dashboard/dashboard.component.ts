import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../_services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ProviderDTO } from '../models/ProviderDTO';
import { Router } from '@angular/router';
import { CurrentStateService } from '../_services/current-state.service';

@Component({
  selector: 'am-dashboard',
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private providerService: ProviderService,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }
  provider: ProviderDTO = new ProviderDTO();
  loading = true;

  ngOnInit() {
    this.getProvider();
  }

  getProvider() {
    this.loading = true;
    this.providerService.getProviderAsync().subscribe((result) => {
      this.provider = result;
      this.currentStateService.hasCompletedProfile.next(
        this.provider.hasCompletedSignUp
      );
      this.setTimeOut();
    });
  }

  setTimeOut() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
