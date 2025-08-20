import { Component, Input, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormsModule,
  NgForm,
  Validator,
  Validators,
} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { AppService } from '../../app.service';

import { Column } from '../../models/models';

import { checkIfSameValue } from '../../shared/validators/checkIfSameValue';

interface EditColumn {
  colId: string;
  colName: string;
}

@Component({
  selector: 'app-edit-column',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-column.component.html',
  styleUrl: './edit-column.component.scss',
})
export class EditColumnComponent {
  appService = inject(AppService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Column,
    private _matDialog: MatDialog
  ) {}

  editColumnForm!: FormGroup;

  closeModal() {
    this._matDialog.closeAll();
  }

  editColumn() {
    const { updatedName } = this.editColumnForm.value;

    const updatedColumn: Column = {
      ...this.data,
      colName: updatedName,
    };
    this.appService.editColumn(updatedColumn);
    this.closeModal();
  }

  deleteColumn() {
    this.appService.deleteColumn(this.data.id);
    this.closeModal();
  }

  ngOnInit() {
    this.editColumnForm = new FormGroup({
      updatedName: new FormControl<string>(this.data.colName, {
        validators: [Validators.required, checkIfSameValue(this.data.colName)],
      }),
    });
  }
}
