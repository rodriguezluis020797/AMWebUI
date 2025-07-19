import { Component, OnInit } from '@angular/core';
import { PoviderPublicViewDTO } from '../models/ProviderPublicViewDTO';
import { ProviderService } from '../_services/provider.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { DayOfTheWeekPipe } from "../pipes/day-of-the-week.pipe";
import { AppointmentRequestDTO } from '../models/AppointmentRequestDTO';
import { FormsModule, NgForm } from '@angular/forms';
import { AppointmentService } from '../_services/appointment.service';

@Component({
  selector: 'am-provider-public-view',
  imports: [CommonModule, LoadingScreenComponent, DayOfTheWeekPipe, FormsModule],
  templateUrl: './provider-public-view.component.html',
  styleUrls: ['./provider-public-view.component.css']
})
export class ProviderPublicViewComponent implements OnInit {

  loading: boolean = false;
  guid: string = '';
  providerDto: PoviderPublicViewDTO = new PoviderPublicViewDTO()
  averageRating: number = 0;
  submitAppointmentRequest: boolean = false;
  submitAppointmentRequestSuccess: boolean = false;
  appointmentRequestDto: AppointmentRequestDTO = new AppointmentRequestDTO();

  constructor(
    private providerService: ProviderService,
    private appoinmentService: AppointmentService,
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
        this.providerDto = result;
        this.calculateAverageRating();  // <-- calculate average after data loaded
        this.loading = false;
      });
  }

  calculateAverageRating(): void {
    if (this.providerDto?.providerReviews?.length) {
      const sum = this.providerDto.providerReviews.reduce((acc, review) => acc + (review.rating || 0), 0);
      this.averageRating = sum / this.providerDto.providerReviews.length;
    } else {
      this.averageRating = 0;
    }
  }

  submitAppointmentRequestFunc() {
    this.submitAppointmentRequestSuccess = false;
    this.submitAppointmentRequest = true;
  }

  cancelAppointmentRequest() {
    this.appointmentRequestDto = new AppointmentRequestDTO();
    this.submitAppointmentRequest = false;
  }

  saveAppointmentRequest() {
    this.loading = true;
    this.appointmentRequestDto.providerId = this.providerDto.providerId;
    this.appoinmentService
      .appointmentRequestAsync(this.appointmentRequestDto)
      .subscribe((result) => {
        if (!result) {
          this.loading = false;
          return;
        }
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.appointmentRequestDto.errorMessage = result.errorMessage;
          this.loading = false;
          return;
        }
        this.appointmentRequestDto = new AppointmentRequestDTO();
        this.submitAppointmentRequestSuccess = true;
        this.submitAppointmentRequest = false;
        this.loading = false;
      });
  }
}