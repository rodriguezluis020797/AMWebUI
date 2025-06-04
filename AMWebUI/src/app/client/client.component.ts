import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../_services/client.service';
import { ClientDTO } from '../models/ClientDTO';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ClientDetailsComponent } from '../client-details/client-details.component';

@Component({
  selector: 'am-clients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingScreenComponent,
    ClientDetailsComponent
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: ClientDTO[] = [];
  clientToAdd: ClientDTO = new ClientDTO();
  add = false;
  loading = true;
  selectedClient: ClientDTO | null = null;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.loading = true;
    this.clientService.getClientsAsync().subscribe(result => {
      if (result !== null) {
        this.clients = result;
      }
      this.loading = false;
    });
  }

  addClient(): void {
    this.add = true;
  }

  save(): void {
    this.loading = true;
    this.clientToAdd.errorMessage = null;

    this.clientService.createClientAsync(this.clientToAdd).subscribe(result => {
      if (result === null) {
        this.loading = false;
        return;
      }

      if (result.errorMessage?.trim()) {
        this.clientToAdd.errorMessage = result.errorMessage;
      } else {
        this.add = false;
        this.clientToAdd = new ClientDTO();
        this.getClients();
      }

      this.loading = false;
    });
  }

  cancel(): void {
    this.clientToAdd = new ClientDTO();
    this.add = false;
  }

  selectClient(client: ClientDTO): void {
    this.selectedClient = client;
  }

  goBackToList(): void {
    this.selectedClient = null;
    this.getClients();
  }
}