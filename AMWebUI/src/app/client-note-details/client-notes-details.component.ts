import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientNoteDTO } from '../models/ClientNoteDTO';
import { ClientService } from '../_services/client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';

@Component({
  selector: 'am-client-note-details',
  standalone: true,
  imports: [CommonModule, LoadingScreenComponent, FormsModule, DeleteEntityComponent],
  templateUrl: './client-note-details.component.html',
  styleUrl: './client-note-details.component.css'
})
export class ClientNoteDetailsComponent implements OnInit {
  @Input() clientNoteDto: ClientNoteDTO | null = new ClientNoteDTO();
  @Output() back = new EventEmitter<void>();

  loading = false;
  clientNoteEditDto: ClientNoteDTO = new ClientNoteDTO();
  editNote = false;
  showDeleteModal = false;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void { }

  edit(): void {
    this.loading = true;
    this.editNote = true;
    this.clientNoteEditDto = JSON.parse(JSON.stringify(this.clientNoteDto));
    this.loading = false;
  }

  save(): void {
    // Implement as needed
  }

  cancel(): void {
    this.loading = true;
    this.clientNoteEditDto = new ClientNoteDTO();
    this.editNote = false;
    this.loading = false;
  }

  delete(): void {
    this.loading = true;
    this.showDeleteModal = true;
    this.loading = false;
  }

  onConfirmDelete(confirm: boolean): void {
    this.loading = true;
    if (confirm) {
      this.clientService.deleteClientNoteAsync(this.clientNoteDto).subscribe(() => {
        this.showDeleteModal = false;
        this.goBackToClient();
        this.loading = false;
      });
    } else {
      this.showDeleteModal = false;
      this.loading = false;
    }
  }

  goBackToClient(): void {
    this.back.emit();
  }
}