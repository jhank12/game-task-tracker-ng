import { Component, inject, Input, Inject } from '@angular/core';

import { NgClass } from '@angular/common';

import { DatePipe } from '@angular/common';

import { HeaderJustifyBetweenComponent } from '../reusable/header-justify-between/header-justify-between.component';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialog,
} from '@angular/material/dialog';

import { PriorityTagComponent } from '../reusable/priority-tag/priority-tag.component';

import { AppService } from '../../app.service';
import { Task } from '../../models/models';

import { checkIfSameValue } from '../../shared/validators/checkIfSameValue';

interface EditTaskData {
  task: Task;
  colId: string;
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
    private _matDialog: MatDialog,

    private fb: FormBuilder
  ) {}

  editTaskForm!: FormGroup;

  closeModal() {
    this._matDialog.closeAll();
  }

  submitEditTask() {
    const { updatedTaskName, updatedPrioritySelect, updatedTargetDate } =
      this.editTaskForm.value;

    const updatedTask: Task = {
      id: this.data.task.id,
      taskName: updatedTaskName,
      priority: updatedPrioritySelect,
      date: updatedTargetDate!,
      isComplete: this.data.task.isComplete,
    };

    this.appService.editTask(updatedTask, this.data.colId, this.data.taskIdx);

    this.closeModal();
  }

  get hasChanges() {
    const { updatedTaskName, updatedPrioritySelect, updatedTargetDate } =
      this.editTaskForm.value;

    const newObj: Task = {
      id: this.data.task.id,
      taskName: updatedTaskName,
      priority: updatedPrioritySelect,
      date: updatedTargetDate,
      isComplete: this.data.task.isComplete,
    };

    return JSON.stringify(this.data.task) !== JSON.stringify(newObj);
  }

  deleteTask() {
    this.appService.deleteTask(this.data.colId, this.data.task.id);
    this.closeModal();
  }

  ngOnInit() {
    this.editTaskForm = this.fb.group({
      updatedTaskName: this.fb.control<string>(
        this.data.task.taskName,
        Validators.required
      ),
      updatedPrioritySelect: this.fb.control<string>(
        this.data.task.priority,
        Validators.required
      ),
      updatedTargetDate: this.fb.control<Date | null>(this.data.task.date),
    });
  }
}
