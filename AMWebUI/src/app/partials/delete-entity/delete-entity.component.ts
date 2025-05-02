import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'am-delete-entity',
  imports: [],
  templateUrl: './delete-entity.component.html',
  styleUrl: './delete-entity.component.css'
})
export class DeleteEntityComponent {
  @Input() message: string = 'Are you sure you want to delete this item?';
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm() {
    this.confirm.emit(true); // ✅ emits boolean
  }

  onCancel() {
    this.confirm.emit(false); // ✅ emits boolean
  }
}
