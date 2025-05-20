import { Component, Inject, inject, Input } from '@angular/core';

import { v4 as uuid } from 'uuid';

import { MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ReactiveFormsModule,
  FormControl,
  FormArray,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Task } from '../../models/models';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-add-task-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent {
  appService = inject(AppService);

  @Input() newTaskForm = new FormGroup({
    taskName: new FormControl('', { validators: [Validators.required] }),
    priority: new FormControl<'high' | 'medium' | 'low'>('high'),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  get taskIsInvalid() {
    return (
      this.newTaskForm.controls.taskName.invalid &&
      this.newTaskForm.controls.taskName.dirty
    );
  }

  submitNewTask() {
    // console.log(this.data.colId);

    if (this.newTaskForm.valid) {
      const { taskName, priority } = this.newTaskForm.value;

      if (taskName !== undefined && priority !== undefined) {
        const newTask: Task = {
          id: uuid(),
          taskName: taskName!,
          priority: priority!,
        };
        this.appService.addTask(newTask, this.data);
      }
    } else {
      alert('invalid inputs');
    }
  }
}
