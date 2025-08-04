import { Component, Input, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormsModule, NgForm } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { AppService } from '../../app.service';

import { Column } from '../../models/models';

interface EditColumn {
  colId: string;
  colName: string;
}

@Component({
  selector: 'app-edit-column',
  imports: [FormsModule],
  templateUrl: './edit-column.component.html',
  styleUrl: './edit-column.component.scss',
})
export class EditColumnComponent {
  appService = inject(AppService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Column,
    private _matDialog: MatDialog
  ) {
    console.log(this.data);
  }

  updatedName: string = '';

  closeModal() {
    this._matDialog.closeAll();
  }

  editColumn() {
    const updatedColumn: Column = {
      ...this.data,
      colName: this.updatedName,
    };
    // console.log(updatedColumn);
    this.appService.editColumn(updatedColumn);
    this.closeModal();
  }

  deleteColumn() {
    this.appService.deleteColumn(this.data.id);
    this.closeModal();
  }
}
