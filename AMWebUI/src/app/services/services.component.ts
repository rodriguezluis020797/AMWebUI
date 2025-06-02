import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../_services/service.service';
import { ServiceDTO } from '../models/ServiceDTO';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../partials/loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from "../partials/delete-entity/delete-entity.component";
import { ToolsService } from '../_services/tools.service';

@Component({
  selector: 'am-services',
  imports: [FormsModule, CommonModule, LoadingScreenComponent, DeleteEntityComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {

  services: ServiceDTO[] = [];
  editDTO: ServiceDTO = new ServiceDTO();
  editServiceBool: boolean = false;
  isNewService: boolean = false;
  loading: boolean = true;
  showDeleteModal: boolean = false;
  pendingDeleteId: string | null = null;

  constructor(private serviceService: ServiceService, private tools: ToolsService) {

  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.loading = true;
    this.serviceService.getServicesAsync().subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      this.services = result;
      this.loading = false;
    })
  }

  addService() {
    this.loading = true;
    this.editDTO = new ServiceDTO();
    this.editServiceBool = true;
    this.isNewService = true;
    this.loading = false;
  }

  editService(serviceId: string) {
    this.loading = true;
    this.isNewService = false;
    this.editServiceBool = true;
    this.editDTO = JSON.
      parse(JSON
        .stringify(this.services
          .find(x => x.serviceId === serviceId)));
    this.loading = false;
  }

  save() {
    this.loading = true;
    this.editDTO.errorMessage = null;
    if (!this.editDTO.serviceId || this.editDTO.serviceId === '') {
      this.serviceService.createServiceAsync(this.editDTO).subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
        }
        else {
          this.editServiceBool = false;
          this.editDTO = new ServiceDTO();
          this.getServices();
        }
        this.loading = false;
      })
    } else {
      this.serviceService.updateServiceAsync(this.editDTO).subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
        }
        else {
          this.editServiceBool = false;
          this.editDTO = new ServiceDTO();
          this.getServices();
        }
        this.loading = false;
      })
    }
  }

  delete(serviceId: string) {
    this.pendingDeleteId = serviceId;
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirm: boolean) {
    if (confirm && this.pendingDeleteId) {
      this.loading = true;
      let dto = new ServiceDTO();
      dto.serviceId = this.pendingDeleteId;
      this.serviceService.deleteServiceAsync(dto).subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        this.editDTO.errorMessage = result.errorMessage;
        if (!this.editDTO.errorMessage || this.editDTO.errorMessage.trim() === '') {
          this.editServiceBool = false;
          this.editDTO = new ServiceDTO();
          this.showDeleteModal = false;
          this.pendingDeleteId = null;
          this.getServices();
        }
        this.loading = false;
        this.showDeleteModal = false;
        this.pendingDeleteId = null;
      });
    }
    else {
      this.loading = false;
      this.showDeleteModal = false;
      this.pendingDeleteId = null;
    }
  }

  cancel() {
    this.editDTO = new ServiceDTO();
    this.editServiceBool = false;
  }
}
