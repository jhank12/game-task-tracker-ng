import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { v4 as uuid } from 'uuid';

// interfaces
import { ProjectBoard } from '../../models/models';

import { AppService } from '../../app.service';

import { LabelInputComponent } from '../reusable/label-input/label-input.component';

@Component({
  selector: 'app-add-board-dialog',
  imports: [LabelInputComponent, ReactiveFormsModule],
  templateUrl: './add-board-dialog.component.html',
  styleUrl: './add-board-dialog.component.scss',
})
export class AddBoardDialogComponent {
  appService = inject(AppService);

  constructor(private _matDialog: MatDialog) {}

  newBoardForm = new FormGroup({
    boardName: new FormControl<string>(''),
    columns: new FormArray([]),
  });

  // have page where user can select board template
  // like default will be blank then the next one will have three sections for todo, current and completed

  submitNewBoard() {
    const { boardName, columns } = this.newBoardForm.value;

    if (boardName !== undefined && boardName !== null) {
      const newBoardObj = {
        id: uuid(),
        name: boardName,
        columnsArr: columns,
      };

      // this.appService.addBoard(newBoardObj);
    }
  }

  closeModal() {
    this._matDialog.closeAll();
  }
}
