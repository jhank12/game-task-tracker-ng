import { Component, Input, signal, inject } from '@angular/core';
import { Column } from '../../../models/models';

import { TaskComponent } from '../../task/task.component';
import { AddTaskModalComponent } from '../../add-task-modal/add-task-modal.component';

import { Router, RouterLink } from '@angular/router';

import { AppService } from '../../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { EditColumnComponent } from '../../edit-column/edit-column.component';

@Component({
  selector: 'app-column',
  imports: [TaskComponent, RouterLink],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;

  constructor(private _matDialog: MatDialog) {}

  appService = inject(AppService);

  columnExpanded = signal<boolean>(true);

  columnOptionsOpen = signal<boolean>(false);

  deleteTask(colId: string, taskId: string) {
    this.appService.deleteTask(colId, taskId);
  }

  openAddTaskModal(colId: string) {
    this._matDialog.open(AddTaskModalComponent, {
      data: colId,
      panelClass: 'dialogContainer',
    });
  }

  openEditColumn() {
    this.toggleColumnOptionsOpen();

    this._matDialog.open(EditColumnComponent, {
      data: this.column,
      panelClass: 'dialogContainer',
      width: '450px',
    });
  }

  toggleColumnOptionsOpen() {
    this.columnOptionsOpen.update((optionsOpen) => !optionsOpen);
  }

  toggleColumnExpanded() {
    this.columnExpanded.update((columnExpanded) => !columnExpanded);
  }

  deleteColumn(colId: string) {
    this.toggleColumnOptionsOpen();
    this.appService.deleteColumn(colId);
  }
}
