import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

import { AppService } from '../../app.service';
import { ProjectBoard } from '../../models/models';

import { checkIfSameValue } from '../../shared/validators/checkIfSameValue';

@Component({
  selector: 'app-edit-board-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-board-modal.component.html',
  styleUrl: './edit-board-modal.component.scss',
})
export class EditBoardModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProjectBoard,
    private _matDialog: MatDialog,

    private router: Router
  ) {}

  appService = inject(AppService);

  editBoardForm!: FormGroup;

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

  deleteBoard() {
    this.appService.deleteBoard(this.data.id);
    this.router.navigate(['/']);
  }

  closeModal() {
    this._matDialog.closeAll();
  }

  ngOnInit() {
    this.editBoardForm = new FormGroup({
      updatedBoardName: new FormControl<string>(this.data.name, {
        validators: [Validators.required, checkIfSameValue(this.data.name)],
      }),
    });
  }
}
