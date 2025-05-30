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
  imports: [CommonModule, LoadingScreenComponent, FormsModule, DeleteEntityComponent],
  templateUrl: './client-note-details.component.html',
  styleUrl: './client-note-details.component.css'
})
export class ClientNoteDetailsComponent implements OnInit {
  @Input() clientNoteDto: ClientNoteDTO | null = new ClientNoteDTO();
  @Output() back = new EventEmitter<void>();

  loading: boolean = false;
  clientNoteEditDto: ClientNoteDTO = new ClientNoteDTO();
  editNote: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private clientService: ClientService, private router: Router) { }
  ngOnInit(): void {

  }

  eddit() {
    this.loading = true;
    this.editNote = true;
    this.clientNoteEditDto = JSON.parse(JSON.stringify(this.clientNoteDto));
    this.loading = false;
  }

  save() {

  }

  cancel() {
    this.loading = true;
    this.clientNoteEditDto = new ClientNoteDTO();

    this.loading = false;
  }

  delete() {
    this.showDeleteModal = true;
  }

  onConfirmDelete() {

  }

  goBackToClient() {
    this.back.emit();
  }

}
