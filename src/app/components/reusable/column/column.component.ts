import { Component, Input, signal, inject } from '@angular/core';
import { Column } from '../../../models/models';

import { TaskComponent } from '../../task/task.component';
import { AddTaskModalComponent } from '../../add-task-modal/add-task-modal.component';

import { AppService } from '../../../app.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-column',
  imports: [TaskComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;

  constructor(private _matDialog: MatDialog) {}

  appService = inject(AppService);

  columnExpanded = signal<boolean>(true);

  deleteTask(colId: string, taskId: string) {
    this.appService.deleteTask(colId, taskId);
  }

  openAddTaskModal(colId: string) {
    this._matDialog.open(AddTaskModalComponent, {
      data: colId,
      panelClass: 'dialogContainer',
    });
  }

  toggleColumnExpanded() {
    this.columnExpanded.update((columnExpanded) => !columnExpanded);
  }

  deleteColumn(colId: string) {
    this.appService.deleteColumn(colId);
  }
}
