import { Component, Input, EventEmitter, inject } from '@angular/core';
import { Task } from '../../models/models';

import { AppService } from '../../app.service';

import { MatDialog } from '@angular/material/dialog';

import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { TaskOptionsComponent } from '../task-options/task-options.component';

@Component({
  selector: 'app-task',
  imports: [EditTaskModalComponent, TaskOptionsComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) colId!: string;
  @Input({ required: true }) taskIdx!: number;

  appService = inject(AppService);

  constructor(private _matDialog: MatDialog) {}

  taskOptionsOpen: boolean = false;

  // toggles temporarily
  openTaskOptions() {
    this.taskOptionsOpen = !this.taskOptionsOpen;
  }

  openEditTaskModal() {
    this.taskOptionsOpen = false;
    this._matDialog.open(EditTaskModalComponent, {
      data: { task: this.task, colId: this.colId, taskIdx: this.taskIdx },
      panelClass: 'dialogContainer',
    });
  }

  deleteTask() {
    console.log('delete test');
    this.taskOptionsOpen = false;

    this.appService.deleteTask(this.colId, this.task.id);
  }
}
