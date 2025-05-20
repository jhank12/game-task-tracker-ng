import { Component, Input, EventEmitter, inject } from '@angular/core';
import { Task } from '../../models/models';

import { AppService } from '../../app.service';

import { MatDialog } from '@angular/material/dialog';

import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-task',
  imports: [EditTaskModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) colId!: string;
  @Input({ required: true }) taskIdx!: number;

  appService = inject(AppService);

  constructor(private _matDialog: MatDialog) {}

  openEditTaskModal() {
    this._matDialog.open(EditTaskModalComponent, {
      data: { task: this.task, colId: this.colId, taskIdx: this.taskIdx },
      width: '600px',
      height: '400px',
    });
  }

  deleteTask() {
    this.appService.deleteTask(this.colId, this.task.id);
  }
}
