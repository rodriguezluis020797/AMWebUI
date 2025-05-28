import { Component, Output, EventEmitter, Input, input } from '@angular/core';

@Component({
  selector: 'am-delete-entity',
  imports: [],
  templateUrl: './delete-entity.component.html',
  styleUrl: './delete-entity.component.css'
})
export class DeleteEntityComponent {
  @Input() header: string = "";
  @Input() message: string = "";
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm() {
    this.confirm.emit(true);
  }

  onCancel() {
    this.confirm.emit(false);
  }
}
