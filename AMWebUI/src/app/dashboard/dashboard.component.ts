import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../_services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ProviderDTO } from '../models/ProviderDTO';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { AppointmentService } from '../_services/appointment.service';
import { EMPTY, switchMap } from 'rxjs';
import { ProviderAlertDTO } from '../models/ProviderAlertDTO';
import { AccountStatusEnum } from '../models/Enums';
import { RouterLink } from '@angular/router';
import { CurrentStateService } from '../_services/current-state.service';

@Component({
  selector: 'am-dashboard',
  standalone: true,
  imports: [CommonModule, LoadingScreenComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  provider: ProviderDTO = new ProviderDTO();
  appointments: AppointmentDTO[] = [];
  alerts: ProviderAlertDTO[] = [];
  loading = true;
  AccountStatus = AccountStatusEnum;

  constructor(
    private providerService: ProviderService,
    private appointmentService: AppointmentService,
    private currentStateService: CurrentStateService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading = true;

    this.providerService.getProviderAsync(false).pipe(
      switchMap((provider) => {
        if (!provider) {
          this.loading = false;
          return EMPTY;
        }

        this.provider = provider;
        this.currentStateService.accountStatusSubject.next(provider.accountStatus);
        return this.appointmentService.getUpcomingAppointmentsAsync();
      }),
      switchMap((result) => {
        if (result === null) {
          this.loading = false;
          return EMPTY;
        }
        this.appointments = result;

        return this.providerService
          .getProviderAlertsAsync();

      })
    ).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      this.alerts = result;
      this.loading = false;
    });
  }

  acknowledgeAlert(alert: ProviderAlertDTO) {
    this.loading = true;
    this.providerService
      .acknowledgeProviderAlertAsync(alert)
      .subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        this.alerts = this.alerts.filter(a => a.providerAlertId !== alert.providerAlertId);
        this.loading = false;
      });
  }
}