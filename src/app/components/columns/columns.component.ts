import { Component, inject, signal } from '@angular/core';

import { AppService } from '../../app.service';

import { MatDialog, MatDialogActions } from '@angular/material/dialog';

import { TaskComponent } from '../task/task.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-columns',
  imports: [TaskComponent, AddTaskModalComponent, MatDialogActions],
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss',
})
export class ColumnsComponent {
  appService = inject(AppService);

  get columns() {
    return this.appService.selectedProjectBoard().columnsArr;
  }

  constructor(private _matDialog: MatDialog) {}

  deleteTask(colId: string, taskId: string) {
    this.appService.deleteTask(colId, taskId);
  }

  openAddTaskModal(colId: string) {
    this._matDialog.open(AddTaskModalComponent, {
      data: colId,
      width: '600px',
      height: '400px',
    });
  }
}
