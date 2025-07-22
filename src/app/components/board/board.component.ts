import { Component, input, inject } from '@angular/core';

import { PageContainerComponent } from '../reusable/page-container/page-container.component';
import { AppService } from '../../app.service';

import { HeaderJustifyBetweenComponent } from '../reusable/header-justify-between/header-justify-between.component';
import { ColumnsComponent } from '../columns/columns.component';

import { AddColumnDialogComponent } from '../add-column-dialog/add-column-dialog.component';
import { EditBoardModalComponent } from '../edit-board-modal/edit-board-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  imports: [
    HeaderJustifyBetweenComponent,
    PageContainerComponent,
    ColumnsComponent,
    AddColumnDialogComponent,
    EditBoardModalComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  boardId = input.required<string>();

  appService = inject(AppService);

  constructor(private _matDialog: MatDialog) {}

  get board() {
    return this.appService.projectBoards()?.filter((board) => {
      return board.id == this.boardId();
    })[0];
  }

  openAddColumnModal() {
    this._matDialog.open(AddColumnDialogComponent, {
      panelClass: 'dialogContainer',
      width: '500px',
    });
  }

  openEditBoardModal() {
    this._matDialog.open(EditBoardModalComponent, {
      data: this.board,
      panelClass: 'dialogContainer',
    });
  }

  ngOnInit() {
    this.appService.setSelectedId(this.boardId());
  }
}
