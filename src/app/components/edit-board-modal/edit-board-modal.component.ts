import { Component, Inject, Input, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import {
  ReactiveFormsModule,
  FormControl,
  FormArray,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AppService } from '../../app.service';
import { ProjectBoard } from '../../models/models';

@Component({
  selector: 'app-edit-board-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-board-modal.component.html',
  styleUrl: './edit-board-modal.component.scss',
})
export class EditBoardModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProjectBoard,
    private _matDialog: MatDialog
  ) {
    console.log(data);
  }

  appService = inject(AppService);

  @Input() editBoardForm = new FormGroup({
    updatedBoardName: new FormControl<string>(''),
  });

  submitEditBoard() {
    const { updatedBoardName } = this.editBoardForm.value;

    if (updatedBoardName !== undefined && updatedBoardName !== null) {
      const updatedBoard: ProjectBoard = {
        id: this.data.id,
        name: updatedBoardName,
        columnsArr: this.data.columnsArr,
        date: this.data.date,
      };
      this.appService.editBoard(updatedBoard);
      this.closeModal();
    }
  }

  closeModal() {
    this._matDialog.closeAll();
  }

  ngOnInit() {
    this.editBoardForm.setValue({
      updatedBoardName: this.data.name,
    });
  }
}
