import { v4 as uuid } from 'uuid';

import {
  Component,
  EventEmitter,
  Input,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormControl,
  FormArray,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppService } from '../../app.service';

import { Column, Task } from '../../models/models';

import { DialogComponent } from '../reusable/dialog/dialog.component';
import { LabelInputComponent } from '../reusable/label-input/label-input.component';

// emit the dialog element ref from here and pass in showmodal function

@Component({
  selector: 'app-add-column-dialog',
  imports: [ReactiveFormsModule, DialogComponent, LabelInputComponent],
  templateUrl: './add-column-dialog.component.html',
  styleUrl: './add-column-dialog.component.scss',
})
export class AddColumnDialogComponent {
  appService = inject(AppService);

  constructor(private _matDialog: MatDialog) {}

  @Input() dialogRef!: ElementRef<HTMLDialogElement>;

  @Input()
  newColumnForm = new FormGroup({
    columnName: new FormControl('', { validators: [Validators.required] }),
    tasks: new FormArray([]),
  });

  addTasks: boolean = true;

  toggleAddTasks() {
    this.addTasks = !this.addTasks;
  }

  closeModal() {
    this._matDialog.closeAll();
  }

  get columnIsInvalid() {
    return (
      this.newColumnForm.controls.columnName.invalid &&
      this.newColumnForm.controls.columnName.dirty
    );
  }

  get tasks() {
    return this.newColumnForm.get('tasks') as FormArray;
  }

  getFormGroup(index: number): FormGroup {
    return this.tasks.controls[index] as FormGroup;
  }

  addTaskToFormArray() {
    const newTaskGroup = new FormGroup({
      taskname: new FormControl('', { validators: [Validators.required] }),
      priority: new FormControl<'High' | 'Medium' | 'Low'>('High', {
        validators: [Validators.required],
      }),
      targetDate: new FormControl<Date | null>(null),
    });
    this.tasks.push(newTaskGroup);
  }

  // for add column modal only
  deleteTask(index: number) {
    // console.log(this.tasks);
    this.tasks.removeAt(index);

    console.log(this.tasks.controls);
  }

  submitNewColumn() {
    if (this.newColumnForm.valid) {
      const { columnName, tasks } = this.newColumnForm.value;

      // add ids to tasks
      const updatedTasks: Task[] | undefined = tasks?.map((task) => {
        const { taskname, priority, targetDate } = task;
        const updatedTask: Task = {
          id: uuid(),
          taskName: taskname,
          priority: priority,
          date: targetDate,
          isComplete: false,
        };
        return updatedTask;
      });

      if (columnName !== undefined && columnName !== null) {
        const newColumnObj: Column = {
          id: uuid(),
          colName: columnName,
          tasks: updatedTasks,
        };

        this.appService.addColumn(newColumnObj);

        this.closeModal();
      }
    } else {
      alert('invalid form');
    }
  }
}
