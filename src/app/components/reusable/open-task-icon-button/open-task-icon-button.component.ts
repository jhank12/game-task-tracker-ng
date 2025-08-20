import { Component, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AddTaskModalComponent } from '../../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-open-task-icon-button',
  imports: [],
  templateUrl: './open-task-icon-button.component.html',
  styleUrl: './open-task-icon-button.component.scss',
})
export class OpenTaskIconButtonComponent {
  @Input({ required: true }) colId!: string;

  constructor(private _matDialog: MatDialog) {}

  openAddTaskModal() {
    this._matDialog.open(AddTaskModalComponent, {
      data: this.colId,
      panelClass: 'dialogContainer',
    });
  }
}
