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
  @Input() close = new EventEmitter();
  @Input() open = new EventEmitter();

  // @ViewChild('createColumnDialog')
  // createColumnDialog!: ElementRef<HTMLDialogElement>;

  appService = inject(AppService);

  @Input() dialogRef!: ElementRef<HTMLDialogElement>;

  @Input()
  newColumnForm = new FormGroup({
    columnName: new FormControl('', { validators: [Validators.required] }),
    tasks: new FormArray([]),
  });

  get columnIsInvalid() {
    return (
      this.newColumnForm.controls.columnName.invalid &&
      this.newColumnForm.controls.columnName.dirty
    );
  }

  get tasks() {
    return this.newColumnForm.get('tasks') as FormArray;
  }

  addTaskToFormArray() {
    const newTaskGroup = new FormGroup({
      taskname: new FormControl(''),
      priority: new FormControl<'high' | 'medium' | 'low'>('high'),
    });
    this.tasks.push(newTaskGroup);
  }

  // for add column modal only
  deleteTask(index: number) {
    // console.log(this.tasks);
    this.tasks.removeAt(index);
  }

  submitNewColumn() {
    if (this.newColumnForm.valid) {
      const { columnName, tasks } = this.newColumnForm.value;

      // add ids to tasks
      const updatedTasks: Task[] | undefined = tasks?.map((task) => {
        const { taskname, priority } = task;
        const updatedTask: Task = {
          id: uuid(),
          taskName: taskname,
          priority: priority,
        };
        return updatedTask;
      });

      if (columnName !== undefined && columnName !== null) {
        const newColumnObj: Column = {
          id: uuid(),
          colName: columnName,
          tasks: updatedTasks,
          PLACEHOLDERCOUNT: tasks?.length,
        };

        this.appService.addColumn(newColumnObj);
      }
    } else {
      alert('invalid form');
    }
  }

  closeModal() {
    this.close.emit();
  }
}
