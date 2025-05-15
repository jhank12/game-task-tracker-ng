import {
  Component,
  EventEmitter,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormControl,
  FormArray,
  FormGroup,
  Validators,
} from '@angular/forms';

import { DialogComponent } from '../reusable/dialog/dialog.component';

// emit the dialog element ref from here and pass in showmodal function

@Component({
  selector: 'app-add-column-dialog',
  imports: [ReactiveFormsModule, DialogComponent],
  templateUrl: './add-column-dialog.component.html',
  styleUrl: './add-column-dialog.component.scss',
})
export class AddColumnDialogComponent {
  @Input() close = new EventEmitter();
  @Input() open = new EventEmitter();

  // @ViewChild('createColumnDialog')
  // createColumnDialog!: ElementRef<HTMLDialogElement>;

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
      priority: new FormControl<'high' | 'moderate' | 'low'>('high'),
    });
    this.tasks.push(newTaskGroup);
  }

  // for add column modal only
  deleteTask(index: number) {
    // console.log(this.tasks);
    this.tasks.removeAt(index);
  }

  addColumnSubmit() {
    console.log(this.newColumnForm.value);
    // const newColumnObj = {
    //   id: '3',
    //   colName: this.newColumnName,
    //   PLACEHOLDERCOUNT: 2,
    //   tasks: this.tasksArr.length > 0 ? [...this.tasksArr] : [],
    // };
    // this.columnsArr = [...this.columnsArr, newColumnObj];
    // this.closeModal();
    // console.log(this.tasksArr);
  }

  closeModal() {
    this.close.emit();
  }
}
