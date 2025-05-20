import { Component, inject, Input, Inject } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

import { AppService } from '../../app.service';
import { Task } from '../../models/models';

interface EditTaskData {
  colId: string;
  task: Task;
  taskIdx: number;
}

@Component({
  selector: 'app-edit-task-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent {
  appService = inject(AppService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: EditTaskData
  ) {}

  @Input() editTaskForm = new FormGroup({
    updatedTaskName: new FormControl<string>(''),
    updatedPrioritySelect: new FormControl<string>(''),
  });

  submitEditTask() {
    const { updatedTaskName: taskName, updatedPrioritySelect: priority } =
      this.editTaskForm.value;

    // variable of the passed in task in data
    const task: Task = this.data.task;

    const { taskName: currentName, priority: currentPriority } = task;

    // checks dont work
    if (taskName !== currentName || priority !== currentPriority) {
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
        };

        this.appService.editTask(
          updatedTask,
          this.data.colId,
          this.data.taskIdx
        );
      } else {
      }
    } else {
      alert('No inputs were changed');
    }
  }

  ngOnInit() {
    this.editTaskForm.setValue({
      updatedTaskName: this.data.task.taskName,
      updatedPrioritySelect: this.data.task.priority.toLowerCase(),
    });
  }
}
