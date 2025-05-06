import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentDTO, AppointmentStatusEnum } from '../models/AppointmentDTO';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';
import { AppointmentService } from '../_services/appointment.service';
import { AppointmentStatusPipe } from "../pipes/appointment-status.pipe";

@Component({
  selector: 'am-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingScreenComponent, DeleteEntityComponent, AppointmentStatusPipe],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {

  appointments: AppointmentDTO[] = [];
  editDTO: AppointmentDTO = new AppointmentDTO();
  editAppointmentBool: boolean = false;
  isNewAppointment: boolean = false;
  loading: boolean = true;
  showDeleteModal: boolean = false;
  pendingDeleteId: string | null = null;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.loading = true;
    this.appointmentService.getAppointmentsAsync().subscribe(result => {
      this.appointments = result;
      this.loading = false;
    });
  }

  addAppointment() {
    this.loading = true;
    this.editAppointmentBool = true;
    this.isNewAppointment = true;
    this.loading = false;
  }

  editAppointment(appointmentId: string) {
    this.loading = true;
    this.isNewAppointment = false;
    this.editAppointmentBool = true;
    this.editDTO = JSON.parse(JSON.stringify(this.appointments.find(x => x.appointmentId === appointmentId)));
    this.loading = false;
  }

  save() {
    this.loading = true;
    this.editDTO.errorMessage = null;

    if (!this.editDTO.appointmentId || this.editDTO.appointmentId === '') {
      this.editDTO.status = AppointmentStatusEnum.Scheduled;
      this.appointmentService.createAppointmentAsync(this.editDTO).subscribe(result => {
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
        } else {
          this.editAppointmentBool = false;
          this.editDTO = new AppointmentDTO();
          this.getAppointments();
        }
        this.loading = false;
      });
    } else {
      this.appointmentService.updateAppointmentAsync(this.editDTO).subscribe(result => {
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
        } else {
          this.editAppointmentBool = false;
          this.editDTO = new AppointmentDTO();
          this.getAppointments();
        }
        this.loading = false;
      });
    }
  }

  delete(appointmentId: string) {
    this.pendingDeleteId = appointmentId;
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirm: boolean) {
    if (confirm && this.pendingDeleteId) {
      this.loading = true;
      const dto = new AppointmentDTO();
      dto.appointmentId = this.pendingDeleteId;
      this.appointmentService.deleteAppointmentAsync(dto).subscribe(() => {
        this.editAppointmentBool = false;
        this.editDTO = new AppointmentDTO();
        this.showDeleteModal = false;
        this.pendingDeleteId = null;
        this.getAppointments();
      });
    } else {
      this.showDeleteModal = false;
      this.pendingDeleteId = null;
    }
  }

  cancel() {
    this.editDTO = new AppointmentDTO();
    this.editAppointmentBool = false;
  }
}