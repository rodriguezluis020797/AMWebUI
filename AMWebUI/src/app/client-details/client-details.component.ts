import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientDTO } from '../models/ClientDTO';
import { ClientService } from '../_services/client.service';
import { ClientNoteDTO } from '../models/ClientNoteDTO';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';
import { Router } from '@angular/router';

@Component({
  selector: 'am-client-details',
  imports: [CommonModule, LoadingScreenComponent, FormsModule, DeleteEntityComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent implements OnInit {
  @Input() clientDto: ClientDTO = new ClientDTO();
  @Output() back = new EventEmitter<void>();


  clientNotes: ClientNoteDTO[] = [];
  clientEditDto: ClientDTO = new ClientDTO();

  loading: boolean = false;
  edit: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private clientService: ClientService, private router: Router) { }
  ngOnInit(): void {
    this.getClientNotes();
  }

  getClientNotes() {
    this.loading = true;
    this.clientService
      .getClientNotesAsync(this.clientDto)
      .subscribe((result) => {
        if (result === null) {
          this.loading = false
          return;
        }
        this.clientNotes = result;
        this.loading = false;
      });
  }

  editClientFunc() {
    this.loading = true;
    this.edit = true;
    this.clientEditDto = JSON.parse(JSON.stringify(this.clientDto));

    this.loading = false;
  }
  cancel() {
    this.loading = true;
    this.clientEditDto = new ClientDTO();
    this.edit = false;
    this.loading = false;
  }

  save() {
    this.loading = true;
    this.clientDto.errorMessage = null;
    this.clientService.updateClientAsync(this.clientDto).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      if (result.errorMessage && result.errorMessage.trim() !== '') {
        this.clientDto.errorMessage = result.errorMessage;
      } else {
        this.edit = false;
      }
      this.loading = false;
    });
  }

  delete() {
    this.loading = true;
    this.showDeleteModal = true;
    this.loading = false;
  }

  onConfirmDelete(confirm: boolean) {
    if (confirm) {
      this.loading = true;
      this.clientService.deleteClientAsync(this.clientDto).subscribe(() => {
        this.showDeleteModal = false;
        this.router.navigate(['/clients'])
        this.loading = false;
      });
    } else {
      this.showDeleteModal = false;
      this.loading = false;
    }
  }

  goBack() {
    this.back.emit();
  }
}
