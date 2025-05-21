import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';
import { AppointmentService } from '../_services/appointment.service';
import { AppointmentStatusPipe } from "../pipes/appointment-status.pipe";
import { ClientDTO } from '../models/ClientDTO';
import { ClientService } from '../_services/client.service';
import { switchMap } from 'rxjs';
import { ServiceService } from '../_services/service.service';
import { ServiceDTO } from '../models/ServiceDTO';
import { AppointmentStatusEnum } from '../models/Enums';

@Component({
  selector: 'am-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingScreenComponent, DeleteEntityComponent, AppointmentStatusPipe],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  editDTO: AppointmentDTO = new AppointmentDTO();
  editAppointmentBool: boolean = false;
  isNewAppointment: boolean = false;
  loading: boolean = true;
  showDeleteModal: boolean = false;
  pendingDeleteId: string | null = null;

  appointments: (AppointmentDTO & { clientName?: string, serviceName?: string })[] = [];
  clients: ClientDTO[] = [];
  services: ServiceDTO[] = [];

  constructor(private appointmentService: AppointmentService, private clientService: ClientService, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.appointmentService.getAllAppointmentsAsync().pipe(
      switchMap((result) => {
        console.log("getAppointmentsAsync");
        this.appointments = result;
        return this.clientService.getClientsAsync();
      }),
      switchMap((result) => {
        console.log("getClientsAsync");
        this.clients = result;
        return this.serviceService.getServicesAsync();
      })
    ).subscribe((result) => {
      console.log("getServicesAsync");
      this.services = result;
      this.mapClientAndServiceNames();
    });
  }

  mapClientAndServiceNames() {
    for (const appointment of this.appointments) {
      const client = this.clients.find(c => c.clientId === appointment.clientId);
      const service = this.services.find(s => s.serviceId === appointment.serviceId);

      appointment.clientName = client
        ? `${client.firstName} ${client.middleName ?? ''} ${client.lastName}`.trim().replace(/\s+/g, ' ')
        : 'Unknown Client';

      appointment.serviceName = service ? service.name : 'Unknown Service';
    }

    this.loading = false;
  }

  getAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointmentsAsync().subscribe(
      (result) => {
        this.appointments = result;
        this.loading = false;
      })
  }

  addAppointment() {
    this.loading = true;
    this.editDTO = new AppointmentDTO();
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
    this.editDTO.status = Number(this.editDTO.status);

    if (!this.editDTO.appointmentId || this.editDTO.appointmentId === '') {
      this.editDTO.status = AppointmentStatusEnum.Scheduled;
      this.appointmentService.createAppointmentAsync(this.editDTO).subscribe(result => {
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
          this.loading = false;
        } else {
          this.editAppointmentBool = false;
          this.editDTO = new AppointmentDTO();
          this.getAppointments();
        }
      });
    } else {
      this.appointmentService.updateAppointmentAsync(this.editDTO).subscribe(result => {
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
          this.loading = false;
        } else {
          this.editAppointmentBool = false;
          this.editDTO = new AppointmentDTO();
          this.getAppointments();
        }
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