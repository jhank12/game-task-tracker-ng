import { Component, inject, Input, Inject } from '@angular/core';

import { NgClass } from '@angular/common';

import { DatePipe } from '@angular/common';

import { HeaderJustifyBetweenComponent } from '../reusable/header-justify-between/header-justify-between.component';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialog,
} from '@angular/material/dialog';

import { PriorityTagComponent } from '../reusable/priority-tag/priority-tag.component';

import { AppService } from '../../app.service';
import { Task } from '../../models/models';

interface EditTaskData {
  colId: string;
  task: Task;
  taskIdx: number;
}

@Component({
  selector: 'app-edit-task-modal',
  imports: [
    NgClass,
    ReactiveFormsModule,
    HeaderJustifyBetweenComponent,
    PriorityTagComponent,
    DatePipe,
  ],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent {
  appService = inject(AppService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: EditTaskData,
    private _matDialog: MatDialog
  ) {}

  @Input() editTaskForm = new FormGroup({
    updatedTaskName: new FormControl<string>(''),
    updatedPrioritySelect: new FormControl<string>(''),
    updatedTargetDate: new FormControl<Date>(new Date()),
  });

  closeModal() {
    this._matDialog.closeAll();
  }

  submitEditTask() {
    const {
      updatedTaskName: taskName,
      updatedPrioritySelect: priority,
      updatedTargetDate,
    } = this.editTaskForm.value;

    // variable of the passed in task in data
    const task: Task = this.data.task;

    const {
      taskName: currentName,
      priority: currentPriority,
      date: currentDate,
    } = task;

    // checks dont work
    if (
      taskName !== currentName ||
      priority !== currentPriority ||
      updatedTargetDate !== currentDate
    ) {
      if (
        taskName !== undefined &&
        taskName !== null &&
        priority !== undefined &&
        priority !== null
      ) {
        const updatedTask: Task = {
          id: this.data.task.id,
          taskName: taskName,
          priority: priority,
          date: updatedTargetDate!,
          isComplete: false,
        };

        this.appService.editTask(
          updatedTask,
          this.data.colId,
          this.data.taskIdx
        );

        this.closeModal();
      } else {
      }
    } else {
      alert('No inputs were changed');
    }
  }

  deleteTask(taskId: string) {
    this.closeModal();
    this.appService.deleteTask(this.data.colId, taskId);
  }

  ngOnInit() {
    this.editTaskForm.setValue({
      updatedTaskName: this.data.task.taskName,
      updatedPrioritySelect: this.data.task.priority,
      updatedTargetDate: this.data.task.date,
    });
  }
}
