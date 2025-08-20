import { Component, Inject, inject, Input } from '@angular/core';

import { v4 as uuid } from 'uuid';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import {
  ReactiveFormsModule,
  FormControl,
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
    priority: new FormControl<'High' | 'Medium' | 'Low'>('High'),
    targetDate: new FormControl<Date | null>(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _matDialog: MatDialog
  ) {}

  get taskIsInvalid() {
    return (
      this.newTaskForm.controls.taskName.invalid &&
      this.newTaskForm.controls.taskName.dirty
    );
  }

  closeModal() {
    this._matDialog.closeAll();
  }

  submitNewTask() {
    if (this.newTaskForm.valid) {
      const { taskName, priority, targetDate } = this.newTaskForm.value;

      if (taskName !== undefined && priority !== undefined) {
        const newTask: Task = {
          id: uuid(),
          taskName: taskName!,
          priority: priority!,
          date: targetDate!,
          isComplete: false,
        };
        this.appService.addTask(newTask, this.data);
        this.closeModal();
      }
    } else {
      alert('invalid inputs');
    }
  }
}
