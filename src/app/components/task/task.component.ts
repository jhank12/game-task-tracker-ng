import { Component, Input, EventEmitter, inject, signal } from '@angular/core';
import { Task } from '../../models/models';

import { NgClass } from '@angular/common';

import { DatePipe } from '@angular/common';

import { AppService } from '../../app.service';

import { MatDialog } from '@angular/material/dialog';

import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { TaskOptionsComponent } from '../task-options/task-options.component';

import { PriorityTagComponent } from '../reusable/priority-tag/priority-tag.component';
import { Event } from '@angular/router';

import { ToggleTaskCompleteButtonComponent } from '../reusable/toggle-task-complete-button/toggle-task-complete-button.component';

@Component({
  selector: 'app-task',
  imports: [
    NgClass,
    DatePipe,
    EditTaskModalComponent,
    TaskOptionsComponent,
    PriorityTagComponent,
    ToggleTaskCompleteButtonComponent,
  ],
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

  openTaskOptions() {
    this.taskOptionsOpen = !this.taskOptionsOpen;
  }

  testToggle = signal(false);

  taskToggleComplete(e: MouseEvent) {
    e.stopPropagation();

    const updatedTask: Task = {
      ...this.task,
      isComplete: !this.task.isComplete,
    };

    this.appService.editTask(updatedTask, this.colId, this.taskIdx);
    this.testToggle.update((testToggle) => !testToggle);
  }

  openEditTaskModal(e: MouseEvent) {
    e.stopPropagation();

    this.taskOptionsOpen = false;
    this._matDialog.open(EditTaskModalComponent, {
      data: { task: this.task, colId: this.colId, taskIdx: this.taskIdx },
      panelClass: 'sideDialog',
      width: '450px',
      position: { right: '0' },
    });
  }

  // deleteTask() {
  //   this.taskOptionsOpen = false;

  //   this.appService.deleteTask(this.colId, this.task.id);
  // }

  ngOnInit() {
    // this.openEditTaskModal();
  }
}
