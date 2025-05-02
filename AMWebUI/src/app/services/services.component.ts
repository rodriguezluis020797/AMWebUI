import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../_services/service.service';
import { ServiceDTO } from '../models/ServiceDTO';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../partials/loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from "../partials/delete-entity/delete-entity.component";

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

  constructor(private serviceService: ServiceService) {

  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.loading = true;
    this.serviceService.getServicesAsync().subscribe((result) => {
      this.services = result;
      this.setTimeout();
    })
  }

  addService() {
    this.loading = true;
    this.editServiceBool = true;
    this.isNewService = true;
    this.setTimeout();
  }

  editService(serviceId: string) {
    this.loading = true;
    this.isNewService = false;
    this.editServiceBool = true;
    this.editDTO = JSON.
      parse(JSON
        .stringify(this.services
          .find(x => x.serviceId === serviceId)));

    this.setTimeout();
  }

  save() {
    this.loading = true;
    this.editDTO.errorMessage = null;
    if (!this.editDTO.serviceId || this.editDTO.serviceId === '') {
      console.log('assume it is a new service')
      this.serviceService.createServiceAsync(this.editDTO).subscribe((result) => {
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
        }
        else {
          this.editServiceBool = false;
          this.getServices();
        }

        this.setTimeout();
      })
    } else {
      console.log('assume it is an existing service')
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
        this.editServiceBool = false;
        this.editDTO = new ServiceDTO();
        this.showDeleteModal = false;
        this.pendingDeleteId = null;
        this.getServices(); //set timeout done here
      });
    }
  }

  cancel() {
    this.editDTO = new ServiceDTO();
    this.editServiceBool = false;
  }

  setTimeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
