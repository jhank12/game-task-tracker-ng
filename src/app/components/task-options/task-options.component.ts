import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-options',
  imports: [],
  templateUrl: './task-options.component.html',
  styleUrl: './task-options.component.scss',
})
export class TaskOptionsComponent {
  @Output() open = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  openEditModal() {
    this.open.emit();
  }

  deleteTask() {
    this.delete.emit();
  }
}
